import React, {ReactElement} from "react";
import './OtherCharts.css';
import {ChartPreview} from "./ChartPreview";
import {ChartSampleData} from "../../../Utils/ChartSampleData";
import Chart from 'react-apexcharts'
import {BorderedButton} from "../../../BorderedButton";

export function OtherCharts() {
    const chartSampleData = new ChartSampleData();

    let charts = [
        <Chart options={chartSampleData.pieData.options} series={chartSampleData.pieData.series} type='pie' height='120' />,
        <Chart options={chartSampleData.areaData.options} series={chartSampleData.areaData.series} type='area' width='150' height='93' />,
        <Chart options={chartSampleData.barData.options} series={chartSampleData.barData.series} type='bar' width='150' height='93' />
    ]

    const getRandomChart = () : ReactElement => {
        let chart = charts[Math.floor(Math.random() * charts.length)];
        charts.splice(charts.indexOf(chart), 1);
        return chart;
    }

    return (
        <div className="OtherCharts">
            <h3 className='Header'>Other charts</h3>
            <div className="ChartsPreview">
                <ChartPreview title={'Who are the most and least trusted politicians?'} chart={getRandomChart()}/>
                <ChartPreview title={'Do Poles support building a wall on the border with Kaliningrad region?'} chart={getRandomChart()}/>
                <ChartPreview title={'Should the opposition unite or head to the elections alone?'} chart={getRandomChart()}/>
            </div>
            <BorderedButton className='Small Black' text='See other polls'/>
        </div>
    );
}