import { create } from 'zustand';
import type { IEmployeeStore } from '../interfaces';

export const useEmployeeStore = create<IEmployeeStore>((set) => ({
	count: 0,
	pageSize: 10,
	items: [],
	setCount: (data) => set((_state) => ({ count: data })),
	setPageSize: (data) => set((_state) => ({ pageSize: data })),
	update: (data) => set((_state) => ({ items: data }))
}));
