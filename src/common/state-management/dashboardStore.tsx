import { create } from 'zustand';
import { Dashboard } from '../../types/dashboard.ts';

const dashboardStore = create<Dashboard>((set) => ({}));

export default dashboardStore;