import React from 'react';
import logo from './logo.svg';
import './App.css';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import LandscapeIcon from '@mui/icons-material/Landscape';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { RIGGING_SITES } from './data';

// TODO: switch to emotion styled
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Chip from '@mui/material/Chip';

import RiggingSite from './RiggingSite';
import TrainingList from './TrainingList';

const theme = createTheme({
  typography: {
    h2: {
      fontSize: '40px',
      color: 'black',
      fontWeight: '500',
      lineHeight: '1.5em',
    },
    h3: {
      fontSize: '28px',
      color: 'black',
      lineHeight: '1.5em',
    },
    h4: {
      fontSize: '22px',
      color: 'black',
      lineHeight: '1.5em',
    },
    body1: {
      color: '#555'
    }
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '12px',
      lineHeight: '1.5em',
    },
    body: {
      margin: "24px"
    },
    listRow: {
      width: "100%",
      display: 'flex'
    },
    navBar: {
      fontSize: '22px',
      color: 'white'
    },
  }),
);

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
        <CssBaseline />

        <AppBar position="fixed">
          <Toolbar>
            <div className={classes.navBar}>
              Rigging Project
            </div>
          </Toolbar>
        </AppBar>

        <Toolbar />
        <Box className={classes.body}>
          {/*<RiggingSite />*/}
          <RiggingSite />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

function SiteItem(props: any) {
  const classes = useStyles();

  const { site } = props;
  return (
    <div>
      <LandscapeIcon/>
      <Typography variant="h5" component="a">{site.name}</Typography>
      {site.tags.map((tag: string) => (<Chip key={tag} size="small" label={tag} />))}
      <Typography variant="subtitle1">{site.subtitle}</Typography>
    </div>
  );
}

export default App;


