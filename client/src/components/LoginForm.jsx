import React, { useState } from 'react'
import axios from 'axios';
import { Box, Button, Avatar, Typography, TextField, Grid, Link } from "@mui/material";
import { Google } from "@mui/icons-material";
import {css} from '@emotion/react';

const {REACT_APP_BACKEND_API} = process.env;

export default function LoginForm({ onSubmit, formRef }) {
  
  const formStyle = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%'
  })

  const [email, setEmail] = useState('');

  const login = e => {
    e.preventDefault();
    onSubmit(email);
  }

  const oauth = () => {
    axios.get(`${REACT_APP_BACKEND_API}/oauth`)
      .then(res => {
        window.location = res.data;
      });
  }
  
  return (
    <Box sx={formStyle}>
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }} />
      <Box ref={formRef} component="form" onSubmit={login} sx={formStyle}>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              type="email"
              autoComplete='email'
              label="Email Address"
              onChange={e => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              onClick={oauth}
            >
              Sign in with Google
            </Button>
            
              </Grid>
            </Grid>
          </Box>
        </Box>
  );
}