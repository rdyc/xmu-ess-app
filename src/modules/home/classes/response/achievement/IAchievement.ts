import { IAchievementBusinessUnit, IAchievementCompany, IAchievementDepartment, IAchievementSales } from '.';

export interface IAchievement {
  companies: IAchievementCompany[];
  departments: IAchievementDepartment[];
  businessUnits: IAchievementBusinessUnit[];
  sales: IAchievementSales[];
}