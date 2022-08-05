import React, { useState, useEffect } from 'react';
import setTheme from '../../Sub-Component/setTheme';

export default function Task() {
    useEffect(() => {
        setTheme();
    }, []);
    return (
        <> <h1>Under Construction</h1></>
    )
}
