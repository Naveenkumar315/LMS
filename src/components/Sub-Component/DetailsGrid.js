import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

export default function DetailsGrid(props) {

    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(props['Rows']); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState(props['Columns']);

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true
    }));
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%', margin: '0 0 0 20px' }), []);
    const gridStyle = useMemo(() => ({ height: 500, width: '100%' }), []);

    // const onGridReady = useCallback((params) => {
    //     debugger
    // setRowData(props['Rows']);
    // }, []);


    return (
        <div style={containerStyle}>
            {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
            <div className="ag-theme-alpine" style={gridStyle}>
                <AgGridReact
                    ref={gridRef} // Ref for accessing Grid's API
                    rowData={rowData} // Row Data for Rows
                    columnDefs={columnDefs} // Column Defs for Columns
                    defaultColDef={defaultColDef} // Default Column Properties
                    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                // onGridReady={onGridReady}
                />
            </div>
        </div>
    );
};

