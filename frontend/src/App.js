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
  const [contents, setContents] = useState([]);

  const getContents = async () => {
    const response = await fetch("http://localhost:8000/content");
    const data = await response.json();
    // console.log(data);
    // setContents(data);
    let tempVoteData = [];
    let tempAdded = [];
    data.forEach((item) => {

      if (!(tempAdded.includes(item.name))) {
        tempAdded.push(item.name);
        let tempTuple = [item.name, 0, 0, 0, 0, 0];
        if (item.level == 'S') {
          tempTuple[1]++;
        }
        if (item.level == 'A') {
          tempTuple[2]++;
        }
        if (item.level == 'B') {
          tempTuple[3]++;
        }
        if (item.level == 'C') {
          tempTuple[4]++;
        }
        if (item.level == 'F') {
          tempTuple[5]++;
        }
        tempVoteData.push(tempTuple)
      }
      else {
        tempVoteData.forEach(element => {
          if (element[0] == item.name) {
            if (item.level == 'S') {
              element[1]++;
            }
            if (item.level == 'A') {
              element[2]++;
            }
            if (item.level == 'B') {
              element[3]++;
            }
            if (item.level == 'C') {
              element[4]++;
            }
            if (item.level == 'F') {
              element[5]++;
            }
          }
          else {
            let tempTuple = [item.name, 0];
            tempVoteData.push(tempTuple)
          }
        });
      }
    });
    let finalRestauarants = [];
    // let tempN = ['pasta restaurant', 'pizza restaurant', 'salad restaurant', 'fruits restaurant', 'cupcakes restaurant', 'cake restaurant'];
    tempVoteData.forEach(element => {
      let tempTier = "";
      let tempTiers = ['','S','A','B','C','F'];
      let tempVotes = 0;
      for (let index = 1; index < element.length; index++) {
        if (element[index] > tempVotes) {
          tempVotes = element[index];
          tempTier = tempTiers[index]
        }
      }
      let tempFinalRanked = {
        img: 'https://source.unsplash.com/random/700x700/?food,'+Math.floor(Math.random() * (5 - 0 + 1) + 0),
        title: element[0],
        votes: tempVotes,
        tier: tempTier,
      };
      console.log(tempFinalRanked)
      finalRestauarants.push(tempFinalRanked);
    });
    console.log(finalRestauarants)
    setContents(finalRestauarants);
  };

  useEffect(() => {
    getContents();

  }, []);

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
          <Tier fill_data={['red', 'S Tier', 'This restaurant changed my life.']} />
          <ImageList itemData={contents.filter(store => store.tier == 'S')} />
          <Tier fill_data={['orange', 'A Tier', 'This restaurant cant be improved.']} />
          <ImageList itemData={contents.filter(store => store.tier == 'A')} />
          <Tier fill_data={['blue', 'B Tier', 'You can never go wrong with going here. Will return']} />
          <ImageList itemData={contents.filter(store => store.tier == 'B')} />
          <Tier fill_data={['green', 'C Tier', 'Solid, but wont force myself to return.']} />
          <ImageList itemData={contents.filter(store => store.tier == 'C')} />
          <Tier fill_data={['purple', 'F Tier', 'Never going back.']} />
          <ImageList itemData={contents.filter(store => store.tier == 'F')} />

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
    tier: "S",
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
