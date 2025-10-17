import { createContext, useState, useEffect, type ReactNode } from 'react';
import { type IDataContext, FetchStatus } from './interfaces';

const DEFAULT_DATACTX_VALUE: IDataContext = { status: FetchStatus.Pending, transport: [] };

export const dataCtx = createContext<IDataContext>(DEFAULT_DATACTX_VALUE);

const fetchTransports = async () => {
	const headers = new Headers();
	headers.append("Accept","application/json");
	headers.append("Access-Control-Allow-Origin","*");
	const res = await fetch("http://127.0.0.1:8081/transport",{method:"GET",headers:headers});
	const data  = await res.json();
	return data;
}

const DataContext = (props: { children: ReactNode }) => {
	const [data,setData] = useState<IDataContext>(DEFAULT_DATACTX_VALUE);

	useEffect(() => {
		fetchTransports().then((res) => {
			const newData: IDataContext = {
				status: FetchStatus.Success,
				transport: res['data']
			};
			setData(newData);
		}).catch(_ => {
			const newData: IDataContext = {
				status: FetchStatus.Failed,
				transport: []
			};
			setData(newData);
		});
	},[]);

	return <dataCtx.Provider value={data}>{props.children}</dataCtx.Provider>;
}

export default DataContext;
