import Monitor from './monitor'
import Backtest from './backtest';
import React, { useState } from 'react';
import { Candlestick_QUERY } from '../../graphql';
import { useApolloClient  } from "@apollo/client";
// import { useMutation } from '@apollo/client';
import { resolution_dict, TimestampToDate, nameConvert } from '../../tools/constant';
import { v4 as uuidv4 } from "uuid";
import display from '../../tools/display';
import { useCookies } from 'react-cookie';

// const defaultMonitor = [["m1", <Monitor title="m1"/>,0],["m2", <Monitor title="m2"/>,1],["m3", <Monitor title="m3"/>,2]];
const defaultMonitor = [];
// const defaultBacktest = [["b1", <Backtest title="b1"/>, 0 ]];
const defaultBacktest = [];

const usePages = () => {
    // Title, dom
    const [cookie] = useCookies(['session']);
    const [MorB, setMorB] = useState(0);
    const [idid, setIdid] = useState(0);
    const addOne = (Type, setList, dummy, setDummy) => (props) => {
        const id = uuidv4();
        setList((til) => [...til, [props.title, <Type {...props}/>, id]]);
        setDummy([...dummy, id]);
    }
    const copyDeleteI = (ls, id) => (ls.slice(0, id).concat(ls.slice(id + 1)));
    const deleteOne = (MBT, dummy, setList, ls, setDummy) => (id) => {
        if(MorB === MBT && dummy[id] === idid)
            setIdid(dummy[id - 1]);
        setList(copyDeleteI(ls, id))
        setDummy(copyDeleteI(dummy, id));
    }
    const [dummyM, setDummyM] = useState(defaultMonitor.map((_,i) => i));
    const [dummyB, setDummyB] = useState(defaultBacktest.map((_,i) => i));
    const [monitorList, setMonitorList] = useState(defaultMonitor)
    const [backtestList, setBacktestList] = useState(defaultBacktest)
    const addMonitorList = addOne(Monitor, setMonitorList, dummyM, setDummyM);
    const addBacktestList = addOne(Backtest, setBacktestList, dummyB, setDummyB);
    const deleteMonitor = deleteOne(0, dummyM, setMonitorList, monitorList, setDummyM);
    const deleteBacktest = deleteOne(1, dummyB, setBacktestList, backtestList, setDummyB);
    const client = useApolloClient();
    const createBacktest = async ({tabName, assetType, timeScaleString, epochS, epochE}) => {
        const delta = resolution_dict[timeScaleString];
        const req = await client.query({
            query: Candlestick_QUERY,
            variables: {asset : nameConvert(assetType), startTime: epochS, endTime: Math.min(epochS + delta, epochE), cookie: cookie.session, scale: timeScaleString}
        });
        const tmp = req.data.Candlestick;
        if(!tmp || tmp.length === 0){
            display({type: "error", msg: "create fail"});
            return;
        }
        const data = tmp.map((x) => [TimestampToDate(x.startTime), x.open, x.close, x.low, x.high]);
        addBacktestList({title:tabName, XStart_time: TimestampToDate(epochS), XEnd_time: TimestampToDate(epochE), XAsset:assetType, XTime_scale:timeScaleString, data, next: epochS + delta, epochS, epochE})
    }
    const createMonitor = async ({tabName, assetType, timeScaleString, epochS, epochE}) => {
        const req = await client.query({
            query: Candlestick_QUERY,
            variables: {asset : nameConvert(assetType), startTime: epochS, endTime: epochE, cookie: cookie.session, scale: timeScaleString}
        });
        const tmp = req.data.Candlestick;
        if(!tmp || tmp.length === 0){
            display({type: "error", msg: "create fail"});
            return;
        }
        const data = tmp.map((x) => [TimestampToDate(x.startTime), x.open, x.close, x.low, x.high]);
        addMonitorList({title:tabName, XStart_time: TimestampToDate(epochS), XEnd_time: TimestampToDate(epochE), XAsset:assetType, XTime_scale:timeScaleString, data, createBacktest});
    }
    return {MorB, setMorB, idid, setIdid, dummyM, dummyB, monitorList, backtestList, createBacktest, createMonitor, deleteMonitor, deleteBacktest};
}
export default usePages;