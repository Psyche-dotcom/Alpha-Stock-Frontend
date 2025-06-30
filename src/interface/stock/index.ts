export interface IStockComponent {
  symbol: string;
}
export interface IMetricData {
  getMetricsIsLoading: any;
  getMetricsData: any;
}
export interface ICompanyCard {
  companyName: string;
  symbol: string;
  urlCompanyImg: string;
  price: number;
  exchange: string;
}
