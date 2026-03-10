'use client';

import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/contexts/auth.context';
import { User } from '@/graphql/@types';
import { MY_USER } from '@/graphql/gql/queries/user.query';

import ProfileTabs from './tabs';
import ProfileUser from './user';

export default function ProfileContainer() {
  const router = useRouter();
  const { user: authUser, isLoading: isAuthLoading } = useAuth();

  const { data, loading } = useQuery<{ myUser: User }>(MY_USER, {
    variables: {
      query: {
        where: JSON.stringify({ id: authUser?.id }),
      },
    },
  });

  useEffect(() => {
    if (isAuthLoading) return;

    if (!loading && !data?.myUser) {
      router.push('/');
    }
  }, [loading, data, router, isAuthLoading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data?.myUser;

  if (!user) {
    return <div>Không tìm thấy tài khoản</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 mb-8">
      <ProfileUser user={user} />
      <ProfileTabs />
    </div>
  );
}
