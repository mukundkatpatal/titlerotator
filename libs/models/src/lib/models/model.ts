export interface IPost {
  id: number;  
  userId: number;
  title: string;
  body: string
}

export interface PostState {
  posts: IPost[];
  loading: boolean;
  error: string | null;
  selected: number
}
  
  