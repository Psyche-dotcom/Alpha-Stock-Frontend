export interface IStock {
  title: string;
  total: string;
  value: number;
  percent: number;
  isProgressive: boolean;
}
export interface IStockData {
  symbol: string;
  price: number;
  name: string;
  change: number;
  changesPercentage: number;
  exchange: string;
}
