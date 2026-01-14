import { Request, Response } from 'express';
import { pool } from '../config/db';

export const searchAll = async (req: Request, res: Response) => {
  try {
    const { q, type, category, limit = 20, page = 1 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const searchTerm = `%${q}%`;
    const results: any = {
      projects: [],
      news: [],
      funds: [],
      total: 0,
    };

    // Search Projects
    if (!type || type === 'projects') {
      const projectQuery = `
        SELECT
          p.id, p.title, p.image_url as "image", p.raised_amount as "raised",
          p.target_amount as "target", p.description, c.name as "category",
          'project' as type
        FROM projects p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.title ILIKE $1 OR p.description ILIKE $1
        ORDER BY p.created_at DESC
        LIMIT $2 OFFSET $3
      `;
      const projectResult = await pool.query(projectQuery, [searchTerm, limit, offset]);
      results.projects = projectResult.rows;
    }

    // Search News
    if (!type || type === 'news') {
      let newsQuery = `
        SELECT
          n.id, n.title, n.image_url as "image", n.summary,
          n.published_at as "date", c.name as "category",
          'news' as type
        FROM news n
        LEFT JOIN categories c ON n.category_id = c.id
        WHERE n.title ILIKE $1 OR n.summary ILIKE $1 OR n.content ILIKE $1
      `;

      const params: any[] = [searchTerm];

      if (category) {
        newsQuery += ` AND c.slug = $${params.length + 1}`;
        params.push(category);
      }

      newsQuery += ` ORDER BY n.published_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
      params.push(limit, offset);

      const newsResult = await pool.query(newsQuery, params);
      results.news = newsResult.rows;
    }

    // Search Funds
    if (!type || type === 'funds') {
      const fundQuery = `
        SELECT
          id, name as title, image_url as "image", manager as sponsor,
          total_amount as "raised", 'fund' as type
        FROM funds
        WHERE name ILIKE $1 OR manager ILIKE $1 OR description ILIKE $1
        ORDER BY created_at DESC
        LIMIT $2 OFFSET $3
      `;
      const fundResult = await pool.query(fundQuery, [searchTerm, limit, offset]);
      results.funds = fundResult.rows;
    }

    // Calculate total
    results.total = results.projects.length + results.news.length + results.funds.length;

    // Combine all results if no type specified
    if (!type) {
      results.all = [...results.projects, ...results.news, ...results.funds].slice(
        0,
        Number(limit)
      );
    }

    res.json(results);
  } catch (error) {
    console.error('Search Error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
};

export const searchSuggestions = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== 'string') {
      return res.json([]);
    }

    const searchTerm = `%${q}%`;

    // Get top 5 suggestions from each type
    const suggestions = await pool.query(
      `
      (SELECT title, 'project' as type FROM projects WHERE title ILIKE $1 LIMIT 5)
      UNION ALL
      (SELECT title, 'news' as type FROM news WHERE title ILIKE $1 LIMIT 5)
      UNION ALL
      (SELECT name as title, 'fund' as type FROM funds WHERE name ILIKE $1 LIMIT 5)
      LIMIT 10
    `,
      [searchTerm]
    );

    res.json(suggestions.rows);
  } catch (error) {
    console.error('Suggestions Error:', error);
    res.status(500).json({ error: 'Failed to get suggestions' });
  }
};
