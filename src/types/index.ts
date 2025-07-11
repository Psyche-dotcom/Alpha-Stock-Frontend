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
  className?: string;
  isLoading?: boolean;
}
export interface ITableProps2<T extends DataItem> {
  tableData: T[];
  currentPage?: number;
  totalPages?: number;
  basePrice: number;
  onPageChange?: (page: number) => void;
  statusKey?: keyof T;
  defaultRoute?: string;
  onRowClick?: (item: T) => void;
  boldColumns?: string[];
  className?: string;
  isLoading?: boolean;
}

export interface MarketMove extends DataItem {
  id: number;
  url: string;
  agent: string;
  price: number;
  name: string;
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

export interface ISubscription {
  amount: number;
  billingInterval?: string;
  created?: string;
  dateUpdated?: string | null;
  discountRate?: number;
  id: string;
  isDiscounted?: boolean;
  isDeleted?: boolean;
  name: string;
  payments?: any;
  subscriptionFeatures?: any;
  subscriptionsUser?: any;
}

export interface SubscriptionFeature extends DataItem {
  id: string;
  featureName?: string;
  shortName?: string;
  category: string;
  subscriptionId: string;
  subscription?: any | null;
  currentState: string;
  created: string;
  dateUpdated?: string | null;
  isDeleted: boolean;
}

export interface PaymentData extends DataItem {
  invoice: string;
  duration: string;
  paymentStatus: string;
  downloadInvoice: string;
  paymentId: string;
  amount?: string | number;
  subscriptionTypeName?: string;
  paymentType?: string;
  completePaymentTime?: string;
}

export interface BlogData extends DataItem {
  blogThumbnailUrl: string;
  category: string;
  id: string;
  likeCount: number;
  publishedDate: string;
  publisherImgUrl: string;
  publisherName: string;
  publisherUsername: string;
  status: string;
  title: string;
}

export interface CommunityData extends DataItem {
  channelName: string;
  moderator: string;
  category: string;
}
