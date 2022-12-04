import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { API_TRAININGS } from './constants'
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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

    function deleteTraining(id) {
        if (window.confirm("Are you sure?")) {
            let url = "https://customerrest.herokuapp.com/api/trainings/" + id;
            fetch(url, { method: "DELETE" })
            .then((response) => {
                if (response.ok) {
                    getTrainings();
                } else {
                    alert("Training deletion error");
                }
            })
            .catch((error) => console.error(error));
        }
    }

    const columnDefs = [
        {
            field: 'customer',
            sortable: true,
            filter: true,
            width: 200,
            cellRenderer: params => 
                params.value.firstname + ' ' + params.value.lastname,
        },
        {
            field: 'date',
            sortable: true,
            filter: true,
            width: 200,
            cellRenderer: params => { return moment(params.value).format("DD.MM.YYYY HH:mm");
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
        },
        {
            field: "id",
            headerName: "",
            cellRenderer: (params) => (
                <IconButton color="error" onClick={() => deleteTraining(params.value)} >
                    <DeleteIcon />
                </IconButton>
            ),
          }
    ];

    return (
        <React.Fragment>
            <div
                className='ag-theme-alpine'
                style={{ 
                    height: 588, 
                    width: "100%", 
                    margin: "auto",
                }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={11}
                />
            </div>
        </React.Fragment>
    );
}

export default TrainingsList;