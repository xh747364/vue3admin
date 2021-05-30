import { FriendLink } from "./friendLink";

export interface HomeResult {
  postsCount: number;
  tagsCount: number;
  categoriesCount: number;
  friendLink: FriendLink[]
}