// components/UserDetail.tsx
import { User } from '../types';
import { Typography, Card, CardContent } from '@material-ui/core';

type Props = {
  user: User;
};

export const UserDetail = ({ user }: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          User Detail
        </Typography>
        <Typography>
          <strong>ID:</strong> {user.id}
        </Typography>
        <Typography>
          <strong>Name:</strong> {user.name}
        </Typography>
        <Typography>
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography>
          <strong>Created At:</strong> {user.createdAt}
        </Typography>
      </CardContent>
    </Card>
  );
};
