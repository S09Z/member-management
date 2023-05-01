import { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getUserById, updateUser } from '../../../lib/user';

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedUser = await updateUser(Number(id), name, email);
    router.push(`/users/${updatedUser.id}`);
  };

  const fetchUser = async () => {
    const user = await getUserById(Number(id));
    setName(user.name);
    setEmail(user.email);
  };

  useState(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  return (
    <div className="container mx-auto my-8">
      <Head>
        <title>Edit User</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-4xl font-bold mb-4">Edit User</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextField label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
        </div>

        <div className="mb-4">
          <TextField label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
        </div>

        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
