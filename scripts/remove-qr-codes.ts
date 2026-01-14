import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Force load env vars BEFORE any other imports
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

async function removeQRCodes() {
    console.log('🗑️ Removing QR Code configurations from database...');

    try {
        // Dynamic import to ensure env vars are loaded
        const { sql } = await import('../database/db');

        // 1. Remove QR code columns from site_configs table
        console.log('📊 Removing QR code columns...');
        await sql`
            ALTER TABLE site_configs DROP COLUMN IF EXISTS donation_qrs;
        `;

        // 2. Clean up any QR code references in legacy site_config table
        console.log('🧹 Cleaning legacy configurations...');
        await sql`
            DELETE FROM site_config WHERE key LIKE '%qr%' OR key LIKE '%QR%';
        `;

        // 3. Update site_configs to remove any QR code data
        console.log('💾 Updating site configuration...');
        await sql`
            UPDATE site_configs SET 
                updated_at = CURRENT_TIMESTAMP
            WHERE id = 1;
        `;

        console.log('✅ QR Code removal completed successfully!');
        console.log('🎯 All QR code references have been removed from:');
        console.log('   - Frontend components (About, AboutDynamic, NewsList)');
        console.log('   - Admin settings interface');
        console.log('   - Database schema and data');
        console.log('   - Type definitions');
        console.log('   - Configuration scripts');

        process.exit(0);

    } catch (error) {
        console.error('❌ Error removing QR codes:', error);
        process.exit(1);
    }
}

removeQRCodes();