export interface User {
    fullname: string | null;
    email: string | null;
    avatar: string | null;
    oauthProvider: 'google' | 'facebook';
    oauthId: string;
    bio?: string;
    followers?: { [key: string]: boolean };
    following?: { [key: string]: boolean };
    createdAt: object; 
    updatedAt: object; 
    lastLogin?: object; 
  }