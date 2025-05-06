export interface IComment {
  url: string;
  createdAt: string;
  name: string;
  content: string;
  image?: string;
}

export interface IComments {
  comment?: string;
  commentDate: string;
  commentId?: string;
  isLiked?: boolean;
  IsUnliked?: boolean;
  isSaved?: boolean;
  likeCount?: number;
  name?: string;
  userImgUrl?: string;
  commentImgUrl?: string;
  replyContent?: string;
}

export interface IMessage {
  id: string;
  message: string;
  messageType: "Text" | "Image" | string;
  created: string;
  isLiked: boolean;
  isUnLiked: boolean;
  isSaved: boolean;
  likeCount: number;
  unLikeCount: number;
  senderName: string;
  sentByImgUrl?: string;
  commentImgUrl?: string;
}
export interface CommentData {
  commentId: string;
  comment: string;
  commentDate: string;
  userImgUrl: string;
  name: string;
  isLiked: boolean;
  IsUnliked: boolean;
  isSaved: boolean;
  messageType: string;
}
export interface IAlphaMap {
  header: string;
  amount: string;
  isActive: boolean;
}
export type FundamentalsItem = {
  header: string;
  amount: string;
  isActive: boolean;
};

export type ApiData = {
  marketCap: string;
  averageShareOutstanding: Record<string, string | null>;
  netIcome: Record<string, string | null>;
  roic: Record<string, string | null>;
  revGrowth: Record<string, string | null>;
  profitMargin: Record<string, string | null>;
  freeCashFlowMargin: Record<string, string | null>;
  peRatio: Record<string, string | null>;
  pfcf: Record<string, string | null>;
};
