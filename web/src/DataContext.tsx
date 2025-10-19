import { createContext, useState, useEffect, type ReactNode } from 'react';
import { type IDataContext, FetchStatus } from './interfaces';
import { useEmployeeStore, useVehicleStore, useTransportStore } from './stores';

const DEFAULT_DATACTX_VALUE: IDataContext = {
	status: FetchStatus.Pending,
	transport: [],
	employee: [],
	vehicle: []
};

export const dataCtx = createContext<IDataContext>(DEFAULT_DATACTX_VALUE);

const fetchData = async (path: string) => {
	const headers = new Headers();
	headers.append("Accept","application/json");
	headers.append("Access-Control-Allow-Origin","*");
	const res = await fetch(`http://127.0.0.1:8081${path}`,{method:"GET",headers:headers});
	const data  = await res.json();
	return data;
}

const DataContext = (props: { children: ReactNode }) => {
	const [data,setData] = useState<IDataContext>(DEFAULT_DATACTX_VALUE);
	const employeesStore = useEmployeeStore();
	const vehicleStore = useVehicleStore();
	const transportStore = useTransportStore();

	useEffect(() => {
		Promise.all([
			fetchData("/employee/range/0-10").then((res) => {
				return res['data'];
			}),
			fetchData("/vehicle/range/0-10").then((res) => {
				return res['data'];
			}),
			fetchData("/reservation/range/0-10").then((res) => {
				return res['data'];
			})
		]).then(([emp,veh,tran]) => {
			employeesStore.update(emp);
			vehicleStore.update(veh);
			transportStore.update(tran);
			setData({status:FetchStatus.Success,transport:[],employee:[],vehicle:[]})
		}).catch(_ => {
			setData({status:FetchStatus.Failed,transport:[],employee:[],vehicle:[]})
		});

		Promise.all([
			fetchData("/employee/count").then((res) => {
				return res['data'];
			}),
			fetchData("/vehicle/count").then((res) => {
				return res['data'];
			}),
			fetchData("/reservation/count").then((res) => {
				return res['data'];
			})
		]).then(([emp,veh,tran]) => {
			employeesStore.setCount(emp);
			vehicleStore.setCount(veh);
			transportStore.setCount(tran);
		});
	},[]);

	return <dataCtx.Provider value={data}>{props.children}</dataCtx.Provider>;
}

export default DataContext;
