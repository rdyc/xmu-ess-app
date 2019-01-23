import { IBaseChanges } from '@generic/interfaces';

// import { IAchievementBusinessUnit, IAchievementCompany, IAchievementDepartment, IAchievementSales } from '.';

// export interface IAchievement {
//   companies: IAchievementCompany[];
//   departments: IAchievementDepartment[];
//   businessUnits: IAchievementBusinessUnit[];
//   sales: IAchievementSales[];
// }

export interface IAchievement {
  id: number;
  title: string;
  description: string;
  unit: string;
  data: string[];
  isActive: boolean;
  changes: IBaseChanges;
}