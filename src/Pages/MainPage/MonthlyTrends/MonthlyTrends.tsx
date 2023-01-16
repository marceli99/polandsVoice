import React, {useEffect, useState} from "react";
import './MonthlyTrends.css';
import {PartyTrend, TrendData} from "./PartyTrend";
import pisLogo from '../../../assets/images/logo_pis.png';
import koLogo from '../../../assets/images/logo_ko.png';
import kpLogo from '../../../assets/images/logo_kp.png';
import lewLogo from '../../../assets/images/logo_lew.png';
import holLogo from '../../../assets/images/logo_2050.png';
import konfLogo from '../../../assets/images/logo_konf.png';
import {BorderedButton} from "../../../BorderedButton";
import {Link} from "react-router-dom";
import MandatesCalculator from "../../../services/mandates_calculator";

export function MonthlyTrends() {
    const [data, setData] = useState(new Map([
        ["LEW", {seats: 0, popularity: 0}],
        ["PIS", {seats: 0, popularity: 0}],
        ["KO", {seats: 0, popularity: 0}],
        ["PSL", {seats: 0, popularity: 0}],
        ["P2050", {seats: 0, popularity: 0}],
        ["KONF", {seats: 0, popularity: 0}],
    ]));

    const fetchData = async () => {
        const response = await fetch('http://localhost:3001/last_three_months_polls');
        const responseData = await response.json();


        let calculator = new MandatesCalculator(responseData);
        let mandates = calculator.calculateMandates();
        let averageSupport = calculator.getPartiesAverageSupport();
        let mandatesArray: any = Array.from(mandates, ([name, value]) => ([name, value]));
        const newData: any = new Map(mandatesArray);

        Object.keys(averageSupport).forEach((party) => {
            if (!newData.has(party)) {
                newData.set(party, {seats: 0, popularity: averageSupport[party]})
            }
        });

        setData(newData);

        let trends: any = {};
        newData.forEach((value: any, key: string) => [
            trends[key] = {percentage: value.popularity, percentage_change: 0, seats_change: value.seats}
        ])

        setTrendsData(trends);
    }
    useEffect(() => {
        fetchData();
    }, [])

    const defaultTrends = {
        'PIS': {percentage: 34.0, percentage_change: -0.3, seats_change: -32},
        'KONF': {percentage: 4.7, percentage_change: -1.3, seats_change: -11},
        'PSL': {percentage: 6.3, percentage_change: +0.5, seats_change: -11},
        'KO': {percentage: 27.1, percentage_change: +0.8, seats_change: 11},
        'P2050': {percentage: 11.8, percentage_change: -0.5, seats_change: 50},
        'LEW': {percentage: 10.3, percentage_change: -2.2, seats_change: -7},
    };

    const [trendsData, setTrendsData] = useState<{ [party: string]: TrendData }>(defaultTrends);

    return (
        <div className="MonthlyTrends">
            <h2>Last updated NOV.10, 2022, At 2:10 PM</h2>
            <h1 className='PageHeader'>Latest Polls</h1>
            <div className='LinedHeader'>
                <hr/>
                <h3 className='SecondaryHeader'>3 Month trends</h3>
                <hr/>
            </div>

            <div className='PartiesTrends'>
                <PartyTrend partyLogo={pisLogo} trendData={trendsData['PIS']}/>
                <PartyTrend partyLogo={konfLogo} trendData={trendsData['KONF']}/>
                <PartyTrend partyLogo={kpLogo} trendData={trendsData['PSL']}/>
                <PartyTrend partyLogo={koLogo} trendData={trendsData['KO']}/>
                <PartyTrend partyLogo={holLogo} trendData={trendsData['P2050']}/>
                <PartyTrend partyLogo={lewLogo} trendData={trendsData['LEW']}/>
            </div>
            <Link to='/polls'>
                <BorderedButton className='Small Black' text='View all polls...'/>
            </Link>
            <hr/>
        </div>
    );
}