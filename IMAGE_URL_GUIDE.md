# 🖼️ Hướng Dẫn URL Hình Ảnh - Image URL Guide

## ⚠️ Vấn Đề Hiện Tại Current Issue

Hình ảnh không hiển thị vì URL không đúng định dạng. Bạn đã sử dụng URL trang web thay vì URL trực tiếp đến file hình ảnh.

Images not displaying because URLs are not in correct format. You used webpage URLs instead of direct image file URLs.

## ❌ URL Sai Wrong URLs

### URL hiện tại bạn đã dùng:
```
❌ https://www.yeeyi.com/news/photos/1453324/
❌ https://www.suning.com/itemvideo/0071259807/12101363297.html
```

**Vấn đề**: Đây là URL của trang web, không phải file hình ảnh trực tiếp.

## ✅ URL Đúng Correct URLs

### Định dạng URL hình ảnh hợp lệ:
```
✅ https://example.com/image.png
✅ https://example.com/image.jpg  
✅ https://example.com/image.svg
✅ /images/payment/alipay-icon.png
✅ data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
```

## 🔍 Cách Tìm URL Hình Ảnh Đúng How to Find Correct Image URLs

### 1. Từ Website:
```
1. Vào trang web chứa hình
2. Right-click vào hình ảnh
3. Chọn "Copy image address" hoặc "Sao chép địa chỉ hình ảnh"
4. Paste URL đó vào admin settings
```

### 2. Upload lên Image Hosting:
```
Recommended services:
- imgur.com
- postimg.cc  
- imgbb.com
- cloudinary.com
```

### 3. Sử dụng Local Images:
```
1. Upload file vào thư mục /public/images/
2. Sử dụng URL: /images/filename.png
```

## 📐 Yêu Cầu Hình Ảnh Image Requirements

### 🔵 Alipay Image:
```
Size: 300x400px (W300 H400)
Format: PNG, JPG, SVG
Background: Transparent preferred
Content: Alipay QR code, logo, or payment instructions
```

### 🟢 WeChat Image:
```
Size: 300x400px (W300 H400)  
Format: PNG, JPG, SVG
Background: Transparent preferred
Content: WeChat QR code, logo, or payment instructions
```

## 🛠️ Cách Sửa Fix Instructions

### Bước 1: Tìm hình ảnh đúng
1. Tìm hình Alipay QR code 300x400px
2. Tìm hình WeChat QR code 300x400px

### Bước 2: Upload hình ảnh
```bash
# Option 1: Upload to imgur
1. Go to imgur.com
2. Upload your image
3. Right-click → Copy image address
4. URL sẽ có dạng: https://i.imgur.com/abc123.png
```

### Bước 3: Cập nhật trong admin
```
1. Login admin panel
2. Settings → 电子支付方式设置
3. Paste correct image URLs:
   - 支付宝图标: https://i.imgur.com/alipay123.png
   - 微信图标: https://i.imgur.com/wechat456.png
4. Save settings
```

## 🔧 Technical Validation

### URL Validation Logic:
```javascript
// Component sẽ check URL có hợp lệ không
const isValidImageUrl = (url) => {
  const imageExtensions = /\\.(jpg|jpeg|png|gif|svg|webp)(\\?.*)?$/i;
  const isDataUrl = url.startsWith('data:image/');
  return imageExtensions.test(url) || isDataUrl;
};
```

### Error Handling:
- ✅ Invalid URL → Show fallback text
- ✅ Image load error → Show fallback text  
- ✅ Loading state → Show spinner
- ✅ Success → Show image

## 📱 Recommended Image Sources

### 1. Official Payment QR Codes:
```
- Alipay official QR generator
- WeChat Pay QR generator  
- Bank payment QR codes
```

### 2. Custom Payment Instructions:
```
- Step-by-step payment guide
- Screenshots with instructions
- Branded payment visuals
```

### 3. Professional Templates:
```
- 300x400px payment card templates
- QR code with branding
- Contact information cards
```

## 🎨 Design Examples

### Alipay Image Example:
```
┌─────────────────┐
│   [Alipay Logo] │
│                 │
│   [QR Code]     │
│                 │
│ Scan to Pay     │
│ 扫码支付        │
│                 │
│ Account: xxx    │
└─────────────────┘
300px × 400px
```

### WeChat Image Example:
```
┌─────────────────┐
│   [WeChat Logo] │
│                 │
│   [QR Code]     │
│                 │
│ WeChat Pay      │
│ 微信支付        │
│                 │
│ ID: xxx         │
└─────────────────┘
300px × 400px
```

## 🚨 Common Mistakes

### ❌ Sai Thường Gặp:
1. **Website URL**: `https://website.com/page/`
2. **Video URL**: `https://site.com/video.html`
3. **Broken Link**: `https://expired-link.com/image.png`
4. **Wrong Format**: `https://site.com/document.pdf`

### ✅ Đúng Cách:
1. **Direct Image**: `https://site.com/image.png`
2. **Local Path**: `/images/payment.png`
3. **Data URL**: `data:image/png;base64,...`
4. **CDN URL**: `https://cdn.example.com/img.jpg`

---

**Solution**: ✅ **Sử dụng URL trực tiếp đến file hình ảnh**
**Status**: 🔧 **Cần cập nhật URL trong admin settings**
**Next Step**: 📝 **Upload hình ảnh đúng định dạng và cập nhật URL**