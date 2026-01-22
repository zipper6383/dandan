import { formatCurrency, formatDate } from '../src/utils/format';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ Test Failed: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ Test Passed: ${message}`);
  }
}

console.log('🚀 Running Unit Tests for Utils...\n');

// Test formatCurrency
console.log('Testing formatCurrency:');
assert(formatCurrency(100) === '￥100', 'Should format integer 100 to ￥100');
assert(formatCurrency(1234.56) === '￥1,234.56', 'Should format 1234.56 to ￥1,234.56');
assert(formatCurrency(0) === '￥0', 'Should format 0 to ￥0');
assert(formatCurrency('500') === '￥500', 'Should format string "500" to ￥500');
assert(formatCurrency('abc') === '￥0', 'Should handle invalid string gracefully');

// Test formatDate
console.log('\nTesting formatDate:');
assert(formatDate('2025-01-01T12:00:00Z') === '2025-01-01', 'Should format ISO string');
assert(formatDate('2025-12-31') === '2025-12-31', 'Should keep YYYY-MM-DD');
assert(formatDate('') === '', 'Should handle empty string');
assert(formatDate('invalid-date') === 'invalid-date', 'Should return original string if invalid');

console.log('\n🎉 All Unit Tests Passed!');
