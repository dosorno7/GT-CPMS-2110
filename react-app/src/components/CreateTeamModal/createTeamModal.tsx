import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField'
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

export default function CreateTeamModal( {getCreateTeamInfo}: any ) {
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);

  const [teamNumber, setTeamNumber] = React.useState('');
  const [section, setSection] = React.useState('');
  const [projName, setProjName] = React.useState('');
  const [clientName, setClientName] = React.useState('');
  const [profName, setProfName] = React.useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setTeamNumber('');
    setProjName('');
    setClientName('');
    setProfName('');
    setOpen(false);
  }

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [formValues, setFormValues] = React.useState([{ studentName: "", studentEmail: ""}])

  let handleRowChange = () => {
      let newFormValues = [...formValues];
      // newFormValues[i][e.target.name] = e.target.value;
      setFormValues(newFormValues);
  }

  let addFormFields = () => {
      setFormValues([...formValues, { studentName: "", studentEmail: "" }])
  }


  React.useEffect(() => {
      formValidation()
  });



  let studentName = '';
  let studentEmail = '';

  //Event Handlers
  const handleStudentsClick = (
      studentName: string,
      studentEmail: string) => {
          handleClose2();
      }

  function handleCreateClick() {
      getCreateTeamInfo(teamNumber, section, projName, clientName, profName);
      setTeamNumber('')
      setSection('')
      setProjName('')
      setClientName('')
      setProfName('') 
      handleOpen2();
      handleClose();
  }

  function handleTeamNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
      setTeamNumber(event.target.value);
  }

  function handleSectionChange(event: React.ChangeEvent<HTMLInputElement>) {
      setSection(event.target.value);
  }

  function handleProjNameChange(event: React.ChangeEvent<HTMLInputElement>) {
      setProjName(event.target.value);
  }

  function handleClientNameChange(event: React.ChangeEvent<HTMLInputElement>) {
      setClientName(event.target.value);
  }

  function handleProfNameChange(event: React.ChangeEvent<HTMLInputElement>) {
      setProfName(event.target.value);
  }

  function formValidation() {        
      if (teamNumber != '' && teamNumber.match(/^[0-9]+$/) != null
          && section != '' && section.toUpperCase() == section
          && projName != '' 
          && clientName != '' 
          && profName != '')
          setDisabled(false)
      else 
          setDisabled(true)
  }

  function sectionHelperText() {
      if (section == '') {
          return 'This field cannot be empty';
      }
      if (section.toUpperCase() != section) {
          return 'Section code cannot contain lowercase characters';
      }
      return '';
  }

  function teamNumberHelperText() {
      if (teamNumber == '') {
          return 'This field cannot be empty';
      }
      if (teamNumber.match(/^[0-9]+$/) == null) {
          return 'Team number must only contain numbers';
      }
      return '';
  }

  function genericHelperText(input: any) {            
      if (input == '')
          return 'This field cannot be empty'
      else
          return ''
  }

  const handleStudentNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      studentName = event.target.value;
  }

  const handleStudentEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      studentEmail = event.target.value;
  }

  return (
      <div>
          <Button variant="contained" onClick={handleOpen}>
              Create Team
          </Button>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                      Create New Team
                  </Typography>
                  <Typography component={'div'} id="modal-modal-description" sx={{ mt: 2 }}>
                      <TextField 
                          label="Team Number" 
                          id="standard-start-adornment"
                          sx={{ m: 1, width: '25ch' }} 
                          margin="normal" 
                          onChange={handleTeamNumberChange}
                          error={teamNumber == '' || teamNumber.match(/^[0-9]+$/) == null}
                          helperText={teamNumberHelperText()}
                      />
                      <TextField
                          label="Section"
                          id="standard-start-adornment"
                          sx={{ m: 1, width: '25ch' }}
                          margin="normal"
                          onChange={handleSectionChange}
                          error={section == '' || section.toUpperCase() != section}
                          helperText={sectionHelperText()}
                      />
                      <TextField
                          label="Project Name"
                          id="standard-start-adornment"
                          sx={{ m: 1, width: '25ch' }}
                          margin="normal"
                          onChange={handleProjNameChange}
                          error={projName == ''}
                          helperText={genericHelperText(projName)}
                      />
                      <TextField
                          label="Client Name"
                          id="standard-start-adornment"
                          sx={{ m: 1, width: '25ch' }}
                          margin="normal"
                          onChange={handleClientNameChange}
                          error={clientName == ''}
                          helperText={genericHelperText(clientName)}
                      />
                      <TextField
                          label="Professor Name"
                          id="standard-start-adornment"
                          sx={{ m: 1, width: '25ch' }}
                          margin="normal"
                          onChange={handleProfNameChange}
                          error={profName == ''}
                          helperText={genericHelperText(profName)}
                      />
                  </Typography>
                  <Button variant="contained" disabled={disabled} onClick={() => { handleCreateClick() }}>
                      Next
                  </Button>
              </Box>
          </Modal>
          <Modal
              open={open2}
              onClose={handleClose2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                      Enter Student Information
                  </Typography>
                  <Typography component={'div'} id="modal-modal-description" sx={{ mt: 2 }}>
                      {formValues.map((element, index) => (
                      <div>
                          <TextField 
                              label="Student Name" 
                              id="standard-start-adornment"
                              sx={{ m: 1, width: '25ch' }} 
                              margin="normal" 
                              onChange={handleStudentNameChange}
                          />
                          <TextField 
                              label="Student Email" 
                              id="standard-start-adornment"
                              sx={{ m: 1, width: '25ch' }} 
                              margin="normal" 
                              onChange={handleStudentEmailChange}
                          />
                      </div>
                      ))}
                  </Typography>
                  <Button variant="contained" onClick={() => addFormFields()}>Add Student</Button>
                  <Button variant="contained" onClick={() => { handleStudentsClick(studentName, studentEmail) }}>
                      Create Team
                  </Button>
              </Box>
          </Modal>
      </div>
  );
}