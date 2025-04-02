export interface Comment {
    id?: string;
    postId: string;
    authorId: string; 
    content: string;
    parentCommentId?: string | null;
    likes: string[]; 
    createdAt: number | Date;
    updatedAt: number | Date;
  }