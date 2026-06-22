const { execSync } = require('child_process');
const { v4: uuidv4 } = require('uuid');

async function seed() {
  console.log('Seeding database...');
  
  const adminId = 'admin-123';
  const adminEmail = 'owner@cryptoreels.com';
  const adminPassword = 'adminpassword'; // Simple for MVP
  const trialEnd = new Date();
  trialEnd.setFullYear(trialEnd.getFullYear() + 100);
  const trialEndStr = trialEnd.toISOString().replace('T', ' ').replace('Z', '');

  const sql = `INSERT OR IGNORE INTO users (id, email, password_hash, name, status, trial_end) VALUES ('${adminId}', '${adminEmail}', '${adminPassword}', 'Admin', 'active', '${trialEndStr}')`;
  
  try {
    execSync(`team-db "${sql.replace(/'/g, "'\\''")}"`);
    console.log('Admin user seeded!');
  } catch (error) {
    console.error('Seeding failed:', error.message);
  }
}

seed();
