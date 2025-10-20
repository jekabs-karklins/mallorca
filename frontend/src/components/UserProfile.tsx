import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export const UserProfile: React.FC = () => {
  const { user: firebaseUser, loading: authLoading } = useAuth();
  const { currentUser: backendUser, loading: userLoading, hasMembership } = useCurrentUser();

  if (authLoading || userLoading) {
    return <div>Loading...</div>;
  }

  if (!firebaseUser) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Firebase Auth</h3>
        <p>Email: {firebaseUser.email}</p>
        <p>UID: {firebaseUser.uid}</p>
        <p>Email Verified: {firebaseUser.emailVerified ? 'Yes' : 'No'}</p>
      </div>

      {backendUser && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Backend User Data</h3>
          <p>Created At: {backendUser.createdAt.toLocaleDateString()}</p>
          <p>Has Membership: {hasMembership() ? 'Yes' : 'No'}</p>
          {backendUser.membershipEndDate && (
            <p>Membership Ends: {backendUser.membershipEndDate.toLocaleDateString()}</p>
          )}
        </div>
      )}
    </div>
  );
};
