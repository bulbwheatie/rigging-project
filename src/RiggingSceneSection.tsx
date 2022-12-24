
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';
import { RiggingScene } from './types'


interface Props {
	scene: RiggingScene
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

export const RiggingSceneSection = ({ scene }: Props) => {
	const classes = useStyles();
	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordionHeader} >
				<Typography variant="h4">{scene.name}</Typography>
				{scene.trainingObjectives.map((tag, i) => {
					return (<Chip key={i} className={classes.tags} label={tag} size="small"/>)
				})}
			</AccordionSummary>
			<AccordionDetails className={classes.accordionBody}>
	          <Typography variant="body1">
	            {scene.description}
	          </Typography>
	        </AccordionDetails>
		</Accordion>
	);
}