import './App.css';

import React, { useState } from 'react';

import axios from 'axios';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function App() {
  const [uid, setUid] = useState('');
  const [person, setPerson] = useState(null);

  const handleButtonClick = () => {
    // Make a POST request to your server using Axios
    axios.get(`http://localhost:5000/people/?uid=${uid}`)
      .then(response => {
        // Handle the response from the server if needed
        // console.log(response.data);
        setPerson(response.data)
        console.log(person)
      })
      .catch(error => {
        // Handle errors if the request fails
        console.error('Error:', error);
      });
  };

  return (
    <div className="App">
      <body>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box sx={{ width: '100%', maxWidth: 500 }}>
            <Typography variant="h1" gutterBottom>
              Rice POS
            </Typography>
          </Box>
          <Stack spacing={2} direction="row">
            <TextField 
              id="outlined-basic" 
              label="UID" 
              variant="outlined" 
              value={uid} 
              onChange={(e) => {
                console.log(e.target.value)
                setUid(e.target.value)
              }}
              />
            <Button variant="contained" onClick={handleButtonClick}>Submit</Button>
          </Stack>

          {person && (
            <div>
              <p>Name: {person.name}</p>
              <p>UID: {person.uid}</p>
              <p>Seq #: {person['seq #']}</p>
              <p>Legend: {person.legend}</p>
              <p>Prec #: {person['prec #']}</p>
              <p>Barangay: {person.barangay}</p>
            </div>
          )}
        </Grid>
      </body>
    </div>
  );
}

export default App;
