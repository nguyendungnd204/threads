export interface Follow {
    id?: string;
    followerId: string;
    followingId: string; 
    createdAt: number | Date;
    updatedAt: number | Date;
  }