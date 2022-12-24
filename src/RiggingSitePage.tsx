import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@material-ui/core/Grid';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { RIGGING_SITES, RIGGING_SCENES } from './data'
import { RiggingSceneSection } from './RiggingSceneSection';
import { RiggingScene } from './types';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";

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

function RiggingSitePage() {
	const { siteId } = useParams();
	const classes = useStyles();

	const site = RIGGING_SITES.find((site) => {
		return site.id === Number(siteId);
	});

	if (site == null) {
		return <div>Site not found</div>
	}

	const scenes = RIGGING_SCENES.filter((scene) => {
		return scene.siteId === Number(siteId);
	});

	return (<div> 
		<Typography variant="h2" noWrap component="div">{site.name}</Typography>
		<Typography variant="h3" noWrap component="div">Description</Typography>
		<Typography variant="body1" component="div">{site.description}</Typography>

		<Typography variant="h3" noWrap component="div">Approach</Typography>
		<Typography variant="body1" component="div">{site.approach}</Typography>

		<Box className={classes.scenes}>
			{scenes.map((scene, i) => {
				return (<RiggingSceneSection key={i} scene={scene} />)
			})}
		</Box>
	</div>)
}

export default RiggingSitePage