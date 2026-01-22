# Project Plan: Longgang Shanze Mutual Aid Portal

## 1. Tổng Quan Dự Án
- **Tên Dự Án**: Hệ thống quản lý và cổng thông tin điện tử 龙岗区善泽民工互助会 (Longgang District Shanze Migrant Worker Mutual Aid Association).
- **Mục Tiêu**: Thay thế thương hiệu cũ "长安仁爱慈善基金会" và "西安市慈善会" bằng thương hiệu mới, đồng thời đảm bảo tính nhất quán về dữ liệu và giao diện.
- **Công Nghệ**: React (Frontend), Node.js/Express (Backend), PostgreSQL (Database).

## 2. Kiến Trúc Hệ Thống (Mental Map)
- **Frontend**:
  - `src/pages/*`: Các trang chính (Home, About, Projects, News, Admin Dashboard).
  - `src/components/*`: Các component tái sử dụng (Header, Footer, Shared).
  - `src/contexts/*`: Quản lý state toàn cục (Auth, Data, SiteConfig).
  - `src/services/api.ts`: Giao tiếp với Backend.
- **Backend**:
  - `server/index.ts`: Entry point.
  - `server/controllers/*`: Xử lý logic nghiệp vụ.
  - `server/routes/*`: Định nghĩa API endpoints.
  - `server/config/db.ts`: Kết nối Database.
- **Database**:
  - Schema: `database/schema.sql` (Users, Projects, News, Funds, Donations, Volunteers, Notices, SiteConfig).
  - Migration & Seed: `database/migrations/*`, `database/seed.sql`.
- **DevOps/Tools**:
  - Vite: Build tool.
  - Scripts: `scripts/*` (Sync config, Seed data, Test scripts).

## 3. Trạng Thái Hiện Tại (Progress)
- **Phase 1: Brand Replacement (Hoàn thành)**
  - [x] Cập nhật `SiteConfigContext.tsx` và `init-site-config-db.ts`.
  - [x] Cập nhật các file Frontend (`Footer.tsx`, `Home.tsx`, `Login.tsx`, `About.tsx`, `Header.tsx`, `ProjectDetail.tsx`, `DownloadCenter.tsx`, `FinancialReports.tsx`).
  - [x] Cập nhật Backend/Database (`schema.sql`, `seed.sql`, `migrations/*`, `sync-database-config.ts`, `volunteer.controller.ts`, `FundManager.tsx`, `NewsManager.tsx`).
  - [x] Cập nhật Documentation (`docs/index.html`, `docs/architecture.md`, `docs/NOTICE_MANAGEMENT_GUIDE.md`).
  - [x] Cập nhật `package.json`.
  - [x] Loại bỏ hoàn toàn các tham chiếu địa lý cũ ("长安", "碑林区") trong code và database.

- **Phase 2: Verification & Testing (Hoàn thành)**
  - [x] Khởi động Backend Server để kiểm tra kết nối DB và API.
  - [x] Khởi động Frontend để kiểm tra hiển thị UI.
  - [x] Kiểm tra các luồng chính: Đăng nhập Admin, Chỉnh sửa Config, Xem tin tức.
  - [x] Kiểm tra chức năng Upload hình ảnh (Admin) - **Đã verify qua script test**.
  - [x] Cập nhật thông tin Admin (User: `admin`, Pass: `admin`).
  - [x] Kiểm tra tự động đăng nhập Admin bằng Playwright - **Thành công**.

## 4. Kế Hoạch Tiếp Theo (Next Steps)
- **Phase 3: Refactoring & Optimization**
  - [ ] Review code để tối ưu hóa performance.
  - [ ] Thêm Unit Tests cho các component quan trọng.
  - [ ] Triển khai CI/CD pipeline (nếu cần).

## 5. Ghi Chú & Lưu Ý
- **Consistency**: Đảm bảo tên tổ chức, địa chỉ (Shenzhen Longgang), số điện thoại (0755 83942567) nhất quán mọi nơi.
- **Database**: Cần chạy migration hoặc sync script nếu thay đổi cấu trúc bảng hoặc dữ liệu seed.
- **Admin Access**: Tài khoản admin mặc định: `admin` / `admin`. Nếu cần reset, sử dụng script `scripts/reset-admin-password.ts`.
