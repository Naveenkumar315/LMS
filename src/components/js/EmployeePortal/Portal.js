import React, { useState, useEffect } from 'react';
import setTheme from '../../Sub-Component/setTheme';


export default function Portal() {
    useEffect(() => {
        setTheme();
    }, []);
    return (
        <> <h1>Under Construction</h1></>
    )
}
