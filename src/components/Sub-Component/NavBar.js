import React, { useState, useEffect, } from 'react';
import Sidebar from "./Sidebar"

export default function NavBar(props) {
    return (
        <>
            <div style={{ height: '100%' }}>
                <div style={{ backgroundColor: localStorage['BgColor'], color: '#fff', width: '100%', textAlign: 'center', padding: '10px' }}><h2 style={{ margin: 0 }}>Analytic Brains</h2></div>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Sidebar />
                    <div style={{ margin: '20px 30px', width: '100%', height: '85vh' }}>
                        {props['Component']}
                    </div>
                </div>
            </div>
        </>
    );
}