import { create } from 'zustand';
import { Settings } from '../../types/settings.ts';

const settingsStore = create<Settings>((set) => ({}));

export default settingsStore;