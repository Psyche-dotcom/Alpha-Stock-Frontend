export interface ICardView {
  title: string;
  createdAt: string;
  url: string;
  avatar?: string;
  name?: string;
}

export interface IViewCard {
  id: string;
  publisherName?: string;
  publisherUsername?: string;
  title: string;
  blogThumbnailUrl?: string;
  likeCount?: number;
  status?: string;
  category?: string;
  publishedDate: string;
  publisherImgUrl?: string;
}
