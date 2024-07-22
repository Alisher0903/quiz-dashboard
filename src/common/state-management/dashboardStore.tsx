import { create } from 'zustand';
import { Dashboard, DashboardListStatistic, DashboardListStatisticCards } from '../../types/dashboard.ts';

const dashboardStore = create<Dashboard>((set) => ({
  statisticTable: null,
  setStatisticTable: (val: DashboardListStatistic[] | null) => set({statisticTable: val}),
  statisticsCard: null,
  setStatisticsCard: (val: DashboardListStatisticCards | null) => set({statisticsCard: val}),
}));

export default dashboardStore;