import * as React from 'react';
import ReactDOM from 'react-dom';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Box} from "@mui/material";

function Tier(props) {
  const fill_data = props.fill_data;

    return (
        <Container>
            <Box
        sx={{
          bgcolor: fill_data[0],
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
          marginTop: "2vh"
        }}
      >
          <Box sx={{ color: 'text.primary'}}>
          {fill_data[1]}
          </Box>
          <Box sx={{ color: 'text.secondary' }}>{fill_data[2]}</Box>
          </Box>
        </Container>
    )
}

export default Tier