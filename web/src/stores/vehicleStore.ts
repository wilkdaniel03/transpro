import { create } from 'zustand';
import type { IVehicleStore } from '../interfaces';

export const useVehicleStore = create<IVehicleStore>((set) => ({
	count: 0,
	items: [],
	setCount: (data) => set((_state) => ({ count: data })),
	update: (data) => set((_state) => ({ items: data }))
}));
