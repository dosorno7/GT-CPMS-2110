import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import GridRowId from '@mui/x-data-grid';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function RemoveTeamModal( props: {
    deleteTeams: any,
    selectionModel: string | any[]
    }) {
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleYes = () => { props.deleteTeams(); setOpen(false); }

    console.log(props.selectionModel)
    return (
        <div>
            <Button variant="contained" onClick={handleOpen} disabled={props.selectionModel.length > 5 || props.selectionModel.length == 0}>
                Delete Selected Teams
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Are you sure that you want to delete {props.selectionModel.length} selected team(s)?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Note: The maximum number of teams you may delete at once is 5.
                    </Typography>
                    <div className="option_buttons">
                    <Button variant="contained" onClick={handleYes}>
                        Yes
                    </Button>
                    <Button variant="contained" onClick={handleClose}>
                        No
                    </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}