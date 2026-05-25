import {
  AnalyticsRepository
} from './analytics.repository.js';

const getAnalyticsOverviewService = async () => {
  return await AnalyticsRepository.getOverviewRepo();
};

const getRevenueAnalyticsService = async () => {
  return await AnalyticsRepository.getRevenueRepo();
};

const getUsersCountService = async () => {
  return await AnalyticsRepository.getUsersCountRepo();
};

const getTopProductsService = async () => {
  return await AnalyticsRepository.getTopProductsRepo();
};

export const AnalyticsService = {
  getAnalyticsOverviewService,
  getRevenueAnalyticsService,
  getUsersCountService,
  getTopProductsService
}