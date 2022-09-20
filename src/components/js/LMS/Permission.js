import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Swatch from '../../Sub-Component/Swatch';
import PermissionWH from './PermissionWH';
import PermissionWFH from './PermissionWFH';

export default function Permission() {
    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography component={"span"} variant={"body2"}>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function FullWidthTabs(props) {
        const [value, setValue] = useState(0);
        const handleChangeIndex = (index) => {
            setValue(index);
        };
        const [swatch, setSwatch] = useState(false);
        const handelSwatchChange = (e) => {
            setSwatch(!swatch)
            setValue(value === 0 ? 1 : 0);
        }
        return (
            <div className='Permission' >
                <Box sx={{ bgcolor: 'inherit' }}>
                    <span className={!swatch ? 'activeLable Prelable' : 'Prelable'}>Permission for Work Hours</span>
                    <Swatch OnChange={handelSwatchChange} style={{ display: 'inline-block', margin: '15px' }} />
                    <span className={swatch ? 'activeLable Prelable' : 'Prelable'}>Permission for Work from Home</span>
                    <SwipeableViews
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0}>
                            <div style={{ margin: '0 3px' }}>
                                <PermissionWH />
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <PermissionWFH />
                        </TabPanel>
                    </SwipeableViews >
                </Box >
            </div>
        );
    }
    return (<FullWidthTabs />)
}
