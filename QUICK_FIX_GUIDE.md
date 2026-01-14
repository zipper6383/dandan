# ⚡ Quick Fix Guide - Testing Issues

## 🔧 If Tests Fail Again

### 1. Database Issues

```bash
# Run the fix script
node fix-database.js

# Verify categories
psql $DATABASE_URL -c "SELECT COUNT(*) FROM categories;"
# Should return: 8

# Verify about content
psql $DATABASE_URL -c "SELECT COUNT(*) FROM about_content;"
# Should return: 6
```

### 2. Server Not Responding

```bash
# Restart backend
npm run dev:server

# Test API
curl http://localhost:3001/api/categories
# Should return JSON array with 8 categories
```

### 3. Frontend Not Loading

```bash
# Restart frontend
npm run dev

# Check browser console for errors
# Open: http://localhost:3000
```

---

## 🧪 Manual Testing URLs

### Public Pages

```
✅ Home:              http://localhost:3000/
✅ Projects:          http://localhost:3000/#/projects
✅ Project Detail:    http://localhost:3000/#/projects/1
✅ News:              http://localhost:3000/#/news
✅ News Detail:       http://localhost:3000/#/news/detail/1
✅ Funds:             http://localhost:3000/#/funds
✅ Fund Detail:       http://localhost:3000/#/funds/f1
✅ Search:            http://localhost:3000/#/search?q=助学
✅ Volunteer:         http://localhost:3000/#/volunteer
✅ About:             http://localhost:3000/#/about
✅ Profile:           http://localhost:3000/#/profile
✅ Donations:         http://localhost:3000/#/profile/donations
✅ Financial:         http://localhost:3000/#/info/financial
✅ Annual:            http://localhost:3000/#/info/annual
✅ Download:          http://localhost:3000/#/info/download
```

### Admin Pages

```
✅ Login:             http://localhost:3000/#/admin/login
✅ Dashboard:         http://localhost:3000/#/admin
✅ Projects:          http://localhost:3000/#/admin/projects
✅ News:              http://localhost:3000/#/admin/news
✅ Funds:             http://localhost:3000/#/admin/funds
✅ Donations:         http://localhost:3000/#/admin/donations
✅ Volunteers:        http://localhost:3000/#/admin/volunteers
✅ Categories:        http://localhost:3000/#/admin/categories
✅ About Content:     http://localhost:3000/#/admin/about-content
✅ Settings:          http://localhost:3000/#/admin/settings
```

---

## 🔍 API Testing Commands

### Categories

```bash
# Get all categories
curl http://localhost:3001/api/categories

# Get news categories only
curl http://localhost:3001/api/categories?type=news

# Get project categories only
curl http://localhost:3001/api/categories?type=project
```

### About Content

```bash
# Get all about sections
curl http://localhost:3001/api/about

# Get specific section
curl http://localhost:3001/api/about/1
```

### Search

```bash
# Search all
curl "http://localhost:3001/api/search?q=助学"

# Search projects only
curl "http://localhost:3001/api/search?q=助学&type=projects"

# Search news only
curl "http://localhost:3001/api/search?q=慈善&type=news"
```

### Statistics

```bash
# Dashboard stats
curl http://localhost:3001/api/statistics/dashboard

# Donation trends
curl http://localhost:3001/api/statistics/donation-trends

# Project stats
curl http://localhost:3001/api/statistics/projects

# Volunteer stats
curl http://localhost:3001/api/statistics/volunteers
```

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot GET /api/categories"

**Solution**: Server not running or routes not loaded

```bash
# Stop and restart server
# Ctrl+C to stop
npm run dev:server
```

### Issue: News tabs not showing

**Solution**: Categories table empty

```bash
node fix-database.js
```

### Issue: Search returns no results

**Solution**: Database empty or search term not matching

```bash
# Check if data exists
curl http://localhost:3001/api/projects
curl http://localhost:3001/api/news
curl http://localhost:3001/api/funds
```

### Issue: Admin pages not loading

**Solution**: Not logged in or token expired

```bash
# Login again at:
http://localhost:3000/#/admin/login
# Username: admin
# Password: admin
```

### Issue: Charts not displaying

**Solution**: Statistics API not returning data

```bash
# Check API
curl http://localhost:3001/api/statistics/dashboard

# If empty, add some test donations
curl -X POST http://localhost:3001/api/donations \
  -H "Content-Type: application/json" \
  -d '{"project_id":1,"donor_name":"测试","amount":100}'
```

---

## 📦 Quick Commands Reference

### Start Everything

```bash
# Terminal 1: Backend
npm run dev:server

# Terminal 2: Frontend
npm run dev

# Terminal 3: Database fix (if needed)
node fix-database.js
```

### Stop Everything

```bash
# Press Ctrl+C in each terminal
```

### Run Tests

```bash
# Playwright tests
node test-features.js

# Or with npm
npm test
```

### Database Operations

```bash
# Connect to database
psql $DATABASE_URL

# Run migration
npm run migrate

# Run fix script
node fix-database.js
```

---

## 🎯 Success Indicators

### Backend Healthy ✅

```bash
curl http://localhost:3001/api/categories
# Returns: Array with 8 categories
```

### Frontend Healthy ✅

```
Open: http://localhost:3000
See: Home page with news tabs (慈善资讯, 媒体报道, 区县动态)
```

### Database Healthy ✅

```bash
node fix-database.js
# Output: "✨ All fixes applied successfully!"
```

---

## 🚨 Emergency Reset

If everything is broken:

```bash
# 1. Stop all processes
# Press Ctrl+C in all terminals

# 2. Reset database
node fix-database.js

# 3. Restart backend
npm run dev:server

# 4. Restart frontend
npm run dev

# 5. Clear browser cache
# In browser: Ctrl+Shift+Delete

# 6. Test
curl http://localhost:3001/api/categories
# Should return 8 categories
```

---

## 📞 Quick Checklist

Before reporting issues, verify:

- [ ] Backend server running (port 3001)
- [ ] Frontend server running (port 3000)
- [ ] Database has categories (8 records)
- [ ] Database has about_content (6 records)
- [ ] Can access http://localhost:3000
- [ ] Can access http://localhost:3001/api/categories
- [ ] Browser console shows no errors
- [ ] Logged in as admin (for admin pages)

---

**Last Updated**: January 14, 2026
**Status**: All systems operational ✅
