import React from 'react'
import { RIGGING_SITES, getMatchingSites } from './data';
import { RiggingScene } from './types';
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import InputBase from '@mui/material/InputBase';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { observer } from 'mobx-react';
import { makeObservable, observable, action, computed } from 'mobx';

class TrainingSearchStore {

	@observable type: string = 'ANY';
	@observable searchTerm: string = '';
	@observable objectives: string[] = [];

	constructor() {
		makeObservable(this);
	}

	
	@action
	setType(newType: string) {
		this.type = newType;
	}

	@action
	setSearchTerm(term: string) {
		this.searchTerm = term;
	}

	@action
	setObjectives(newObjs: string[]) {
		this.objectives = newObjs;
	}

	@computed
	get sites(): Record<number, RiggingScene[]> {
		return getMatchingSites({
			searchTerm: this.searchTerm,
			type: this.type,
			trainingObjectives: this.objectives,
		});
	}
}


const TrainingList = () => {
	const store = new TrainingSearchStore();
	return <_TrainingList store={store} />
}

const _TrainingList = observer(({store}) => {
	return (<div>
		<Box >
			<SearchBar store={store} />
			<TypeMenuSelector store={store} />
			<ObjectivesMenuSelector store={store} />
		</Box>
		<Box>
			<ListOfSites store={store} />
		</Box>
	</div>);
});


const ListOfSites = observer(({store}) => {
	return(<div>
		{Object.entries(store.sites).map((site, i) => {
			const scenes = site[1] as RiggingScene[];
			const siteId = site[0];
			return (<MatchingSite key={i} scenes={scenes} siteId={parseInt(siteId)} tags={store.objectives} />)
		})}
	</div>)
});

const MatchingSite = (({ scenes, siteId, tags} : {scenes: RiggingScene[], siteId: number, tags: string[]}) =>  {
	const siteMatch = RIGGING_SITES[siteId -1]; // TODO: fix this indexing
	return(<Box sx={{p: '8px'}}>
		<Link href={`/site/${siteMatch.id}`}><Typography variant='body1'>{siteMatch.name}</Typography></Link>
		<Box sx={{p: '4px 12px'}}>
			{scenes.map((scene, i)=>{
				return(<Box sx={{pt: '4px'}} key={i}>
					<Typography variant='body2' component="span">{scene.name}</Typography>
					<Box sx={{pl: '4px'}} component="span">
					{scene.trainingObjectives.map((tag, i) => {
						return (<Chip key={i} sx={{ml: '4px'}} color={tags.includes(tag) ? 'primary' : 'default'} label={tag} size="small"/>);
					})}
					</Box>
				</Box>)
			})}
		</Box>
	</Box>);
});

const SearchBar = observer(({store}) => {
	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		store.setSearchTerm(event.target.value);
	}

	return (
		<Paper elevation={2} sx={{width: '240px'}}>
			<InputBase
				sx={{ ml: 1 }}
				placeholder="Search by name"
				onChange={handleChange}
			/>
			<IconButton type="button" sx={{ p: '10px' }} aria-label="search">
				<SearchIcon />
			</IconButton>
		</Paper>
	)
});

const TypeMenuSelector = observer(({store}) => {
  const handleChange = (event: SelectChangeEvent) => {
    store.setType(event.target.value as string);
  };

	return (
	  <Select
	    labelId="type-select-label"
	    id="type-select"
	    value={store.type}
	    label="Type"
	    onChange={handleChange}
	    sx={{width: '240px'}}
	  >
	    <MenuItem value={'ANY'}>Any</MenuItem>
	    <MenuItem value={'STEEP'}>Steep Angle</MenuItem>
	    <MenuItem value={'HIGH'}>High Angle</MenuItem>
	    <MenuItem value={'SNOW'}>Snow</MenuItem>
	    <MenuItem value={'HIGHLINE'}>High Line</MenuItem>
	  </Select>
	);
});


const AVAILABLE_TAGS = ['hard edge', 'vertical litter', 'rounded edge', 'novice', 'overhang'];
const ObjectivesMenuSelector = observer(({store}) => {
	const handleChange = (_event, value) => {
		store.setObjectives(value);
	}

	return (<Autocomplete
	  multiple
	  limitTags={3}
	  id="multiple-limit-tags"
	  options={AVAILABLE_TAGS}
	  getOptionLabel={(option) => option}
	  renderInput={(params) => (
	    <TextField {...params} label="Training Objectives"  />
	  )}
	  sx={{ width: '500px' }}
	  onChange={handleChange}
	/>);
});

export default TrainingList;