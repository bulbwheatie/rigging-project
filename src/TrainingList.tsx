import React from 'react'
import { getMatchingSites } from './data'
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
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
	get sites() {
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
			<div>{store.type}</div>
			<div>{store.searchTerm}</div>
			<div>{JSON.stringify(store.objectives)}</div>
			<pre>{JSON.stringify(store.sites, null, 2)}</pre>
		</Box>
	</div>);
});


function ListOfSites() {
	const matchingSite = {
		title:'practice rock',

	}
	return(<div>
		Matching sites

	</div>)
}

interface SiteMatch {
	title: string;
	scenes: {
		title: string;
		objectiveTags: string[];
	}[];
}

function MatchingSite({ siteMatch }: {siteMatch: SiteMatch}) {
	return(<div>
		{siteMatch.title}
		{siteMatch.scenes.map((scene)=>{
			return(<div>{scene.title}</div>)
		})}
	</div>);
}

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


const AVAILABLE_TAGS = ['hard edge', 'vertical litter', 'sloping edge', 'novice', 'overhang'];
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