import axios from "axios";
import React, { useEffect, useState } from "react";

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
    });

    return (
        <div>
            {tabData.map((item,ind) => {
                return <div key={item.created_at}> {item.name} </div>
            })}
        </div>
    )
}