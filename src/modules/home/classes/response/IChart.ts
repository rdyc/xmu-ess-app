export interface IChart {
  companies: IChartCompany[];
  departments: IChartDepartment[];
  businessUnits: IChartBusinessUnit[];
  sales: IChartSales[];
}

export interface IChartCompany {
  companyName: string;
  percentage: number;
}

export interface IChartBusinessUnit {
  companyName: string;
  percentage: number;
}

export interface IChartDepartment {
  companyName: string;
  percentage: number;
}

export interface IChartSales {
  companyName: string;
  percentage: number;
}