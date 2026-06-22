'use server';

import { query } from '@/lib/db';
import { getSession } from './auth';
import { revalidatePath } from 'next/cache';

export async function verifyPayment(paymentId: string) {
  const user = await getSession();
  if (!user || user.email !== 'owner@cryptoreels.com') return;

  try {
    const payments = await query<any>(`SELECT * FROM payments WHERE id = '${paymentId}'`);
    if (payments.length === 0) return;

    const payment = payments[0];
    
    // Update payment status
    await query(`UPDATE payments SET status = 'verified' WHERE id = '${paymentId}'`);
    
    // Update user status
    await query(`UPDATE users SET status = 'active' WHERE id = '${payment.user_id}'`);
    
    revalidatePath('/admin');
  } catch (error) {
    console.error('Verify Payment Error:', error);
  }
}
