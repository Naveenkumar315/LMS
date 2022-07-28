import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

export default function DataCard(props) {
    const [cardStyle, setCardStyle] = useState(props['theam']);
    const nodeurl = `http://localhost:3001/`;
    const EmpId = localStorage['EmpId'];
    const [totalHours, setTotalHours] = useState([]);
    useEffect(() => {
        axios.post(nodeurl, { query: 'AB_EmpDashBoard ' + EmpId + '' }).then(result => setTotalHours(result.data[0][0]));
    }, []);
    return (
        <Card style={{ maxWidth: 275, background: 'linear-gradient(45deg, #0589a0 30%, #67c9d0 90%)', color: '#fff' }}>
            <CardContent>
                <Typography>
                    <table>
                        <tbody>
                            <tr>
                                <td>Day</td>
                                <td>{totalHours['ForDay']}</td>
                            </tr>
                            <tr>
                                <td>Week</td>
                                <td>{totalHours['ForWeek']}</td>
                            </tr>
                            <tr>
                                <td>Month</td>
                                <td>{totalHours['ForMonth']}</td>
                            </tr>
                        </tbody>
                    </table>
                </Typography>
            </CardContent>
        </Card>
    );
}
