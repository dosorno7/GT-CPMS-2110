import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


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

export default function ManageTeamModal(props: {
    rows: {
        teamNumber: string,
        section: string,
        project: string,
        client: string,
        professor: string
    }[]; selectionModel: string | any[]; 
    manageDisabled: boolean}) {

    const [open, setOpen] = React.useState(false);
    const [selectedTeam, setSelectedTeam] = React.useState([{
        teamNumber: '',
        section: '',
        project: '',
        client: '',
        professor: ''
    }])

    const handleOpen = () => {
        setSelectedTeam(props.rows.filter((r: any) => props.selectionModel.includes(r.id)))
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant="contained" onClick={handleOpen} disabled={props.manageDisabled}
            >
                Manage Selected Team
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Team {selectedTeam[0].teamNumber}
                    </Typography>
                    <Typography component={'div'} id="modal-modal-description" sx={{ mt: 2 }}>
                        <b>Section: </b>  {selectedTeam[0].section} <br/>
                        <b>Project: </b>  {selectedTeam[0].project} <br />
                        <b>Client: </b>  {selectedTeam[0].client} <br />
                        <b>Professor: </b>  {selectedTeam[0].professor} <br />
                        <b>Students: </b> 

                    </Typography>

                </Box>
            </Modal>
        </div>
    );
}