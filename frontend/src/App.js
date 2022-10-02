import ReactDOM from 'react-dom';
import Tier from './Tier';
import ImageList from './ImageList'
import Create from './Create'
import React, { useEffect, useState } from "react";

import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CssBaseline from '@mui/material/CssBaseline';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function ToggleControlToolBar() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <div className="ToggleControlToolBar">
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }} noWrap>
            Food Tier List
          </Typography>

          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

        </Toolbar>
      </AppBar>

    </div>
  )
}

function App() {
  const [records, setRecords] = useState([]);
 
  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`);
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const records = await response.json();
      setRecords(records);
    }
  
    getRecords();
  
    return;
  }, [records.length]);

  const [mode, setMode] = React.useState('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToggleControlToolBar />
        <main>
          <Tier fill_data = {['red', 'S Tier', 'This restaurant changed my life.']}/>
          <ImageList itemData = {restData}/>
          <Tier fill_data = {['orange', 'A Tier', 'This restaurant cant be improved.']}/>
          <ImageList itemData = {restData}/>
          <Tier fill_data = {['blue', 'B Tier', 'You can never go wrong with going here. Will return']}/>
          <ImageList itemData = {restData}/>
          <Tier fill_data = {['green', 'C Tier', 'Solid, but wont force myself to return.']}/>
          <ImageList itemData = {restData}/>
          <Tier fill_data = {['purple', 'F Tier', 'Never going back.']}/>
          <ImageList itemData = {restData}/>

          <Create />

          
        </main>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

const restData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    votes: '1',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    votes: '1',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    votes: '1',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    votes: '1',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    votes: '1',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    votes: '1',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    votes: '1',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    votes: '1',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    votes: '1',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    votes: '1',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    votes: '1',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    votes: '1',
  },
];

export default App;
