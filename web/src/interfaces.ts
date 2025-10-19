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
	pesel: string;
	date_of_birth: string;
}

export interface IVehicle {
	id: number;
	mark: string;
	model: string;
	destiny: string;
}

export enum FetchStatus {
	Pending = 0,
	Success = 1,
	Failed = 2
}

export interface IEmployeeStore {
	count: number;
	items: IEmployee[];
	setCount: (data: number) => void;
	update: (data: IEmployee[]) => void;
}

export interface IVehicleStore {
	count: number;
	items: IVehicle[];
	setCount: (data: number) => void;
	update: (data: IVehicle[]) => void;
}

export interface ITransportStore {
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
