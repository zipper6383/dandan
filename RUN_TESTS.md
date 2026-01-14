# 🧪 Hướng Dẫn Chạy Tests

## ✅ Trạng Thái Hiện Tại: 13/13 PASS (100%)

---

## 🚀 Chạy Tests Nhanh

```bash
# Đảm bảo servers đang chạy
# Terminal 1: Backend
npm run dev:server

# Terminal 2: Frontend
npm run dev

# Terminal 3: Run tests
node test-features.js
```

---

## 📋 Kết Quả Mong Đợi

```
🧪 Starting Feature Tests...

✅ Test 1: Home Page Loading
   Page Title: 首页 | 长安仁爱慈善基金会
   News Tabs Found: ✓

✅ Test 2: Search Page
   Search Results Found: 1

✅ Test 3: Fund Detail Page
   Fund Title Found: ✓
   Share Section: ✓

✅ Test 4: User Profile Page
   Login Required: ✓

✅ Test 5: Donation History Page
   Page Loaded: ✓

✅ Test 6: Financial Reports Page
   Financial Reports: ✓

✅ Test 7: Annual Reports Page
   Annual Reports: ✓

✅ Test 8: Download Center Page
   Download Center: ✓

✅ Test 9: Admin Login
   Admin Login: ✓

✅ Test 10: Admin Dashboard
   Dashboard Loaded: ✓
   Charts Found: 3

✅ Test 11: About Content Editor
   Editor Loaded: ✓
   Rich Text Editor: ✓

✅ Test 12: Category Manager
   Category Manager: ✓

✅ Test 13: Fund Manager
   Fund Manager: ✓

🎉 All Tests Completed!
```

---

## 🔧 Nếu Tests Fail

### 1. Kiểm tra Servers

```bash
# Backend phải chạy trên port 3001
curl http://localhost:3001/api/categories

# Frontend phải chạy trên port 3000
# Mở browser: http://localhost:3000
```

### 2. Kiểm tra Database

```bash
# Chạy fix script
node fix-database.js

# Kết quả mong đợi:
# ✅ Categories: 8
# ✅ About content: 6
```

### 3. Restart Servers

```bash
# Ctrl+C để stop
# Sau đó chạy lại:
npm run dev:server  # Terminal 1
npm run dev         # Terminal 2
```

---

## 📊 Test Coverage

- **Public Pages**: 8/8 (100%)
- **Admin Pages**: 5/5 (100%)
- **Total**: 13/13 (100%)

---

## 🎯 URLs Test

### Public

- Home: http://localhost:3000/
- Search: http://localhost:3000/#/search?q=助学
- Fund Detail: http://localhost:3000/#/funds/1
- Profile: http://localhost:3000/#/profile
- Donations: http://localhost:3000/#/profile/donations
- Financial: http://localhost:3000/#/info/financial
- Annual: http://localhost:3000/#/info/annual
- Download: http://localhost:3000/#/info/download

### Admin

- Login: http://localhost:3000/#/admin/login
- Dashboard: http://localhost:3000/#/admin
- About Editor: http://localhost:3000/#/admin/about-content
- Categories: http://localhost:3000/#/admin/categories
- Funds: http://localhost:3000/#/admin/funds

---

## ✨ Tips

1. **Chạy tests trong headless mode**:

   ```javascript
   // Sửa trong test-features.js
   const browser = await chromium.launch({ headless: true });
   ```

2. **Tăng timeout nếu cần**:

   ```javascript
   await page.waitForTimeout(2000); // Tăng từ 1000 lên 2000
   ```

3. **Xem browser khi test**:
   ```javascript
   const browser = await chromium.launch({
     headless: false,
     slowMo: 100, // Chậm lại để xem rõ
   });
   ```

---

**Chúc bạn testing thành công!** 🎉
