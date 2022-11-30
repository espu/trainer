import React, { useState, useEffect } from 'react';
import { API_TRAININGS } from './constants'
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import moment from 'moment';

function TrainingsList() {
    const [trainings, setTrainings] = useState([]);

    const getTrainings = () => {
        fetch(API_TRAININGS)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else
                alert('Trainings fetch error')
            }
        )
        .then(data => setTrainings(data))
        .catch(error => console.error(error))
    };

    useEffect(() => {
        getTrainings();
    }, []);

    const columns = [
        {
            field: 'customer',
            sortable: true,
            filter: true,
            width: 200,
            cellRendererFramework: params => 
                params.value.firstname + ' ' + params.value.lastname,
        },
        {
            field: 'date',
            sortable: true,
            filter: true,
            width: 200,
            cellRendererFramework: params => { return moment(params.value).format("DD.MM.YYYY HH:mm");
            }
        },
        {
            field: 'duration',
            sortable: true,
            filter: true,
            width: 200,
        },
        {
            field: 'activity',
            sortable: true,
            filter: true,
            width: 200,
        }
    ];

    return (
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
                rowData={trainings}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
            />
            </div>
        </React.Fragment>
    );
}

export default TrainingsList;