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
