import React from 'react'
import FindCoworkers from '../../components/messaging/FindCoworkers'
import Unread from '../../components/messaging/Unread'
import { Box } from "@mui/system";
import { Container } from "@mui/material";

const Contacts = () => {
  return (
    <Container sx={{ mt: "30vh" }}>
     <Box
          display="flex"
          flexDirection="column"
          mb={3}
          sx={{ width: "50%", margin: "auto" }}
        >
    <div>Contacts</div>
    <FindCoworkers/>
    <Unread/>
    </Box>
    </Container>
  )
}

export default Contacts