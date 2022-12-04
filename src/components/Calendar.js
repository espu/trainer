import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer} from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';

function ScheduleCalendar() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        getTrainings()
    }, []);

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
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
    }

    const event = trainings.map((training) => {
        let startDate = new Date(training.date)
        let endDate = new Date(training.date)
        endDate.setMinutes(startDate.getMinutes() + training.duration);

        return {
            id: training.id,
            title: training.activity + " | " + training.customer.firstname + " " + training.customer.lastname,
            start: startDate,
            end: endDate,
            allDay: false
        }
    })

    return (
        <Calendar 
            localizer={momentLocalizer(moment)}
            events={event}
            startAccessor='start'
            endAccessor='end'
            views={['month', 'day', 'week']}
            style={{height: 588}}
        />
    )
}

export default ScheduleCalendar;