import {
  getOverviewRepo,
  getRevenueRepo,
  getUsersCountRepo,
  getTopProductsRepo,
} from './analytics.repository.js';

export const getAnalyticsOverviewService = async () => {
  return await getOverviewRepo();
};

export const getRevenueAnalyticsService = async () => {
  return await getRevenueRepo();
};

export const getUsersCountService = async () => {
  return await getUsersCountRepo();
};

export const getTopProductsService = async () => {
  return await getTopProductsRepo();
};