import React, {useState} from "react";
import { Button } from "@mui/material";

export default function InterestsListItem(props) {
  const [isCriteria, toggleCriteria] = useState(true);
  const variant = isCriteria ? 'contained' : 'text'; 
  const criteriaLobbyUpdate = isCriteria ? 'remove-criteria' : 'add-criteria';

  const { interest, socket, userId, inLobby } = props;

  return (
    <Button
      variant={variant}
      disabled={!inLobby}
      onClick={() => {
        toggleCriteria(prev => !prev)
        socket.current.emit(criteriaLobbyUpdate, {userId, interest})
      }}>
      {interest}
    </Button>
  );
}