import { ReactNode } from "react";

export type CellValue =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined
  | ReactNode;
export interface DataItem {
  [key: string]: CellValue;
  id?: string | number;
  route?: string;
  isLoading?: boolean;
}

export interface ITableProps<T extends DataItem> {
  tableData: T[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  statusKey?: keyof T;
  defaultRoute?: string;
  onRowClick?: (item: T) => void;
  boldColumns?: string[];
}

export interface MarketMove extends DataItem {
  id: number;
  url: string;
  agent: string;
  price: number;
  changeValue: number;
  changeProgress: boolean;
  changePercent: number;
  changePercentProgress: boolean;
}
export interface UserData extends DataItem {
  id: string;
  firstName?: string;
  lastName?: string;
  activeSubcriptionName?: string;
  profilePicture?: string;
  isEmailConfirmed: boolean;
  email: string;
  phoneNumber: string;
  userName: string;
  isSuspendUser: boolean;
  isSubActive: boolean;
  created: string;
}

export interface StockData extends DataItem {
  id: number;
  url: string;
  agent: string;
  price: number;
  changevalue: number;
  changeIsProgressive: boolean;
  changespercent: number;
  changesisProgressive: boolean;
}

export interface ApiResponse {
  statusCode: number;
  displayMessage: string;
  result: string;
  errorMessages: string | null;
}

export interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
