export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string
  }

  export interface PostState {
    posts: IPost[];
    loading: boolean;
    error: string | null;
    selected: number
  }
  
  