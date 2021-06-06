export interface GroupRecommendationsDto {
  count_subscriptions: number;
  group_id_recommendations: number[];
  group_recommendations: string[];
  user_id: number;
  user_name: string;
}
