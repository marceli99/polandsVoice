import React, {useEffect, useState} from "react";
import {PollsList} from "./PollsList/PollsList";
import './AdminPage.css';
import {BorderedButton} from "../../BorderedButton";
import {Link} from "react-router-dom";

export function AdminPage() {
    const [pollsData, setPollsData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/polls');
            const data = await response.json();

            setPollsData(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className='AdminPage'>
            <Link to='/create-poll'>
                <BorderedButton className='Black' text='Add new poll'/>
            </Link>
            <PollsList data={pollsData} fetchData={fetchData}/>
        </div>
    );
}
