import { create } from 'zustand';
import { Dashboard, DashboardListStatistic } from '../../types/dashboard.ts';

const dashboardStore = create<Dashboard>((set) => ({
  statisticTable: null,
  setStatisticTable: (val: DashboardListStatistic[] | null) => set({statisticTable: val})
}));

export default dashboardStore;