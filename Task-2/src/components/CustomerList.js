import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { API_CUSTOMERS } from './constants'
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

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

    const addCustomer = (customer) => {
        fetch(API_CUSTOMERS,
        {
          method: 'POST',
          headers: { 'Content-type' : 'application/json' },
          body: JSON.stringify(customer)
        })
        .then((response) => {
            if (response.ok) {
              getCustomers();
            } else {
              alert("Customer addition error");
            }
          })
          .catch((error) => console.error(error));
      };
  
    function deleteCustomer(customer) {
        if (window.confirm("Are you sure?")) {
            fetch(customer, { method: "DELETE" })
            .then((response) => {
                if (response.ok) {
                    getCustomers();
                }
                else {
                    alert("Customer deletion error");
                    setOpen(true);
                }
            })
            .catch((error) => console.error(error));
        }
      }
  
    const editCustomer = (customer, connection) => {
        fetch(connection, {
            method: 'PUT',
            headers: { 'Content-type' : 'application/json'},
            body: JSON.stringify(customer)
        })
        .then((response) => {
            if (response.ok) {
                getCustomers();
            }
            else {
                alert("Customer edit error");
                setOpen(true);
            }
        })
        .catch(error => console.error(error))  
    }

    const addTraining = (training) => {
        fetch("https://customerrest.herokuapp.com/api/trainings", {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(training)
        })
        .then((response) => {
            if (response.ok) {
                getCustomers();
            }
            else {
                alert("Training addition error");
                setOpen(true);
            }
        })
        .catch(error =>console.error(error))
    }

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
            width: 110,
        },
        {
            field: 'city',
            sortable: true,
            filter: true,
            width: 130,
        },
        {
            field: 'email',
            sortable: true,
            filter: true,
            width: 220,
        },
        {
            field: 'phone',
            sortable: true,
            filter: true,
            width: 150,
        },
        {
            headerName: "Add training",
            field: "links.0.href",
            width: 120,
            cellRenderer: (params) => (
                <AddTraining params={params} addTraining={addTraining} customer={params.value}/>
            ),
        },
        {
            headerName: "",
            field: "links.0.href",
            width: 100,
            cellRenderer: (params) => (
                <EditCustomer params={params} editCustomer={editCustomer} />
            ),
        },
        {
            headerName: "",
            field: "links.0.href",
            width: 100,
            cellRenderer: (params) => (
                <IconButton color="error" onClick={() => deleteCustomer(params.value)} >
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];

    return(
        <React.Fragment>
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: 5 }}>
                <AddCustomer addCustomer={addCustomer}/>
            </div>
            
            <div
                className='ag-theme-alpine'
                style={{ 
                    height: 542, 
                    width: "100%", 
                    margin: "auto",
                }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
        </React.Fragment>
    );
}

export default CustomerList;