import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Box, Button, Modal, Typography, useMediaQuery } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import PropTypes from 'prop-types';

const ModalBoxStyle = styled(Box)(({ theme, Width }) => ({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 758,
  width: Width,
  height: 300,
  bgcolor: 'transparent',
  borderStyle: 'none',
  borderRadius: '8px',
}));

const HeaderBox = styled(Box)({
  width: '100%',
  height: '50px',
  backgroundColor: 'transparent',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '6px',
});

const CloseBtn = styled(Button)({
  borderRadius: '6px',
  width: '10px !important',
  height: '30px',
  backgroundColor: 'white',
  border: 'none',
  boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
  fontSize: '14px',
  padding: 0,
  ':hover': {
    backgroundColor: 'white',
  },
});

const AddMessageBtn = styled(Button)({
  height: '40px',
  borderRadius: '10px',
  fontSize: '16px !important',
  marginTop: '20px',
  marginBottom: '20px',
});

AddNote.propTypes = {
  item: PropTypes.object,
  setNote: PropTypes.func,
  setShowInstruction: PropTypes.func,
  openModal: PropTypes.bool,
};

function AddNote({ item, setNote, setShowInstruction, openModal }) {
  // //State for store special instructions
  const [newNote, setNewNote] = useState(item?.note || '');
  const isDesktop = useMediaQuery('(min-width:900px)');
  const isMobile = useMediaQuery('(min-width:425px)');

  return (
    <Box sx={{ backgroundColor: 'transparent' }}>
      <HeaderBox>
        <CloseBtn onClick={() => setShowInstruction(false)}>
          <ClearIcon
            sx={{
              color: '#BB3138',
              height: '1.2em',
            }}
          />
        </CloseBtn>
      </HeaderBox>
      <Box backgroundColor="white" sx={{ borderRadius: '15px 15px 15px 15px', height: '100%' }}>
        <Box
          width="100%"
          height="35px"
          backgroundColor="#BB3138"
          textAlign="center"
          sx={{ borderRadius: '15px 15px 0px 0px' }}
        >
          <Typography color="" sx={{ fontSize: '20px' }}>
            Add Instructions
          </Typography>
        </Box>
        <Typography color="black" sx={{ m: '10px', fontSize: '18px' }}>
          {item?.name}
        </Typography>

        <Box m="5px" display="flex" flexDirection="column" justifyContent="center">
          <textarea
            rows={10} // Specifies the number of visible text lines
            cols={35} // Specifies the width of the textarea in characters
            placeholder="Enter your message" // Specifies a short hint that describes the expected value of the textarea
            wrap="soft" // Specifies how the text in the textarea should be wrapped
            name="name" // Specifies the name of the textarea, which can be used when submitting a form
            maxLength={200}
            autoComplete="on"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            style={{ fontSize: '16px', fontFamily: 'lato', border: '1px solid grey' }}
          />
          <AddMessageBtn
            variant="contained"
            fullWidth
            onClick={() => setNote(item?.itemId, newNote, item?.variant)}
          >
            ADD
          </AddMessageBtn>
        </Box>
      </Box>
    </Box>
  );
}

export default AddNote;
