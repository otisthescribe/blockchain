import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { CircularProgress } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import HotelIcon from '@mui/icons-material/Hotel';
import MoneyIcon from '@mui/icons-material/Money';
import SellIcon from '@mui/icons-material/Add';

import { RoomsFree } from './RoomsFree';



import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from '@drizzle/store'
import Hotel from './contracts/Hotel.json';
import { AddRoom } from './AddRoom';

const drizzleOptions = { 
  contracts: [
    Hotel
  ],
  web3: {
    fallback: {
      type: 'ws',
      url: 'ws://localhost:7545'
    }
  }
};

const drizzle = new Drizzle(drizzleOptions);



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href=".">
        SmartHotel
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();


// class DashboardContentEEE extends React.Component {
//   state = {
//     renderView: 0
//   };

//   changePage(pageId) {
//     this.setState({
//       renderView: pageId
//     });
//   }
//   render() {}
// }

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [renderViewId, setRenderViewId] = React.useState(0);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              SmartHotel
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <React.Fragment>
              <ListItemButton onClick={() => setRenderViewId(0)}>
                <ListItemIcon>
                  <HotelIcon />
                </ListItemIcon>
                <ListItemText primary="Book a room" />
              </ListItemButton>
            </React.Fragment>

            <Divider sx={{ my: 1 }} />

            <React.Fragment>
              <ListSubheader component="div" inset>
                Sellers
              </ListSubheader>
              <ListItemButton onClick={() => setRenderViewId(2)}>
                <ListItemIcon>
                  <SellIcon />
                </ListItemIcon>
                <ListItemText primary="Add room" />
              </ListItemButton>
            </React.Fragment>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <DrizzleContext.Provider drizzle={drizzle}>
            <DrizzleContext.Consumer>
              {drizzleContext => {
                const {drizzle, drizzleState, initialized} = drizzleContext;

                if(!initialized) {
                  return (
                    <React.Fragment>
                      <Table size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell align='center'>
                              <CircularProgress />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align='center'>
                              Waiting for MetaMask connection
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </React.Fragment>
                  )
                }

                switch (renderViewId) {
                  case 0:
                    return (
                      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                          {/* Apartments list */}
                          <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                              <RoomsFree drizzle={drizzle} drizzleState={drizzleState} />
                            </Paper>
                          </Grid>
                        </Grid>
                        <Copyright sx={{ pt: 4 }} />
                      </Container>
                    )
                  case 2:
                    return (
                      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                          {/* Apartments list */}
                          <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                              <AddRoom drizzle={drizzle} drizzleState={drizzleState} />
                            </Paper>
                          </Grid>
                        </Grid>
                        <Copyright sx={{ pt: 4 }} />
                      </Container>
                    )
                  default:
                    return (
                      <React.Fragment>
                        <Table size="small">
                          <TableBody>
                            <TableRow>
                              <TableCell align='center'>
                                Page not found!
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </React.Fragment>
                    )
                }
              }}
            </DrizzleContext.Consumer>
          </DrizzleContext.Provider>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
