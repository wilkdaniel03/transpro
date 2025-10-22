export interface ITransport {
	id: number;
	name: string;
	type: string;
	reservation: string;
}

export interface IEmployee {
	id: number;
	name: string;
	surname: string;
	nationality: string;
	pesel: string;
	date_of_birth: string;
}

export interface IVehicle {
	id: number;
	mark: string;
	model: string;
	destiny: string;
}

export interface IVehicleWithCount {
	mark: string;
	model: string;
	destiny: string;
	count: number;
}

export enum FetchStatus {
	Pending = 0,
	Success = 1,
	Failed = 2
}

export enum SortDirection {
	ascending = 0,
	descending = 1
}

interface ISorteable<T> {
	sort: (key: T, direction: SortDirection) => void;
}

export interface IEmployeeStore extends ISorteable<keyof IEmployee> {
	count: number;
	items: IEmployee[];
	setCount: (data: number) => void;
	update: (data: IEmployee[]) => void;
}

export interface IVehicleStore extends ISorteable<keyof IVehicleWithCount> {
	count: number;
	//items: IVehicle[];
	items: IVehicleWithCount[];
	setCount: (data: number) => void;
	//update: (data: IVehicle[]) => void;
	update: (data: IVehicleWithCount[]) => void;
}

export interface ITransportStore extends ISorteable<keyof ITransport> {
	count: number;
	items: ITransport[];
	setCount: (data: number) => void;
	update: (data: ITransport[]) => void;
}

export interface IPaginationStore {
	pageSize: number;
	setPageSize: (data: number) => void;
}

export interface IDataContext {
	status: FetchStatus;
	transport: ITransport[];
	employee: IEmployee[];
	vehicle: IVehicle[];
}
