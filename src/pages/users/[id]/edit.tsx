import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUserById, updateUser } from '@/lib/user';
import { User } from '@/types';
import { TextField, Button } from '@material-ui/core';
import { ConfirmationDialog } from '@/components/ConfirmationDialog';

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(false);
    setError(null);
    setIsConfirmationDialogOpen(true);
  };

  const handleConfirm = async () => {
    setIsSaving(true);
    setIsConfirmationDialogOpen(false);
    setError(null);
    try {
      const updatedUser = await updateUser(id as string, { name, email });
      setUser(updatedUser);
      setIsSaving(false);
      router.push('/users');
    } catch (error) {
      setIsSaving(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserById(id as string);
      setUser(user);
      setName(user.name);
      setEmail(user.email);
    };
    if (id) {
      fetchUser();
    }
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Button type="submit" variant="contained" color="primary" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
        {error && <div>{error}</div>}
      </form>
      <ConfirmationDialog
        isOpen={isConfirmationDialogOpen}
        onClose={() => setIsConfirmationDialogOpen(false)}
        onConfirm={handleConfirm}
        title="Confirm Changes"
        message="Are you sure you want to save the changes?"
      />
    </>
  );
};

export default Edit;
