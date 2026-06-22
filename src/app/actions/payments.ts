'use server';

import { query } from '@/lib/db';
import { getSession } from './auth';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';

export async function submitPayment(formData: FormData): Promise<void> {
  const user = await getSession();
  if (!user) return;

  const currency = formData.get('currency') as string;
  const txHash = formData.get('txHash') as string;
  const amountUsd = 5.0; // Fixed for MVP
  
  const walletAddress = currency === 'BTC' 
    ? 'bc1qs5jhsj3hnkapa9fhnzttupl65t3x00362xgk4a' 
    : '0xf18224D383F9044BeDB2D308484191565Bc3029a';

  try {
    const id = uuidv4();
    await query(`INSERT INTO payments (id, user_id, amount_usd, currency, tx_hash, wallet_address, status) 
                 VALUES ('${id}', '${user.id}', ${amountUsd}, '${currency}', '${txHash}', '${walletAddress}', 'pending')`);
    
    revalidatePath('/dashboard/billing');
  } catch (error) {
    console.error('Payment Submission Error:', error);
  }
}
