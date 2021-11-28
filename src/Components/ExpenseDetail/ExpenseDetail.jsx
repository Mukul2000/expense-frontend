import axios from "axios";
import React, { useEffect, useState } from "react";
import './ExpenseDetail.css';

export default function ExpenseDetail({ category }) {
    const [tabData, setTabData] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        axios.get('http://localhost:8000/api/expenses', {
            headers: {
                Authorization: 'Token ' + user.token
            },
            params: {
                category: category,
                start_date: '2020-11-01',
                end_date: '2021-12-01'
            }
        }).then((tabs_data) => setTabData(tabs_data.data))
            .catch(e => console.log(e));
    }, [category]);

    return (
        <div>
            {console.log(tabData)}
            {tabData.map((item,ind) => {
                return <div className='transaction' key={item.created_at}> Title: {item.name} <br/> Amount: {item.amount} <br/> Dated: {item.created_at} <br/> <br/>  </div>
            })}
        </div>
    )
}