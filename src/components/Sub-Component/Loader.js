import React, { useState, useEffect, } from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { MutatingDots } from 'react-loader-spinner'
import { TailSpin } from 'react-loader-spinner'

export default function Loader() {
    return (
        <>
            <div className='loader' style={{ textAlign: 'center' }}>
                <MutatingDots
                    color={localStorage['BgColor']}
                    secondaryColor={localStorage['BgColor']}
                    height='100%'
                    width='110' />
            </div>
        </>
    );
}