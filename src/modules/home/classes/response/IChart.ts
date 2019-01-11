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

}

export interface IChartDepartment {

}

export interface IChartSales {

}