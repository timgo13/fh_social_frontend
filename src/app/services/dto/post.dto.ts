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
  child_post?: PostDto;
  user_feed_id?: number;
  group?: {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    creator_id: number
  };
}
