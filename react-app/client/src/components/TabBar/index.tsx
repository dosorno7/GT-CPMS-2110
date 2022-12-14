import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({value}: any) {
  //const [value, setValue] = React.useState(0);
  let history = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    value = newValue;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Teams" {...a11yProps(0)} value={0} onClick={() => {history('/HomePage')}} />
          <Tab label="Clients" {...a11yProps(1)} value={1} onClick={() => {history('/ClientPage/')}} />
          <Tab label="Projects" {...a11yProps(2)} value={2} onClick={() => {history('/ProjectsPage/')}} />
        </Tabs>
      </Box>
    </Box>
  );

}
