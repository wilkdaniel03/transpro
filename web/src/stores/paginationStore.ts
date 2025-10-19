import { create } from 'zustand';
import type { IPaginationStore } from '../interfaces';

export const usePaginationStore = create<IPaginationStore>((set) => ({
	pageSize: 50,
	setPageSize: (data) => set({ pageSize: data })
}));
