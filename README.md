# Xi'an Charity Association Portal

Cổng thông tin điện tử của Hội Từ thiện Tây An - Ứng dụng web React hiện đại cho quản lý và hiển thị thông tin từ thiện.

## 🎯 Tính Năng

### Công Khai (Public)

- ✅ Xem thông tin dự án từ thiện và tiến độ quyên góp
- ✅ Đọc tin tức, thông báo từ hội
- ✅ Đăng ký làm tình nguyện viên
- ✅ Tra cứu danh sách quyên góp minh bạch
- ✅ Tìm kiếm full-text
- ✅ Chia sẻ lên mạng xã hội

### Quản Trị (Admin)

- ✅ Dashboard thống kê với biểu đồ
- ✅ Quản lý dự án từ thiện (CRUD)
- ✅ Quản lý tin tức và danh mục
- ✅ Quản lý quỹ từ thiện
- ✅ Theo dõi quyên góp và tình nguyện viên
- ✅ CMS cho nội dung "Về chúng tôi"
- ✅ Cấu hình website

## 🛠️ Tech Stack

### Frontend

- **React 18.3.1** - UI framework
- **TypeScript 5.8.2** - Type safety
- **Vite 6.2.0** - Build tool
- **Tailwind CSS v4** - Styling
- **React Router v6** - Routing
- **React Hook Form + Zod** - Form validation
- **Recharts** - Data visualization

### Backend

- **Express.js 5.2.1** - API server
- **PostgreSQL** - Database (Neon serverless)
- **JWT** - Authentication
- **Multer** - File uploads
- **bcrypt** - Password hashing

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm hoặc yarn

### Installation

```bash
# Clone repository
git clone https://github.com/zipper6383/dandan.git
cd dandan

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Chỉnh sửa .env với thông tin database của bạn

# Setup database
node fix-database.js

# Start development servers
# Terminal 1: Backend
npm run dev:server

# Terminal 2: Frontend
npm run dev
```

### Environment Variables

```env
DATABASE_URL=postgresql://user:password@host:port/database
PORT=3001
NODE_ENV=development
```

## 📦 Project Structure

```
dandan/
├── src/                    # Frontend source
│   ├── components/        # React components
│   ├── contexts/          # React Context providers
│   ├── pages/            # Page components
│   ├── services/         # API services
│   └── types.ts          # TypeScript types
├── server/                # Backend source
│   ├── controllers/      # Route controllers
│   ├── routes/          # API routes
│   └── config/          # Configuration
├── database/             # Database scripts
│   ├── schema.sql       # Database schema
│   ├── seed.sql         # Seed data
│   └── fix-database.sql # Fix script
└── public/              # Static assets
```

## 🧪 Testing

```bash
# Run Playwright tests
node test-features.js

# Current status: 13/13 tests passing (100%)
```

## 📚 Documentation

- [Complete System Overview](COMPLETE_SYSTEM_OVERVIEW.md)
- [API Documentation](README_FINAL.md)
- [Testing Guide](RUN_TESTS.md)
- [Quick Fix Guide](QUICK_FIX_GUIDE.md)

## 🎨 Features Implemented

### Priority 1 ✅

- Dynamic category system
- Fund detail pages
- Info pages (Financial, Annual, Download)

### Priority 2 ✅

- Pagination
- Share functionality
- User profile pages

### Priority 3 ✅

- About content CMS
- Advanced search
- Dashboard with charts

## 🔐 Default Admin Account

```
Username: admin
Password: admin
```

**⚠️ Đổi password ngay sau khi deploy production!**

## 🌐 Deployment

### Frontend

```bash
npm run build
# Deploy dist/ folder to Netlify, Vercel, etc.
```

### Backend

```bash
# Set environment variables
export DATABASE_URL="postgresql://..."
export NODE_ENV="production"

# Start server
npm run dev:server
```

## 📊 Status

- ✅ **Development**: Complete
- ✅ **Testing**: 100% pass rate (13/13)
- ✅ **Documentation**: Complete
- ✅ **Production Ready**: Yes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- Development Team - Xi'an Charity Association

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS
- All open source contributors

---

**Made with ❤️ for Xi'an Charity Association**
