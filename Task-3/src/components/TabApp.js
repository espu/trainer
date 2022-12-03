import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomerList from "./CustomerList";
import TrainingsList from "./TrainingsList";
import ScheduleCalendar from "./Calendar";
import Statistics from "./Statistics";

function TabApp() {
  const [value, setValue] = useState("one");
  
  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab value="one" label="Customers" />
        <Tab value="two" label="Trainings" />
        <Tab value="three" label="Calendar" />
        <Tab value="four" label="Statistics" />
      </Tabs>
      {value === "one" && (
        <div>
          <CustomerList />
        </div>
      )}
      {value === "two" && (
        <div>
          <TrainingsList />
        </div>
      )}
      {value === "three" && (
        <div>
          <ScheduleCalendar />
        </div>
      )}
      {value === "four" && (
        <div>
          Soon
        </div>
      )}
    </div>
  );
}

export default TabApp;
