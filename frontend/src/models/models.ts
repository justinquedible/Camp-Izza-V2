// These types should match the tables from the SQL database

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
