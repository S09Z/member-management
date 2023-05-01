import { useState, useEffect } from 'react';
import { getAllUsers } from '../lib/user';
import { TextField, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, Button } from '@material-ui/core';
import { User } from '../types';
import { SearchBar } from './SearchBar';
import Link from 'next/link';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';

type Props = {
  users: User[];
};

export const UserList = ({ users: initialUsers }: Props) => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteUserId, setDeleteUserId] = useState('');
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);

  const handleSearch = async (searchTerm: string) => {
    const response = await fetch(`/api/users/search?q=${encodeURIComponent(searchTerm)}&page=${page}&perPage=${perPage}`);
    const { results, totalPages } = await response.json();
    setUsers(results);
    setSearchTerm(searchTerm);
    setTotalPages(totalPages);
  };

  const handleReset = async () => {
    const users = await getAllUsers();
    setUsers(users);
    setSearchTerm('');
  };

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(`/api/users?page=${page}&perPage=${perPage}`);
      const { results, totalPages } = await response.json();
      setUsers(results);
      setTotalPages(totalPages);
    }
    fetchUsers();
  }, [page, perPage]);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPerPage(Number(event.target.value));
    setPage(0);
  };

  const handleRemove = async (id: string) => {
    setDeleteUserId(id);
    setIsConfirmationDialogOpen(true);
  };

  const handleCloseConfirmationDialog = () => {
    setIsConfirmationDialogOpen(false);
    setDeleteUserId('');
  };

  const handleConfirmDeletion = async () => {
    await fetch(`/api/users/${deleteUserId}`, { method: 'DELETE' });
    const users = await getAllUsers();
    setUsers(users);
    setIsConfirmationDialogOpen(false);
    setDeleteUserId('');
  };

  return (
    <>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} onReset={handleReset} />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.createdAt}</TableCell>
              <TableCell>
                <Link href={`/users/${user.id}`} passHref>
                  <Button variant="contained" color="primary" component="a">
                    Edit
                  </Button>
                </Link>{' '}
                <Button variant="contained" color="secondary" onClick={() => handleRemove(user.id)}>
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalPages * perPage}
        rowsPerPage={perPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePerPageChange}
      />

      <DeleteConfirmationDialog
        isOpen={isConfirmationDialogOpen}
        onClose={handleCloseConfirmationDialog}
        onConfirm={handleConfirmDeletion}
        title="Delete User"
        message={`Are you sure you want to delete the user with id ${deleteUserId}?`}
      />
    </>
  );
};
