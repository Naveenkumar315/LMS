import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

export default function DataCard(props) {
    const [cardStyle, setCardStyle] = useState(props['theam']);
    const nodeurl = `http://localhost:3001/`;
    const [EmpId, setEmpId] = useState(localStorage['EmpId']);
    const [totalHoursClient, setTotalHoursClient] = useState([]);
    useEffect(() => {
        axios.post(nodeurl, { query: 'AB_Clientgrid ' + EmpId + '' }).then(result => setTotalHoursClient(result.data[0]));
    }, []);
    return (
        <>
            <div style={{ maxWidth: 275, background: 'linear-gradient(45deg, #0589a0 30%, #67c9d0 90%)', color: '#fff' }}>
                <table>
                    <tbody>
                        <tr>
                            <th>Client</th>
                            <th>Hours</th>
                        </tr>
                        {totalHoursClient.map((val, index) => {
                            return (
                                <tr key={index}>
                                    <td>{val['Clients']}</td>
                                    <td>{val['Hours']}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
