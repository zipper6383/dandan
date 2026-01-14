import { Request, Response } from 'express';
import { pool } from '../config/db';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT id, name, slug, type, sort_order as "sortOrder"
      FROM categories
      ORDER BY sort_order ASC, name ASC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Categories Error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT id, name, slug, type, sort_order as "sortOrder"
       FROM categories WHERE id = $1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(result.rows[0]);
  } catch (error: unknown) {
    console.error('Get category by ID error:', error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name, slug, type, sortOrder } = req.body;

  try {
    const insertResult = await pool.query(
      `INSERT INTO categories (name, slug, type, sort_order)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [name, slug, type, sortOrder || 0]
    );

    const newId = insertResult.rows[0].id;

    const result = await pool.query(
      `SELECT id, name, slug, type, sort_order as "sortOrder"
       FROM categories WHERE id = $1`,
      [newId]
    );

    res.json(result.rows[0]);
  } catch (error: unknown) {
    console.error(error);
    if (error && typeof error === 'object' && 'code' in error && error.code === '23505') {
      // Unique constraint violation
      res.status(409).json({ error: 'Category slug already exists' });
    } else {
      res.status(500).json({ error: 'Failed to create category' });
    }
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { name, slug, type, sortOrder } = req.body;

  try {
    const updateResult = await pool.query(
      `UPDATE categories
       SET name=$1, slug=$2, type=$3, sort_order=$4
       WHERE id = $5
       RETURNING id`,
      [name, slug, type, sortOrder, req.params.id]
    );

    if (updateResult.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const id = updateResult.rows[0].id;

    const result = await pool.query(
      `SELECT id, name, slug, type, sort_order as "sortOrder"
       FROM categories WHERE id = $1`,
      [id]
    );

    res.json(result.rows[0]);
  } catch (error: unknown) {
    console.error(error);
    if (error && typeof error === 'object' && 'code' in error && error.code === '23505') {
      res.status(409).json({ error: 'Category slug already exists' });
    } else {
      res.status(500).json({ error: 'Failed to update category' });
    }
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    // Check if category is in use
    const checkProjects = await pool.query(
      'SELECT COUNT(*) as count FROM projects WHERE category_id = $1',
      [req.params.id]
    );
    const checkNews = await pool.query(
      'SELECT COUNT(*) as count FROM news WHERE category_id = $1',
      [req.params.id]
    );

    const projectCount = parseInt(checkProjects.rows[0].count);
    const newsCount = parseInt(checkNews.rows[0].count);

    if (projectCount > 0 || newsCount > 0) {
      return res.status(400).json({
        error: `Cannot delete category: ${projectCount} projects and ${newsCount} news items are using it`,
      });
    }

    await pool.query('DELETE FROM categories WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
};
