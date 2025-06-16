export interface ICompanyStockCard {
  name: string;
  amount: number;
  isProgressive: boolean;
  value: number;
}

export interface IWatchlistData {
  id: string;
  imgUrl: string;
  lowerLimit: number;
  price: number;
  stockSymbols: string;
  upperLimit: number;
  isProgressive?: boolean;
}
