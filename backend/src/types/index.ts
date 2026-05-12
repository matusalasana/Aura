
export interface UserPayload {
  id: string;
  email?: string;
  role?: 'admin' | 'user';
};