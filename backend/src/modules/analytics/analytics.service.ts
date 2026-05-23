import {
  getOverviewRepo,
  getRevenueRepo,
  getUsersCountRepo,
  getTopProductsRepo,
} from './analytics.repository.js';

const getAnalyticsOverviewService = async () => {
  return await getOverviewRepo();
};

const getRevenueAnalyticsService = async () => {
  return await getRevenueRepo();
};

const getUsersCountService = async () => {
  return await getUsersCountRepo();
};

const getTopProductsService = async () => {
  return await getTopProductsRepo();
};

export const AnalyticsService = {
  getAnalyticsOverviewService,
  getRevenueAnalyticsService,
  getUsersCountService,
  getTopProductsService
}