export const formatCurrency = (amount: number | string): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '￥0';
  // Remove CNY prefix if present and use symbol only if needed, or just let it be standard
  // toLocaleString with zh-CN usually returns "¥1,234.56" or "CN¥1,234.56" depending on browser
  // Let's force a consistent format: "￥" + number with commas
  return '￥' + num.toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) return dateString;
    return date.toISOString().split('T')[0];
  } catch (e) {
    return dateString;
  }
};
