export interface PostDto {
  id: number;
  createdDate: Date | string;
  creatorId: number;
  creatorName: string;
  content: string;
  childPost?: PostDto;
}
