import React, {useEffect, useState} from 'react';
import './PollsPage.css';
import {ParliamentChart} from './ParliamentChart';
import {SeatsBarChart} from "./SeatsBarChart";
import {PollsTable} from "./PollsTable/PollsTable";
import MandatesCalculator from "../../services/mandates_calculator";
import {PartiesColors} from "../../PartiesData";

export function PollsPage() {
    const [pollsData, setPollsData] = useState([]);
    const [mandatesData, setMandatesData] = useState(new Map());
    const [majorityData, setMajorityData] = useState({majority: 'ㅤ', vetoMajority: 'ㅤ', constitutionMajority: 'ㅤ'});

    useEffect(() => {
        const getSeats = (mandates: Map<String, any>, party: string) => {
            if (mandates.has(party)) return mandates.get(party).seats;

            return 0;
        }

        const setMajoritySubtitles = (data: any, winner: any, winnerSeats: any, oppositionSeats: any) => {
            data.majority = `${winnerSeats} majority for ${winner}`
            if (oppositionSeats >= 276) {
                data.vetoMajority = `${winner} has enough votes to outvote president.`;
            } else {
                data.vetoMajority = `${276 - winnerSeats} more seats needed to outvote president.`;
            }

            if (oppositionSeats >= 307) {
                data.constitutionMajority = `${winner} has enough votes to change constitution.`;
            } else {
                data.constitutionMajority = `${307 - winnerSeats} more seats needed to change constitution.`;
            }
        }

        const calculateMajority = (mandates: Map<string, any>) => {
            let oppositionSeats =
                getSeats(mandates, 'KO') +
                getSeats(mandates, 'LEW') +
                getSeats(mandates, 'P2050') +
                getSeats(mandates, 'PSL');

            let pisSeats = getSeats(mandates, 'PIS');

            let data = {majority: '', vetoMajority: '', constitutionMajority: ''};

            if (oppositionSeats < 231 && pisSeats < 231) {
                data.majority = 'Hung parliament. No party has majority.';
                setMajorityData(data);
                return;
            }

            let winner;
            let winnerSeats;

            if (oppositionSeats > 230) {
                winner = 'Opposition';
                winnerSeats = oppositionSeats;
            } else if (pisSeats > 230) {
                winner = 'PIS';
                winnerSeats = pisSeats;
            }

            setMajoritySubtitles(data, winner, winnerSeats, oppositionSeats);
            setMajorityData(data);
        }

        const mapPolls = (data: Array<any>) => {
            data.map((poll: any) => {
                let values = poll.popularity.split(',');
                let highest_party = '';
                let highest_value = 0;

                for (const value of values) {
                    let [partyName, popularity] = value.split(':');
                    popularity = parseFloat(popularity)
                    poll[partyName] = popularity;

                    if (popularity > highest_value) {
                        highest_value = popularity
                        highest_party = partyName;
                    }
                }

                poll['highest'] = highest_party;

                delete poll['popularity'];
                return poll;
            });
        }

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/last_month_polls');
                const data = await response.json();

                const allResponse = await fetch('http://localhost:3001/polls');
                const allPollsData = await allResponse.json();

                let mandates = new MandatesCalculator(data).calculateMandates();

                mandates.forEach((data, party) => {
                    data['color'] = PartiesColors[party.toUpperCase()];
                });

                mapPolls(data);
                mapPolls(allPollsData);

                calculateMajority(mandates);
                setPollsData(allPollsData);
                setMandatesData(mandates);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='PollsPage'>
            <h1 className='PageHeader'>Election Polls</h1>
            <h2 className='SecondaryHeader'>Projected seats<br/>based on last month polls</h2>
            <ParliamentChart mandates={mandatesData}/>
            <SeatsBarChart mandates={mandatesData}/>
            <h3 className='TertiaryHeader'>{majorityData.majority}</h3>
            <span className='SpanText'>
                {majorityData.vetoMajority}<br/>
                {majorityData.constitutionMajority}
            </span>
            <PollsTable data={pollsData}/>
        </div>
    );
}