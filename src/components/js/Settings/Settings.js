import React, { useState, useEffect } from 'react';
import setTheme from '../../Sub-Component/setTheme';
import "../../../components/css/Settings.css"
import axios from 'axios';
import Male from '../../../images/Male.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faTrash } from '@fortawesome/free-solid-svg-icons';
import Female from '../../../images/Female.png'
import nodeurl from '../../../nodeServer.json'

export default function Settings() {
    const loadImage = () => {
        try {
            return require('../../../images/Profile_' + localStorage['EmpId'] + '.png')
        } catch (error) {
            return localStorage['Gender'] === 'Female' ? Female : Male
        }
    }
    //1f456e", "151e3d", "0589a0", "444791", "f48225", "428bca", "911844
    const Color = [
        { Primary: '#444791', Secondary: '#fff' },
        // { Primary: '#1f456e', Secondary: '#fff' },
        { Primary: '#151e3d', Secondary: '#fff' },
        { Primary: '#0589a0', Secondary: '#fff' },
        { Primary: '#f48225', Secondary: '#fff' },
        { Primary: '#428bca', Secondary: '#fff' },
        { Primary: '#911844', Secondary: '#fff' },
        { Primary: '#0d3560', Secondary: '#fff' },
        { Primary: '#6fbb80', Secondary: '#fff' },
        { Primary: '#e30b5d', Secondary: '#fff' },

        { Primary: '#4fb8c0', Secondary: '#111' },
        { Primary: '#00bfff', Secondary: '#0c090a' },
        { Primary: '#82ade2', Secondary: '#111' },
        { Primary: '#306754', Secondary: '#fbcfcd' },
        { Primary: '#111', Secondary: '#ffdfba' },
        { Primary: '#111', Secondary: '#fff' },
        { Primary: '#111', Secondary: '#fbcfcd' },
    ];
    useEffect(() => { setTheme(); }, []);
    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                axios.post(nodeurl['nodeurl'] + 'Upload', { img: reader.result, EmpId: localStorage['EmpId'] }).then(result => {
                });
            }
        }
        reader.readAsDataURL(e.target.files[0])
    };
    const imagedeleteHandler = (e) => {
        axios.post(nodeurl['nodeurl'] + 'Delete', { EmpId: localStorage['EmpId'] }).then(result => {
            console.log("Image deleted");
        });
    };
    const handelColorClick = (event) => {
        const color = Color[parseInt(event.currentTarget.attributes.index.value)];
        localStorage.setItem('BgColor', color['Primary']);
        localStorage.setItem('Color', color['Secondary']);
        setTheme();
    }
    const handelClick = () => {
        const color = localStorage['BgColor'] + ',' + localStorage['Color'];
        axios.post(nodeurl['nodeurl'], { query: "update EmployeeDetails set Theme='" + color + "' where Empid=" + localStorage["EmpId"] }).then(result => {
            console.log("Theme Saved");
        });
    }
    return (
        <>
            <div className="page">
                <div className="container">
                    <div className="img-holder">
                        <img src={loadImage()} alt="" id="img" className="img" />
                    </div>
                    <h1 className="heading">{localStorage['Name']}</h1>
                    <input type="file" accept="image/png" name="image-upload" id="input" onChange={imageHandler} />
                    <div className="label">
                        <label className="image-upload choosephoto" htmlFor="input">
                            <FontAwesomeIcon icon={faUpload} className="icon" />
                        </label>
                        <label className="image-upload choosephoto" onClick={imagedeleteHandler}>
                            <FontAwesomeIcon icon={faTrash} className="icon" />
                        </label>
                    </div>
                </div>


                <div className="container">
                    <div style={{ margin: '40px auto' }}>
                        {Color.map((color, index) => {
                            return (<div div key={index} className='colorPaletteWrapper' >
                                <div className='colorPalette' onClick={handelColorClick} index={index} style={{ backgroundColor: color['Primary'], border: '2px solid' + color['Primary'] }}>
                                    <div className='primary'></div>
                                    <div className='secondary' style={{ backgroundColor: color['Secondary'] }}></div>
                                </div>
                            </div>)
                        })}
                        <div style={{ marginTop: '30px' }}>
                            <button className="btn" style={{ float: 'right' }} onClick={handelClick}>Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}


