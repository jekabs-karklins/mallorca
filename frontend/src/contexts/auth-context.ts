import { createContext } from 'react';
import { User } from 'firebase/auth';

export interface AuthContextType {
  user: User | null | undefined;
  loading: boolean;
  error: Error | undefined;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
