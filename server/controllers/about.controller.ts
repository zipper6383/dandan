import { Request, Response } from 'express';
import { pool } from '../config/db';

export const getAboutContent = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT id, section, title, content, sort_order, is_active, updated_at
      FROM about_content
      WHERE is_active = true
      ORDER BY sort_order ASC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('About Content Error:', error);
    res.status(500).json({ error: 'Failed to fetch about content' });
  }
};

export const getAboutContentById = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM about_content WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Content not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
};

export const createAboutContent = async (req: Request, res: Response) => {
  const { section, title, content, sortOrder, isActive } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO about_content (section, title, content, sort_order, is_active)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [section, title, content, sortOrder || 0, isActive !== false]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create content' });
  }
};

export const updateAboutContent = async (req: Request, res: Response) => {
  const { section, title, content, sortOrder, isActive } = req.body;
  try {
    const result = await pool.query(
      `UPDATE about_content
       SET section=$1, title=$2, content=$3, sort_order=$4, is_active=$5, updated_at=NOW()
       WHERE id=$6
       RETURNING *`,
      [section, title, content, sortOrder, isActive, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Content not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update content' });
  }
};

export const deleteAboutContent = async (req: Request, res: Response) => {
  try {
    await pool.query('DELETE FROM about_content WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete content' });
  }
};
