import React from "react";
import './MainPage.css';
import {Banner} from "./Banner/Banner";
import {MonthlyTrends} from "./MonthlyTrends/MonthlyTrends";
import {OtherCharts} from "./OtherCharts/OtherCharts";

export function MainPage() {
    return (
        <div className='MainPage'>
            <Banner/>
            <MonthlyTrends/>
            <OtherCharts/>
        </div>
    );
}