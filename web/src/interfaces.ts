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

export enum FetchStatus {
	Pending = 0,
	Success = 1,
	Failed = 2
}

export interface IDataContext {
	status: FetchStatus;
	transport: ITransport[];
	employee: IEmployee[];
}
