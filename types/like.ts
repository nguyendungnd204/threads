export interface Like {
    id?: string;
    userId: string;
    postId?: string | null;
    commentId?: string | null; 
    createdAt: number | Date;
    updatedAt: number | Date;
  }