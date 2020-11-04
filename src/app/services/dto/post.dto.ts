export interface PostDto {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  creator: {
    id: number;
    created_at: Date | string;
    updated_at: Date | string;
    username: string;
  };
  content: string;
  child_post_id?: number;
  user_feed_id?: number;
  group_feed_id?: number;
}
