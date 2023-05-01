// pages/users/[id].tsx
import { useRouter } from 'next/router';
import { getUserById } from '../../lib/user';
import { User } from '../../types';

type Props = {
  user: User;
};

const UserDetailPage = ({ user }: Props) => {
  const router = useRouter();
  const { id } = router.query;

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>User Detail: {user.name}</h1>
      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
      <p>Created At: {user.createdAt}</p>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const user = await getUserById(id);
  return { props: { user } };
}

export default UserDetailPage;
