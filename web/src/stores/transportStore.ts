import { create } from 'zustand';
import { type ITransportStore, SortDirection } from '../interfaces';

export const useTransportStore = create<ITransportStore>((set) => ({
	count: 0,
	items: [],
	setCount: (data) => set((_state) => ({ count: data })),
	update: (data) => set((_state) => ({ items: data })),
	sort: (key,direction) => set((state) => {
		if(direction == SortDirection.ascending) {
			const sorted = state.items.sort((a,b) => {
				if(a[key] > b[key]) return 1;
				else if(a[key] < b[key]) return -1;
				else return 0;
			});
			return { items: sorted };
		} else {
			const sorted = state.items.sort((a,b) => {
				if(a[key] < b[key]) return 1;
				else if(a[key] > b[key]) return -1;
				else return 0;
			});
			return { items: sorted };
		}
	})
}));
