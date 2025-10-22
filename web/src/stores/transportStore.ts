import { create } from 'zustand';
import type { ITransportStore } from '../interfaces';

export const useTransportStore = create<ITransportStore>((set) => ({
	count: 0,
	items: [],
	setCount: (data) => set((_state) => ({ count: data })),
	update: (data) => set((_state) => ({ items: data }))
}));
