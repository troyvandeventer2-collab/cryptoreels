'use server';

import { query } from '@/lib/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { getAppSettings } from '@/lib/settings';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Hardcoded admin fallback (works even without database, e.g. on Vercel)
  if (email === 'owner@cryptoreels.com' && password === 'adminpassword') {
    return await loginWithUser({ id: 'admin-001', email: 'owner@cryptoreels.com', name: 'Owner', status: 'active' });
  }

  const users = await query<any>(`SELECT * FROM users WHERE email = '${email}' AND password_hash = '${password}'`);

  if (users.length === 0) {
    console.error('Invalid email or password');
    return;
  }

  const user = users[0];
  await loginWithUser(user);
}

async function loginWithUser(user: any) {
  const cookieStore = await cookies();
  cookieStore.set('user_id', user.id, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });

  if (user.email === 'owner@cryptoreels.com') {
    redirect('/admin');
  } else {
    redirect('/dashboard');
  }
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  const existing = await query<any>(`SELECT * FROM users WHERE email = '${email}'`);
  if (existing.length > 0) {
    console.error('User already exists');
    return;
  }

  const settings = await getAppSettings();
  const id = uuidv4();
  const trialEnd = new Date();
  trialEnd.setDate(trialEnd.getDate() + settings.trial_duration_days);
  const trialEndStr = trialEnd.toISOString().replace('T', ' ').replace('Z', '');

  await query(`INSERT INTO users (id, email, password_hash, name, trial_end) VALUES ('${id}', '${email}', '${password}', '${name}', '${trialEndStr}')`);

  const cookieStore = await cookies();
  cookieStore.set('user_id', id, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });

  redirect('/dashboard');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('user_id');
  redirect('/login');
}

export async function getSession() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('user_id')?.value;
  if (!userId) return null;

  // Hardcoded admin fallback
  if (userId === 'admin-001') {
    return { id: 'admin-001', email: 'owner@cryptoreels.com', name: 'Owner', status: 'active' };
  }

  const users = await query<any>(`SELECT * FROM users WHERE id = '${userId}'`);
  return users.length > 0 ? users[0] : null;
}
