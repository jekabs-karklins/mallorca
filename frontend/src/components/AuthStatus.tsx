import React from 'react';
import { useAuth } from '@/hooks/useAuth';

export const AuthStatus: React.FC = () => {
  const { user, loading, error } = useAuth();

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  if (error) {
    return <div>Authentication error: {error.message}</div>;
  }

  if (user) {
    return (
      <div>
        <h2>Welcome!</h2>
        <p>Email: {user.email}</p>
        <p>UID: {user.uid}</p>
        <p>Email Verified: {user.emailVerified ? 'Yes' : 'No'}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Not authenticated</h2>
      <p>Please sign in to continue.</p>
    </div>
  );
};
