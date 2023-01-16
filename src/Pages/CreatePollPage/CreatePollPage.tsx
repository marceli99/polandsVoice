import './CreatePollPage.css';
import {useEffect, useRef, useState} from "react";
import {BorderedButton} from "../../BorderedButton";
import Select from 'react-select';
import DeleteIcon from '../../assets/icons/trash-2.svg';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import React from 'react';

export function CreatePollPage() {
    const {id} = useParams();
    const [data, setData] = useState<any>({});
    const [pollParties, setPollParties] = useState<any>([]);
    const [parties, setParties] = useState<any>();
    const [loadedData, setLoadedData] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const requestData = {
            data: data,
            pollParties: pollParties
        }

        if (id === undefined) {
            axios.post('http://localhost:3001/create_poll', requestData)
                .then(response => {
                    navigate('/admin');
                }).catch(err => console.log(err));
        } else {
            axios.patch(`http://localhost:3001/poll/${id}`, requestData)
                .then(response => {
                    navigate('/admin');
                }).catch(err => console.log(err));
        }
    }

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/parties');
            const data = await response.json();

            setParties(data);
            loadSelectOptions(data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPollData = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:3001/poll/${id}`);
            const data = await response.json();

            setData({
                name: data.poll.company_name,
                sample: data.poll.sample,
                methodology: data.poll.method,
                start_date: data.poll.start_date,
                end_date: data.poll.end_date,
            });

            let newData = data.parties.map((party: any) => {
                let row = {id: pollId.current, party: party.name, support: party.popularity, partyId: party.party_id}
                pollId.current += 1
                return row;
            })

            setPollParties(newData);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event: any) => {
        const newData = {...data};
        let name: string = event.target.name;
        newData[name] = event.target.value;
        setData(newData);
    }

    useEffect(() => {
        fetchData().then(() => {
            if (id !== undefined) {
                fetchPollData(id).then(() => {
                    setLoadedData(true)
                })
            } else {
                setLoadedData(true);
            }
        });
    }, [])

    const [selectOptions, setSelectOptions] = useState([]);

    const loadSelectOptions = (data: any) => {
        let ids = pollParties.map((p: any) => p.partyId)

        setSelectOptions(data.map((party: any) => {
            return {value: party.short_name, label: party.name, id: party.id, isDisabled: ids.includes(party.id)}
        }))
    }

    const findOption = (party_name: string) => {
        return selectOptions.filter((option: any) => option.label === party_name)
    }

    let pollId = useRef(9999);

    const addPoll = (data?: any) => {
        if (pollParties.length === 9) {
            return;
        }

        const newPollParty = data === undefined
            ? {id: pollId.current, party: '', support: 0}
            : {id: pollId.current, party: data.party, support: data.popularity};
        pollId.current += 1;

        const newData = [...pollParties, newPollParty];
        setPollParties(newData);
    }

    const removePollParty = (index: number) => {
        let newData: Array<any> = [];
        pollParties.forEach((item: any, i: number) => {
            if (item.id !== index) {
                newData.push(item);
            }
        })

        loadSelectOptions(parties);
        setPollParties(newData);
    }

    const renderForm = () => {
        if (!loadedData) {
            return '';
        }

        return <form onSubmit={handleSubmit}>
            <BorderedButton text={'Go back'} className='Black' onClick={() => navigate('/admin')}/>
            <h1>{id === undefined ? 'Create new poll' : `Edit poll #${id}`} </h1>
            <div className='Row'>
                <div className='Input'>
                    <label htmlFor="name">Company name:</label>
                    <input type="text" id="name" name="name" onChange={handleChange} value={data.name} required/>
                </div>
                <div className='Input'>
                    <label htmlFor="sample">Poll sample:</label>
                    <input type="number" id="sample" name="sample" onChange={handleChange} value={data.sample}/>
                </div>
                <div className='Input'>
                    <label htmlFor="methodology">Methodology:</label>
                    <input type="text" id="methodology" name="methodology" onChange={handleChange}
                           value={data.methodology}
                           required/>
                </div>
            </div>

            <div className='Row'>
                <div className='Input'>
                    <label htmlFor="start_date">Start date:</label>
                    <input type="date" id="start_date" name="start_date" onChange={handleChange} value={data.start_date}
                           required/>
                </div>

                <div className='Input'>
                    <label htmlFor="end_date">Start date:</label>
                    <input type="date" id="end_date" name="end_date" onChange={handleChange} value={data.end_date}
                           required/>
                </div>
            </div>
            <br/>
            <BorderedButton className='Black' text={'Add party'} type='button' onClick={() => addPoll()}/>

            <div className='Parties'>
                {
                    pollParties.map((pollParty: any, index: number) => {
                        return <div key={`party_${pollParty.id}`} className='Party'>
                            <React.Fragment>
                                <Select options={selectOptions}
                                        onChange={(e: any) => {
                                            let newData = [...pollParties];
                                            newData[index].party = e.value;
                                            newData[index].partyId = e.id;
                                            setPollParties(newData);
                                            loadSelectOptions(parties);
                                        }}
                                        defaultValue={findOption(pollParty.party)}
                                        required/>
                                <input
                                    key={`select_input_${pollParty.id}`}
                                    tabIndex={-1}
                                    autoComplete="off"
                                    style={{opacity: 0, height: 0, position: "absolute"}}
                                    value={pollParties[index].party}
                                    onChange={() => {
                                    }}
                                    required={true}
                                />
                            </React.Fragment>
                            <input type='number' step='.01' onChange={(e: any) => {
                                let newData = [...pollParties];
                                newData[index].support = e.target.value;
                                setPollParties(newData);
                            }
                            }
                                   value={pollParty.support}
                                   required/>
                            <button className='RemoveButton' key={`button_${pollParty.id}`} type='button'
                                    onClick={() => removePollParty(pollParty.id)}>
                                <img src={DeleteIcon} alt=''/>
                            </button>
                        </div>

                    })
                }
            </div>
            <br/>
            <BorderedButton type='submit' className='Black' text={id === undefined ? 'Create poll' : 'Save changes'}/>
        </form>
    }

    return (
        <>
            <div className='CreatePollPage'>
                {renderForm()}
            </div>
            <div className='Filler'/>
        </>
    )
}