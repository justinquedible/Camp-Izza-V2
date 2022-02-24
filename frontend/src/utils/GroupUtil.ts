import axios from "axios";
import { Group } from "../models/models";

interface GroupWithCamperCount extends Group {
  camperCount: number;
}

// Find what grade levels the group should have
export function findGradeLevels(groupName: string) {
  if (groupName.startsWith("Dates")) {
    return [0, 1];
  } else if (groupName.startsWith("Coconuts")) {
    return [2, 3];
  } else if (groupName.startsWith("Trees")) {
    return [4, 5, 6];
  } else if (groupName.startsWith("Young Leaders")) {
    return [7, 8];
  } else {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8];
  }
}

// Find what group the camper should be in given their grade
export function findGroupType(grade: number) {
  if ([0, 1].includes(grade)) {
    return "Dates";
  } else if ([2, 3].includes(grade)) {
    return "Coconuts";
  } else if ([4, 5, 6].includes(grade)) {
    return "Trees";
  } else if ([7, 8].includes(grade)) {
    return "Young Leaders";
  }
  return "";
}

export async function areGroupsFull(grade: number, weekID: number) {
  let isGroupFull = false;
  const groupType = findGroupType(grade);

  // Find group ids of group type they should be in
  await axios
    .get(`${process.env.REACT_APP_API}/api/groups/getGroupsByCampWeekIDAndName/${weekID}/${groupType}`)
    .then(async (res) => {
      const groups: GroupWithCamperCount[] = res.data;
      groups.sort((a, b) => a.name.localeCompare(b.name));
      for (let group of groups) {
        const camperCount = (
          await axios.get(`${process.env.REACT_APP_API}/api/groups/getNumOfCampersInGroup/${group.id}`)
        ).data.camperCount;
        group.camperCount = camperCount;
      }
      // console.log(groups);
      // Find specific group id that they should be in based on group limits and camper count
      if (groups.length > 1) {
        const group1 = groups[0];
        const group2 = groups[1];
        // If the first and second group is full
        if (group1.camperCount >= group1.camperLimit && group2.camperCount >= group2.camperLimit) {
          isGroupFull = true;
        }
      }
    });
  return isGroupFull;
}

export async function findGroupID(grade: number, weekID: number) {
  let designatedGroupID = null;
  const groupType = findGroupType(grade);

  // Find group ids of group type they should be in
  await axios
    .get(`${process.env.REACT_APP_API}/api/groups/getGroupsByCampWeekIDAndName/${weekID}/${groupType}`)
    .then(async (res) => {
      const groups: GroupWithCamperCount[] = res.data;
      groups.sort((a, b) => a.name.localeCompare(b.name));
      for (let group of groups) {
        const camperCount = (
          await axios.get(`${process.env.REACT_APP_API}/api/groups/getNumOfCampersInGroup/${group.id}`)
        ).data.camperCount;
        group.camperCount = camperCount;
      }
      // console.log(groups);
      // Find specific group id that they should be in based on group limits and camper count
      if (groups.length > 1) {
        const group1 = groups[0];
        const group2 = groups[1];
        // If first group is not full and second group is empty, then put them in first group for that week.
        if (group1.camperCount < group1.camperLimit && group2.camperCount === 0) {
          designatedGroupID = group1.id;
        }
        // If first and second group are not full, then put them in the group with less campers for that week.
        else if (group1.camperCount < group1.camperLimit && group2.camperCount < group2.camperLimit) {
          if (group1.camperCount < group2.camperCount) {
            designatedGroupID = group1.id;
          } else {
            designatedGroupID = group2.id;
          }
        }
        // If first group is full and second group is not full, then put them in the second group for that week.
        else if (group1.camperCount >= group1.camperLimit && group2.camperCount < group2.camperLimit) {
          designatedGroupID = group2.id;
        }
        // If the first and second group is full, then put them in the waitlist for that week
        else if (group1.camperCount >= group1.camperLimit && group2.camperCount >= group2.camperLimit) {
          await axios
            .get(`${process.env.REACT_APP_API}/api/groups/getGroupsByCampWeekIDAndName/${weekID}/Waitlist`)
            .then((res) => (designatedGroupID = res.data[0].id));
        }
      }
    });

  // console.log(designatedGroupID);
  return designatedGroupID;
}
