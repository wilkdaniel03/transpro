import { create } from 'zustand';
import type { IVehicleStore } from '../interfaces';

export const useVehicleStore = create<IVehicleStore>((set) => ({
	count: 0,
	pageSize: 10,
	items: [],
	setCount: (data) => set((_state) => ({ count: data })),
	setPageSize: (data) => set((_state) => ({ pageSize: data })),
	update: (data) => set((_state) => ({ items: data }))
}));
