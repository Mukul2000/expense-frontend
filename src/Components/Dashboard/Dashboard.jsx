import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import ExpenseDetail from "../ExpenseDetail/ExpenseDetail";
import './Dashboard.css';

function Dashboard(props) {
    const [name, setName] = useState();
    const [activeTab, setActiveTab] = useState(0);
    const [tabsList, setTabsList] = useState([])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setName(user.username);

        axios.get('http://localhost:8000/api/categories', {
            headers: {
                Authorization: 'Token ' + user.token
            }
        }).then( (tabs_data) => setTabsList(tabs_data.data))
        .catch(e => console.log(e));
    }, []);


    return (
        <div className='content-wrapper'>
            <div className='left-tab'>
                <div className='greeting'>
                    <div className='welcome-text'>Hello {name}</div>
                    <div className='subtitle'> Welcome back! </div>
                </div>
                <div className='tabs-list'>
                    {/* <div id='space-box'></div> */}
                    {tabsList.map((item, ind) => {
                        return <div className={ind == activeTab ? 'active-tab' : 'tab'} onClick={() => setActiveTab(ind)} key={item.created_at}> {item.name} </div>
                    })}
                    <div className='add-button'><Button className="newlistbutton" onClick={() => { }}> + </Button></div>
                </div>
            </div>
            <div className='tab-data'>
                {tabsList.length != 0 && <ExpenseDetail category={tabsList[activeTab]}/>}
            </div>
        </div>
    )
}

export default Dashboard;