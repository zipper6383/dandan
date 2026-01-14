# Category Management - Quick Reference

## 🚀 Quick Start

### Access Category Manager

```
URL: http://localhost:3000/#/admin/categories
Login: admin / admin
```

### API Endpoints

```bash
# Get all categories
GET http://localhost:3001/api/categories

# Get single category
GET http://localhost:3001/api/categories/:id

# Create category (Admin only)
POST http://localhost:3001/api/categories
Content-Type: application/json
Authorization: Bearer <token>
{
  "name": "Environmental Protection",
  "slug": "environment",
  "type": "project",
  "sortOrder": 10
}

# Update category (Admin only)
PUT http://localhost:3001/api/categories/:id
Content-Type: application/json
Authorization: Bearer <token>
{
  "name": "Updated Name",
  "sortOrder": 5
}

# Delete category (Admin only)
DELETE http://localhost:3001/api/categories/:id
Authorization: Bearer <token>
```

## 📁 File Locations

### Backend

- Controller: `server/controllers/category.controller.ts`
- Routes: `server/routes/category.routes.ts`
- Server: `server/index.ts` (line 24, 62)

### Frontend

- Types: `src/types.ts` (Category interface)
- API Client: `src/services/api.ts` (CategoriesAPI)
- Admin UI: `src/pages/Admin/CategoryManager.tsx`
- Navigation: `src/components/Layout/AdminLayout.tsx` (line 33)
- Routing: `src/App.tsx` (line 35, 203-210)

### Database

- Schema: `database/schema.sql` (categories table)
- Seed Data: `database/schema.sql` (INSERT statements)

## 🔧 Common Tasks

### Add New Category Type

```typescript
// 1. Update type in src/types.ts
type: 'news' | 'project' | 'download' | 'event'; // Add 'event'

// 2. Update typeLabels in CategoryManager.tsx
const typeLabels = {
  news: '新闻',
  project: '项目',
  download: '下载',
  event: '活动', // Add this
};

// 3. Update select options in form
<option value="event">活动</option>
```

### Query Categories in Components

```typescript
import { CategoriesAPI } from '../services/api';

// In component
const [categories, setCategories] = useState<Category[]>([]);

useEffect(() => {
  const loadCategories = async () => {
    const data = await CategoriesAPI.getAll();
    setCategories(data);
  };
  loadCategories();
}, []);
```

### Filter by Type

```typescript
// Get only project categories
const projectCategories = categories.filter((c) => c.type === 'project');

// Get only news categories
const newsCategories = categories.filter((c) => c.type === 'news');
```

## 🐛 Troubleshooting

### Error: "Category slug already exists"

- Slug must be unique across all categories
- Use different slug or update existing category

### Error: "Cannot delete category: X projects and Y news items are using it"

- Category is in use by projects or news
- Reassign projects/news to different category first
- Or keep the category

### Error: "Failed to fetch categories"

- Check backend server is running (port 3001)
- Check database connection
- Check network/CORS settings

### TypeScript Error: "Property 'sortOrder' does not exist"

- Ensure Category interface is imported from '../types'
- Check database query uses `sort_order as "sortOrder"`

## 📊 Database Queries

### Get categories with usage count

```sql
SELECT
  c.id,
  c.name,
  c.slug,
  c.type,
  c.sort_order,
  COUNT(DISTINCT p.id) as project_count,
  COUNT(DISTINCT n.id) as news_count
FROM categories c
LEFT JOIN projects p ON p.category_id = c.id
LEFT JOIN news n ON n.category_id = c.id
GROUP BY c.id
ORDER BY c.sort_order ASC;
```

### Find unused categories

```sql
SELECT c.*
FROM categories c
LEFT JOIN projects p ON p.category_id = c.id
LEFT JOIN news n ON n.category_id = c.id
WHERE p.id IS NULL AND n.id IS NULL;
```

## 🎯 Best Practices

1. **Slug Naming**
   - Use lowercase letters only
   - Use hyphens for spaces (e.g., `medical-aid`)
   - Keep it short and descriptive
   - Avoid special characters

2. **Sort Order**
   - Use increments of 10 (10, 20, 30...)
   - Allows easy insertion between items
   - Lower numbers appear first

3. **Type Selection**
   - `project` - For charity project categories
   - `news` - For news article categories
   - `download` - For downloadable resources

4. **Deletion**
   - Always check usage before deleting
   - Consider archiving instead of deleting
   - Reassign content to other categories first

## 🔐 Security Notes

- All write operations require admin authentication
- Read operations are public (for frontend display)
- SQL injection protected via parameterized queries
- Unique constraint on slug prevents duplicates
- Foreign key constraints prevent orphaned records

## 📈 Performance Tips

- Categories are cached in frontend state
- Use `sortOrder` for consistent ordering
- Index on `category_id` in projects/news tables
- Limit category count to reasonable number (<50)

## 🔗 Related Features

- **Project Manager**: Uses categories for project classification
- **News Manager**: Uses categories for news classification
- **Site Config**: May reference categories in navigation
- **Public Pages**: Display categories in filters/navigation
