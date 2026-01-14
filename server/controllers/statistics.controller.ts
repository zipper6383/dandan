import { Request, Response } from 'express';
import { pool } from '../config/db';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // Get overall statistics
    const stats = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM projects) as total_projects,
        (SELECT COUNT(*) FROM projects WHERE status = 'fundraising') as active_projects,
        (SELECT COUNT(*) FROM news) as total_news,
        (SELECT COUNT(*) FROM funds) as total_funds,
        (SELECT COUNT(*) FROM donations) as total_donations,
        (SELECT COALESCE(SUM(amount), 0) FROM donations) as total_raised,
        (SELECT COUNT(*) FROM volunteers) as total_volunteers,
        (SELECT COUNT(*) FROM volunteers WHERE status = 'approved') as approved_volunteers
    `);

    res.json(stats.rows[0]);
  } catch (error) {
    console.error('Dashboard Stats Error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
  }
};

export const getDonationTrends = async (req: Request, res: Response) => {
  try {
    const { period = '30' } = req.query;

    // Get donation trends for the last N days
    const trends = await pool.query(
      `
      SELECT
        DATE(created_at) as date,
        COUNT(*) as count,
        COALESCE(SUM(amount), 0) as amount
      FROM donations
      WHERE created_at >= NOW() - INTERVAL '${parseInt(period as string)} days'
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `
    );

    res.json(trends.rows);
  } catch (error) {
    console.error('Donation Trends Error:', error);
    res.status(500).json({ error: 'Failed to fetch donation trends' });
  }
};

export const getProjectStats = async (req: Request, res: Response) => {
  try {
    // Get top projects by raised amount
    const topProjects = await pool.query(`
      SELECT
        id, title, raised_amount, target_amount, donor_count,
        CASE
          WHEN target_amount > 0 THEN (raised_amount::float / target_amount * 100)
          ELSE 0
        END as progress
      FROM projects
      WHERE status = 'fundraising'
      ORDER BY raised_amount DESC
      LIMIT 10
    `);

    // Get projects by status
    const statusStats = await pool.query(`
      SELECT
        status,
        COUNT(*) as count,
        COALESCE(SUM(raised_amount), 0) as total_raised
      FROM projects
      GROUP BY status
    `);

    res.json({
      topProjects: topProjects.rows,
      statusStats: statusStats.rows,
    });
  } catch (error) {
    console.error('Project Stats Error:', error);
    res.status(500).json({ error: 'Failed to fetch project statistics' });
  }
};

export const getVolunteerStats = async (req: Request, res: Response) => {
  try {
    // Get volunteers by status
    const statusStats = await pool.query(`
      SELECT
        status,
        COUNT(*) as count
      FROM volunteers
      GROUP BY status
    `);

    // Get volunteers by area
    const areaStats = await pool.query(`
      SELECT
        area,
        COUNT(*) as count
      FROM volunteers
      GROUP BY area
      ORDER BY count DESC
      LIMIT 10
    `);

    res.json({
      statusStats: statusStats.rows,
      areaStats: areaStats.rows,
    });
  } catch (error) {
    console.error('Volunteer Stats Error:', error);
    res.status(500).json({ error: 'Failed to fetch volunteer statistics' });
  }
};

export const getMonthlyReport = async (req: Request, res: Response) => {
  try {
    const { year = new Date().getFullYear() } = req.query;

    // Get monthly donations
    const monthlyDonations = await pool.query(
      `
      SELECT
        EXTRACT(MONTH FROM created_at) as month,
        COUNT(*) as count,
        COALESCE(SUM(amount), 0) as amount
      FROM donations
      WHERE EXTRACT(YEAR FROM created_at) = $1
      GROUP BY EXTRACT(MONTH FROM created_at)
      ORDER BY month ASC
    `,
      [year]
    );

    // Get monthly volunteers
    const monthlyVolunteers = await pool.query(
      `
      SELECT
        EXTRACT(MONTH FROM created_at) as month,
        COUNT(*) as count
      FROM volunteers
      WHERE EXTRACT(YEAR FROM created_at) = $1
      GROUP BY EXTRACT(MONTH FROM created_at)
      ORDER BY month ASC
    `,
      [year]
    );

    res.json({
      donations: monthlyDonations.rows,
      volunteers: monthlyVolunteers.rows,
    });
  } catch (error) {
    console.error('Monthly Report Error:', error);
    res.status(500).json({ error: 'Failed to fetch monthly report' });
  }
};
