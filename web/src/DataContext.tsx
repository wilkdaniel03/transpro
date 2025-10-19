import { createContext, useState, useEffect, type ReactNode } from 'react';
import { type IDataContext, FetchStatus } from './interfaces';

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

	useEffect(() => {
		Promise.all([
			fetchData("/reservation").then((res) => {
				return res['data'];
			}),
			fetchData("/employee").then((res) => {
				return res['data'];
			}),
			fetchData("/vehicle").then((res) => {
				return res['data'];
			})
		]).then(([a,b,c]) => {
			setData({status:FetchStatus.Success,transport:a,employee:b,vehicle:c})
		}).catch(_ => {
			setData({status:FetchStatus.Failed,transport:[],employee:[],vehicle:[]})
		});
	},[]);

	return <dataCtx.Provider value={data}>{props.children}</dataCtx.Provider>;
}

export default DataContext;
