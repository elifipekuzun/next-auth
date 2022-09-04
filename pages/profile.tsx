import { NextPage, GetServerSideProps } from 'next';
import { UserProfile } from '../components/profile/user-profile';
import { getSession } from 'next-auth/react';

const ProfilePage: NextPage = () => {
  return (
    <>
      <UserProfile />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

export default ProfilePage;
