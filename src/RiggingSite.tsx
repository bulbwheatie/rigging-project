import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@mui/material/Typography';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


const EXAMPLE_SITE = {
	id: 1,
	name: 'Practice Rock',
	approach: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	hazards: null,
}

const EXAMPLE_SCENE = {
	id: 1,
	parentSite: 1,
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	objectiveTags: ["edge-transition", "pick-off"],
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    scenes: {
    	padding: "12px 0px"
    },
    accordionHeader: {
    	backgroundColor: 'lightsteelblue'
    },
    accordionBody: {
    	backgroundColor: 'white'
    },
    tags: {
    	margin: '4px 0px 4px 4px'
    }
  }),
);

// TODO: make this a class to store local state
function RiggingSite() {
	const classes = useStyles();
	const site = EXAMPLE_SITE;

	return (<div> 
		<Typography variant="h2" noWrap component="div">{site.name}</Typography>
		<Typography variant="h3" noWrap component="div">Description</Typography>
		<Typography variant="body1" component="div">{site.description}</Typography>

		<Typography variant="h3" noWrap component="div">Approach</Typography>
		<Typography variant="body1" component="div">{site.approach}</Typography>

		<Box className={classes.scenes}>
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordionHeader} >
					<Typography variant="h4">Scene #1</Typography>
					<Chip className={classes.tags} label="rounded edge" size="small"/>
					<Chip className={classes.tags} label="pick-off" size="small"/>
				</AccordionSummary>
				<AccordionDetails className={classes.accordionBody}>
		          <Typography variant="body1">
		            {EXAMPLE_SCENE.description}
		          </Typography>
		        </AccordionDetails>
			</Accordion>

			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordionHeader}>
					<Typography variant="h4">Scene #2</Typography>
					<Chip className={classes.tags} label="novice" size="small"/>
					<Chip className={classes.tags} label="general high angle" size="small"/>
				</AccordionSummary>
				<AccordionDetails className={classes.accordionBody}>
		          <Typography variant="body1">
		            {EXAMPLE_SCENE.description}
		          </Typography>
		        </AccordionDetails>
			</Accordion>

			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordionHeader}>
					<Typography variant="h4">Scene #3</Typography>
					<Chip className={classes.tags} label="overhang" size="small"/>
				</AccordionSummary>
				<AccordionDetails>
		          <Typography variant="body1" className={classes.accordionBody}>
		            {EXAMPLE_SCENE.description}
		          </Typography>
		        </AccordionDetails>
			</Accordion>
		</Box>
	</div>)
}

export default RiggingSite