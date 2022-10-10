import * as React from 'react';
import { Button, Box } from '@mui/material';
import RemoveClientModal from '../RemoveClientModal/RemoveClientModal';
import { DataGrid, GridColDef, GridRowId, gridClasses } from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';

import './ClientGrid.css';

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        borderRight: `1px solid ${theme.palette.mode === 'dark' ? '#f0f0f0' : '#303030'
            }`,
    },
    '& .MuiDataGrid-iconSeparator': {
        display: 'none',
    },
    [`& .${gridClasses.row}.even`]: {
        backgroundColor: theme.palette.grey[200],
        '&:hover, &.Mui-hovered': {
            backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
        '&.Mui-selected': {
            backgroundColor: alpha(
                theme.palette.primary.main,
                ODD_OPACITY + theme.palette.action.selectedOpacity,
            ),
            '&:hover, &.Mui-hovered': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY +
                    theme.palette.action.selectedOpacity +
                    theme.palette.action.hoverOpacity,
                ),
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        ODD_OPACITY + theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    },
}));

const clientColumns: GridColDef[] = [
    {   
        field: 'teamsAssigned', 
        headerName: 'Team Assigned', 
        width: 150,
        headerAlign: 'center',
        headerClassName: 'super-app-theme--header',
        align: 'center', 
    },
    {
        field: 'section',
        headerName: 'Section',
        width: 150,
        headerAlign: 'center',
        headerClassName: 'super-app-theme--header',
        align: 'center', 
        
    },
    {
        field: 'project',
        headerName: 'Project',
        width: 250,
        headerAlign: 'center',
        headerClassName: 'super-app-theme--header',
        align: 'center', 
        flex: 1,
    },
    {
        field: 'client',
        headerName: 'Client',
        width: 250,
        headerAlign: 'center',
        headerClassName: 'super-app-theme--header',
        align: 'center', 
        flex: 1,
    },
    {
        field: 'contact',
        headerName: 'Contact Information',
        width: 250,
        headerAlign: 'center',
        headerClassName: 'super-app-theme--header',
        align: 'center', 
    },
];

const clientRows = [
    { id: 1, teamsAssigned: 2100, section: 'JDA', project: 'G.O.L.I.A.T.H.', client: 'Tony Stark', contact: 'tstark@me.com'},
    { id: 2, teamsAssigned: 2101, section: 'JDA', project: 'Helius', client: 'Carol Denvers', contact: 'cdanvers@aol.com' },
    { id: 3, teamsAssigned: 2102, section: 'JDA', project: 'Insight', client: 'Peter Parker', contact: 'pparker@gmail.com' },
    { id: 4, teamsAssigned: 2103, section: 'JDA', project: 'Reclamation', client: 'Stephen Strange', contact: 'drstrange@yahoo.com' },
    { id: 5, teamsAssigned: 2104, section: 'JDA', project: 'Phase 2', client: 'Peter Quill', contact: 'NA' },
    { id: 6, teamsAssigned: 2105, section: 'JDF', project: 'Avengers Initiative', client: 'Steve Rogers', contact: 'cap@gmail.com' },
    { id: 7, teamsAssigned: 2106, section: 'JDF', project: 'Blizzard', client: 'Bucky Barnes', contact: 'wsbarnes@yahoo.com' },
    { id: 8, teamsAssigned: 2107, section: 'JDF', project: 'Pegasus', client: 'Bruce Banner', contact: 'banner@starkcorp.com' },
    { id: 9, teamsAssigned: 2108, section: 'JIA', project: 'Venom', client: 'Eddie Brock', contact: 'symbrock@hotmail.com' },
    { id: 10, teamsAssigned: 2109, section: 'JIA', project: 'Project Alpha', client: 'Pepper Potts', contact: 'pottsceo@starkcorp.comm' },
    { id: 11, teamsAssigned: 2110, section: 'JIA', project: 'Phase 4', client: 'Nick Fury', contact: 'NA' },
];

export default function ClientGrid() {
    const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([]);
    const [rows, setRows] = React.useState(() => clientRows);

    const deleteClients = () => {
        setRows((rows) => rows.filter((r) => !selectionModel.includes(r.id)));
    };

    return (
        <div className="main_content">
            <div className="top_buttons">
                <Button variant="contained" onClick={() => {
                    // TODO: Handle Create Team click here
                    console.log('create client clicked')
                }}
                >
                    Create Client
                </Button>

                <Button variant="contained" onClick={() => {
                    // TODO: Handle import from excel click here
                    console.log('import from excel clicked')
                }}
                >
                    Import From Excel
                </Button>   
                {/* TODO: Filtering goes here! */}
            </div>

            <Box 
                sx={{ 
                    height: 500, 
                    width: '100%',
                    '& .super-app-theme--header': {
                        backgroundColor: 'rgba(0,0,0,0)',
                    }, 
                }}>
                <StripedDataGrid
                    rows={rows}
                    columns={clientColumns}
                    pageSize={11}
                    rowsPerPageOptions={[11]}
                    checkboxSelection
                    experimentalFeatures={{ newEditingApi: true }}
                    selectionModel={selectionModel}
                    onSelectionModelChange={setSelectionModel}
                    sx = {{
                        border: 2
                    }}
                    getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                    }
                />
            </Box>

            <div className="bottom_buttons">
                <div className="bottom_buttons_group">
                    <Button variant="contained" onClick={() => {
                        // TODO: Handle click here
                        console.log('copy emails clicked')
                    }}
                    >
                        Copy Emails to Clipboard
                    </Button>

                    <Button variant="contained" onClick={() => {
                        // TODO: Handle click here
                        console.log('export to excel clicked')
                    }}
                    >
                        Export to Excel
                    </Button>
                </div>

                <div className="bottom_buttons_group">
                    <Button variant="contained" onClick={() => {
                        // TODO: Handle click here
                        console.log('manage client clicked')
                    }}
                    >
                        Manage Selected Client
                    </Button>
                    <RemoveClientModal deleteClients={deleteClients}/>
                </div>
            </div>
        </div>
    );
};