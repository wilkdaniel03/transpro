import { createContext, useState, useEffect, type ReactNode } from 'react';
import { type IDataContext, FetchStatus } from './interfaces';

const DEFAULT_DATACTX_VALUE: IDataContext = { status: FetchStatus.Pending, transport: [], employee: [] };

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
			fetchData("/transport").then((res) => {
				return res['data'];
			}),
			fetchData("/employee").then((res) => {
				return res['data'];
			})
		]).then(([a,b]) => {
			setData({status:FetchStatus.Success,transport:a,employee:b})
		}).catch(_ => {
			setData({status:FetchStatus.Failed,transport:[],employee:[]})
		});
	},[]);

	return <dataCtx.Provider value={data}>{props.children}</dataCtx.Provider>;
}

export default DataContext;
