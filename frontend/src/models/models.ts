// These types should match the tables from the SQL database, but make them singular

export type Admin = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type Camp_Week = {
  id: number;
  term: string;
  name: string;
  start: string;
  end: string;
  earlyCost: number;
  regularCost: number;
  earlyCutOff: string;
};

export type Camper_Attendance = {
  id: number;
  camper_id: number;
  date: string;
  present: boolean;
  pickedUp: boolean;
  comment: string;
};

export type Camper_Medical_Record = {
  id: number;
  camper_id: number;
  doctorName: string;
  doctorPhone: string;
  insuranceCarrier: string;
  policyHolder: string;
  allergies: string;
  restrictedActivities: string;
  illnesses: string;
  immunizations: string;
  medicalTreatments: string;
  medications: string;
  tetanusDate: string;
  comments: string;
};

export type Camper = {
  id: number;
  parent_id: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  grade: number;
  school: string;
  shirtSize: string;
  numShirts: number;
  paid: number;
};

export type Counselor_Attendance = {
  id: number;
  counselor_id: string;
  date: string;
  present: boolean;
  comment: string;
};

export type Counselor_Medical_Record = {
  id: number;
  counselor_id: string;
  doctorName: string;
  doctorPhone: string;
  insuranceCarrier: string;
  policyHolder: string;
  allergies: string;
  illnesses: string;
  immunizations: string;
  medications: string;
  accommodations: string;
};

export type Counselor = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  phone: string;
  altPhone: string;
  group_id: number;
  approved: boolean;
  active: boolean;
};

export type Emergency_Contact = {
  id: number;
  user_id: string;
  firstName: string;
  lastName: string;
  relation: string;
  phone: string;
  authPickUp: boolean;
};

export type Group = {
  id: number;
  name: string;
};

export type Group_Limit = {
  id: number;
  group_id: number;
  camp_week_id: number;
  camperLimit: number;
};

export type Parent = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  guardian2FirstName: string;
  guardian2LastName: string;
  guardian2Email: string;
  guardian2Phone: string;
  credit: number;
};

export type Payment_Information = {
  id: number;
  user_id: string;
  registered_camper_weeks: number;
  numShirts: number;
  totalCost: number;
  totalPaidUSD: number;
  totalPaidCredit: number;
  transactionTime: string;
};

export type Registered_Camper_Week = {
  id: number;
  camper_id: number;
  camp_week_id: number;
  group_id: number;
};

export type Registered_Counselor_Week = {
  id: number;
  counselor_id: string;
  camp_week_id: number;
  group_id: number;
};

export type Shirt = {
  id: number;
  name: string;
  size: string;
  price: number;
};

export type User = {
  id: string;
  email: string;
  role: string;
};

// Exta types

export interface Registered_Camper_WeekWithCamper extends Registered_Camper_Week {
  firstName: string;
  lastName: string;
  grade: number;
  gender: string;
}

export interface Registered_Counselor_WeekWithCounselor extends Registered_Counselor_Week {
  firstName: string;
  lastName: string;
}
