export interface CreatePostDto {
  creator_id: string;
  content: string;
  group_feed_id?: string;
  user_feed_id?: string;
  child_post_id?: string;
}
