/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import React from 'react'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const styles = ({fromPeer}) => css`
  width: 30%;
  ${!fromPeer && `
    align-self: flex-end;
  `}
`;

export default function ChatListItem({text, fromPeer}) {
  return (
    <Paper
      css={styles({fromPeer})}
    >
      <Typography>{text}</Typography>
    </Paper>
  );
}