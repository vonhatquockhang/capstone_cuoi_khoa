export interface Review {
  id: string;
  user?: {
    id: string;
    name: string;
  };
  job?: {
    id: string;
  };
  rating: number;
  content: string;
}
