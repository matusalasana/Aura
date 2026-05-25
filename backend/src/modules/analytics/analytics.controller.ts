import { Request, Response } from 'express';
import { AnalyticsService } from './analytics.service.js';


// OVERVIEW
const getAnalyticsOverview = async (req: Request, res: Response) => {
  try {
    const data = await AnalyticsService.getAnalyticsOverviewService();
    return res.status(200).json(data);
  } catch (err: any) {
    console.log('Analytics overview error:', err.message);
    return res.status(500).json({ message: err.message });
  }
};


// REVENUE
const getRevenueAnalytics = async (req: Request, res: Response) => {
  try {
    const data = await AnalyticsService.getRevenueAnalyticsService();
    return res.status(200).json(data);
  } catch (err: any) {
    console.log('Revenue analytics error:', err.message);
    return res.status(500).json({ message: err.message });
  }
};


// USERS
const getUserAnalytics = async (req: Request, res: Response) => {
  try {
    const data = await AnalyticsService.getUsersCountService();
    return res.status(200).json(data);
  } catch (err: any) {
    console.log('User analytics error:', err.message);
    return res.status(500).json({ message: err.message });
  }
};


// TOP PRODUCTS
const getTopProductsAnalytics = async (req: Request, res: Response) => {
  try {
    const data = await AnalyticsService.getTopProductsService();
    return res.status(200).json(data);
  } catch (err: any) {
    console.log('Top products analytics error:', err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const AnalyticsController = {
  getAnalyticsOverview,
  getRevenueAnalytics,
  getUserAnalytics,
  getTopProductsAnalytics
}