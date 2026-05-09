export interface UserPayload {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
