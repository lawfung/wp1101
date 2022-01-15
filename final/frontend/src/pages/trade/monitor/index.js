import { Button, Grid, Slider, FormControl, TextField, Switch, FormControlLabel } from "@mui/material";
// import { ButtonGroup, InputLabel, MenuItem, Select, Box, Chip } from "@mui/material";
import React, { useState } from "react";
import { ShowChart } from '@mui/icons-material';
// import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import Lines from '../lines';
import {HalfWrapper, MyGrid, MyStack, MyTitle} from '../styles';
import { Candlestick_QUERY } from '../../../graphql';
import { useApolloClient } from "@apollo/client";
import { TimestampToDate, nameConvert, marksTimes } from "../../../tools/constant";
import { useCookies } from 'react-cookie';
import display from "../../../tools/display";

// const indexList = ["MA", "EMA"];
const Monitor = ({title, XStart_time, XEnd_time, XTime_scale, XAsset, data}) => {
    const handleChange = (f) => ((e) => {f(e.target.value);})
    // const onCreateBacktest = () => {
    //     const epochS = Date.parse(startTime) / 1000
    //     const epochE = Date.parse(endTime) / 1000
    //     createBacktest({tabName: title+"-Backtest", startTime: XStart_time, endTime: XEnd_time, assetType: XAsset, timeScaleString: XTime_scale, epochS, epochE})
    // }
    const [cookie] = useCookies(['session']);
    const [para, setPara] = useState({title, XStart_time, XEnd_time, XTime_scale, XAsset});
    const [chartData, setChartData] = useState(data);
    const TitleSwitch = 
        <MyStack spacing={-0} direction="row" sx={{marginTop: "2vh"}}>
            <MyTitle variant="h5" component="div">
                <ShowChart /> {para.title}
            </MyTitle>
            {/* <ButtonGroup variant="contained">
                <Button sx={{ fontSize: '', "fontFamily": "", textTransform: "none"}}>Go LEFT</Button>
                <Button sx={{ fontSize: '', "fontFamily": "", textTransform: "none"}}>Go FULL size</Button>
                <Button sx={{ fontSize: '', "fontFamily": "", textTransform: "none"}}>Go RIGHT</Button>
            </ButtonGroup> */}
        </MyStack>
    const attrPanel = 
        <Grid container spacing={1} sx={{marginTop: "2vh"}}>
            <MyGrid item xs={6}>Start time: {para.XStart_time}</MyGrid>
            <MyGrid item xs={6}>End time: {para.XEnd_time}</MyGrid>
            <MyGrid item xs={6}>Time scale: {para.XTime_scale}</MyGrid>
            <MyGrid item xs={6}>Asset: {para.XAsset}</MyGrid>
        </Grid>
    // const backAndNext =
    //     <MyStack spacing={-30} direction="row">
    //         <Button variant="contained" startIcon={<ArrowLeft />} sx={{ fontSize: '2vh', "fontFamily": "", textTransform: "none"}}>Back</Button>
    //         <Button variant="contained" endIcon={<ArrowRight />} sx={{ fontSize: '2vh', "fontFamily": "", textTransform: "none"}}>Next</Button>
    //     </MyStack>
    // const [chartType, setChartType] = useState('Histogram');
    // const [indexType, setIndexType] = useState([]);
    // const handleIndexChange = (event) => {
    //     const value = event.target.value;
    //     setIndexType(typeof value === 'string' ? value.split(',') : value);
    // };
    // const chartAndIndex = 
    //     <MyStack spacing={-20} direction="row">
    //         <FormControl variant="filled">
    //             <InputLabel>chart type</InputLabel>
    //             <Select
    //                 value={chartType}
    //                 onChange={handleChange(setChartType)}
    //             >
    //                 <MenuItem value={"Histogram"}>Histogram</MenuItem>
    //                 <MenuItem value={"lineChart"}>Line chart</MenuItem>
    //             </Select>
    //         </FormControl>
    //         <FormControl variant="filled" sx={{ minWidth: "25%", minHeight: "12vh" }}>
    //             <InputLabel>index type</InputLabel>
    //             <Select
    //                 value={indexType}
    //                 onChange={handleIndexChange}
    //                 multiple
    //                 renderValue={(selected) => (
    //                     <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
    //                         {selected.map((value) => (<Chip key={value} label={value} />))}
    //                     </Box>
    //                 )}
    //             >
    //                 {indexList.map(
    //                     (x) => (<MenuItem value={x} key={x}>{x}</MenuItem>)
    //                 )}
    //             </Select>
    //         </FormControl>
    //     </MyStack>
    // const twoButtons = 
    //     <MyStack spacing={-20} direction="row">
    //         <Button variant="contained" sx={{ fontSize: '3vh', "fontFamily": "", textTransform: "none"}}>View raw data</Button>
    //         <Button variant="contained" sx={{ fontSize: '3vh', "fontFamily": "", textTransform: "none"}} onClick={onCreateBacktest}>Backtest This</Button>
    //     </MyStack>

    const [checked, setChecked] = useState(false);
    const viewRawData = 
        <FormControlLabel control={<Switch checked={checked} onChange={(e) => {
            setChecked(e.target.checked);}}/>} label="View raw data" />

    const marks = marksTimes.map((x, i) => ({value: i, label: x}));
    const [timeScale, setTimeScale] = useState(0);
    const timeScaleSlider =
        <>
            <Slider
                // aria-label="Custom marks"
                value={timeScale}
                onChange={handleChange(setTimeScale)}
                // getAriaValueText={valuetext}
                step={null}
                marks={marks}
                max={marksTimes.length - 1}
                sx={{width: "90%", marginTop: "0vh"}}
                track={false}
            />
        </>
    const [startTime, setStartTime] = useState('2021-01-01T00:00');
    const [endTime, setEndTime] = useState('2022-01-01T00:00');
    const [assetType, setAssetType] = useState('BTC');
    const client = useApolloClient();
    const resetMonitor = async () => {
        // console.log(timeScale, startTime, endTime, assetType);
        const epochS = Date.parse(startTime) / 1000
        const epochE = Date.parse(endTime) / 1000
        const req = await client.query({
            query: Candlestick_QUERY,
            variables: {asset : nameConvert(assetType), startTime: epochS, endTime: epochE, cookie: cookie.session, scale: marksTimes[timeScale]}
        });
        const tmp = req.data.Candlestick;
        if(!tmp || tmp.length === 0){
            display({type: "error", msg: "reset fail"});
            return;
        }
        const dataD = tmp.map((x) => [TimestampToDate(x.startTime), x.open, x.close, x.low, x.high]);
        // console.log(data);
        setPara({...para, XStart_time: TimestampToDate(epochS), XEnd_time: TimestampToDate(epochE), XTime_scale: marksTimes[timeScale], XAsset: assetType});
        setChartData(dataD);
    }
    const setSet = 
        <>
        <FormControl variant="standard" sx={{marginTop: "2vh",marginLeft: "2vh",marginRight: "2vh", border: 1}}>
            <div style={{margin: "2vh"}}>
                <Grid container spacing={2}>
                    <MyGrid item xs={12}>
                        <h3>Time Scale</h3>
                    </MyGrid>
                    <MyGrid item xs={12}>
                        {timeScaleSlider}
                    </MyGrid>
                    <MyGrid item xs={8}>
                        <TextField label="Start time" value={startTime} type="datetime-local" onChange={handleChange(setStartTime)} InputLabelProps={{ shrink: true }}/>
                    </MyGrid>
                    <MyGrid item xs={4}>
                        <TextField label="Asset type" value={assetType} onChange={handleChange(setAssetType)}/>
                    </MyGrid>
                    <MyGrid item xs={8}>
                        <TextField label="End time" value={endTime} type="datetime-local" onChange={handleChange(setEndTime)} InputLabelProps={{ shrink: true }}/>
                    </MyGrid>
                    <MyGrid item xs={4}>
                        <Button onClick={resetMonitor}> Reset Minotor </Button>
                    </MyGrid>
                </Grid>
            </div>
        </FormControl>
        </>

    return (
        <div style={{display: "flex", height: "100%", width: "100%", flexDirection: "row"}}>
            <HalfWrapper style={{background: 'aliceblue', }}>
                {TitleSwitch}
                {attrPanel}
                <Lines data={chartData}/>
                {/* <div style={{color : "red"}}>Here will be the graph</div> */}
                {/* {backAndNext} */}
            </HalfWrapper>
            <HalfWrapper style={{background: 'antiquewhite',}}>
                {/* {chartAndIndex} */}
                {/* {timeScaleSlider} */}
                {setSet}
                {/* {twoButtons} */}
                {viewRawData}
                {checked ? <div>[StartTime, open, close, low, high] {chartData.map((i)=><div key={i.join()}>["{i.join('", "')}"],</div> )}</div> : <></>}
            </HalfWrapper>
        </div>
    )
}

export default Monitor;