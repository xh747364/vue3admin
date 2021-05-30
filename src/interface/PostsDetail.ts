export interface GetPostsDetail {
	id: string;
}

export interface PostsDetail {
	id?: string;
	title: string;
	desc: string;
	content: string;
	categories: string[];
	tags: string[];
	createDate: string;
	updateDate: string;
}

export interface PostsDefalut {
	data: PostsDetail,
}