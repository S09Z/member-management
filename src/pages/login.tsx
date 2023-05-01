// pages/login.tsx
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TextField, Button } from '@material-ui/core';
import passport from 'passport';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await new Promise((resolve, reject) => {
      passport.authenticate('local', (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      })({ body: { email, password } } as any);
    });

    if (result) {
      router.push('/users');
    }
  };

  return (
    <div className="container mx-auto my-8">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-4xl font-bold mb-4">Login</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextField label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
        </div>

        <div className="mb-4">
          <TextField label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
        </div>

        <div className="mb-4">
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>{' '}
          <Link href="/" passHref>
            <Button variant="contained" color="default" component="a">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
