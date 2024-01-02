import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Cancel } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '800',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  maxHeight: '90%',
};

export default function ModalApp({ open, handleClose, content, title }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Cancel
            style={{
              position: 'absolute',
              top: '3%',
              right: '3%',
              color: 'white',
              fontSize: '50px',
              cursor: 'pointer',
            }}
            onClick={handleClose}
          />
          <Box sx={style} id="modal_content">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            {content}
          </Box>
        </div>
      </Modal>
    </div>
  );
}
