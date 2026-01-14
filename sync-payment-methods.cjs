const { Pool } = require('pg');
require('dotenv').config();

async function syncPaymentMethods() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log('🔄 Syncing payment methods configuration...\n');

    // Get current site_config
    const result = await pool.query("SELECT key, value FROM site_config WHERE key = 'footer'");

    if (result.rows.length === 0) {
      console.log('❌ No site_config found. Creating default configuration...');

      // Create default config with payment methods
      await pool.query(
        `
        INSERT INTO site_config (key, value) VALUES
        ('footer', $1)
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
      `,
        [
          JSON.stringify({
            bankUnit: '长安慈善会',
            bankName: '交通银行西安自强西路支行',
            bankAccount: '611301135018000476008',
            phone: '029-88443055',
            email: 'info@renai-changan.org',
            address: '西安慈善大厦A厅9层（未央区凤城四路105号）',
            techSupport: '技术支持：长安慈善会信息技术部',
          }),
        ]
      );

      console.log('✅ Default footer config created');
    } else {
      console.log('📋 Current footer config:', JSON.stringify(result.rows[0].value, null, 2));
    }

    // Check if paymentMethods exists in any config
    const paymentCheck = await pool.query(`
      SELECT key, value FROM site_config
      WHERE value::text LIKE '%paymentMethods%'
    `);

    if (paymentCheck.rows.length === 0) {
      console.log('\n⚠️  No paymentMethods configuration found in database');
      console.log('💡 Admin needs to configure payment methods in Settings > 电子支付方式设置');
      console.log('\nDefault structure will be:');
      console.log(
        JSON.stringify(
          {
            paymentMethods: {
              alipay: {
                name: '长安慈善会',
                account: '',
                icon: '',
              },
              wechat: {
                name: '长安慈善会',
                account: '',
                icon: '',
              },
            },
          },
          null,
          2
        )
      );
    } else {
      console.log('\n✅ Payment methods configuration found:');
      paymentCheck.rows.forEach((row) => {
        console.log(`   ${row.key}:`, JSON.stringify(row.value, null, 2));
      });
    }

    // Check for old donationQRs config
    const qrCheck = await pool.query(`
      SELECT key, value FROM site_config
      WHERE value::text LIKE '%donationQRs%'
    `);

    if (qrCheck.rows.length > 0) {
      console.log('\n📌 Found old donationQRs configuration:');
      qrCheck.rows.forEach((row) => {
        const qrs = row.value.donationQRs;
        if (qrs) {
          console.log('   QR1:', qrs.qr1 || 'not set');
          console.log('   QR2:', qrs.qr2 || 'not set');
          console.log(
            '\n💡 You can migrate these to paymentMethods.alipay.icon and paymentMethods.wechat.icon'
          );
        }
      });
    }

    console.log('\n✅ Sync check complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Login to admin panel');
    console.log('   2. Go to Settings > 电子支付方式设置');
    console.log('   3. Configure Alipay and WeChat payment icons (300x400px recommended)');
    console.log('   4. Save settings');
    console.log('   5. Check /about page > 捐赠方式 to verify display');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

syncPaymentMethods();
