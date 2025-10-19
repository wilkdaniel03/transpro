import { create } from 'zustand';
import type { IEmployeeStore } from '../interfaces';

export const useEmployeeStore = create<IEmployeeStore>((set) => ({
	count: 0,
	items: [],
	setCount: (data) => set((_state) => ({ count: data })),
	update: (data) => set((_state) => ({ items: data }))
}));
