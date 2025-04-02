export interface Thread {
    id?: string;
    authorId: string; 
    content: string;
    image: string;
    deleted: boolean;
    likes: string[]; 
    comments: string[];
    createdAt: number | Date;
    updatedAt: number | Date;
  }