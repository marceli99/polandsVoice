import React from "react";
import './PartyTrend.css';
import trendingUp from '../../../assets/icons/trending-up.svg';
import trendingDown from '../../../assets/icons/trending-down.svg';


export type TrendData = {
    percentage: number,
    seats_change: number,
    percentage_change: number
}

export function PartyTrend({partyLogo, trendData}: { partyLogo: any, trendData: TrendData }) {
    return (
        <div className="PartyTrend">
            <img className='Logo' src={partyLogo} alt='Logo'/>
            <div className='Results'>
                <h3>{trendData.percentage.toFixed(1)}%</h3>
                <hr/>
                <h5>{trendData.seats_change} seats</h5>
            </div>
            <div className='TrendIndicator'>
                <img src={trendData.percentage_change >= 0 ? trendingUp : trendingDown} alt='Trend'/>
                <span>{trendData.percentage_change}%</span>
            </div>
        </div>
    );
}