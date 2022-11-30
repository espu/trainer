import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { API_CUSTOMERS } from './constants'

function CustomerList() {
    const [customers, setCustomers] = useState([]);

    const getCustomers = () => {
        fetch(API_CUSTOMERS)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else
                alert('Customer fetch error')
            }
        )
        .then(data => setCustomers(data.content))
        .catch(error => console.error(error))
    }

    useEffect(() => {
        getCustomers();
    }, []);

    const columnDefs = [
        {
            headerName: 'First name',
            field: 'firstname',
            sortable: true,
            filter: true,
            width: 150,
        },
        {
            headerName: 'Last name',
            field: 'lastname',
            sortable: true,
            filter: true,
            width: 150,
        },
        {
            headerName: 'Street address',
            field: 'streetaddress',
            sortable: true,
            filter: true,
            width: 200,
        },
        {
            field: 'postcode',
            sortable: true,
            filter: true,
            width: 150,
        },
        {
            field: 'city',
            sortable: true,
            filter: true,
            width: 150,
        },
        {
            field: 'email',
            sortable: true,
            filter: true,
            width: 200,
        },
        {
            field: 'phone',
            sortable: true,
            filter: true,
            width: 150,
            cellRendererFramework: params => 
                params.value,
        },
    ];

    return(
        <React.Fragment>
            <div
                className='ag-theme-alpine'
                style={{ 
                    height: 520, 
                    width: "100%", 
                    margin: "auto",
                }}
            >
            <AgGridReact
                rowData={customers}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
            />
            </div>
        </React.Fragment>
    );
}

export default CustomerList;