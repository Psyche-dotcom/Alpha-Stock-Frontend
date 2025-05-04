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
