import "./App.css";
import TabApp from "./components/TabApp";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>
      <TabApp />
    </div>
  );
}

export default App;