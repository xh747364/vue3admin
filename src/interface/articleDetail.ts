export interface AtricleGet {
  id: string;
}

export interface ArticleDetail {
  id?: string;
  title: string;
  desc: string;
  content: string;
  categories: string[];
  tags: string[];
  createDate: string;
  updateDate: string;
}