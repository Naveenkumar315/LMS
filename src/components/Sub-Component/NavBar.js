import React, { useState, useEffect, } from 'react';
import Sidebar from "./Sidebar"

export default function NavBar(props) {
    return (
        <>
            <div style={{ height: '100%' }}>
                <div style={{ flexDirection: 'row' }}>
                    <Sidebar Component={props['Component']} />
                </div>
            </div>
        </>
    );
}