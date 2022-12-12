import React from 'react'
import { RIGGING_SITES, RIGGING_SCENES } from './data'
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
import { makeObservable, observable } from 'mobx';

class TrainingSearchStore {
	type: string = 'any';
	searchTerm: string| null = null;
	objectives: string[] = [];

	constructor() {
		makeObservable(this);
	}

	
	@observable
	setType(newType: string) {
		this.type = newType;
	}

	setSearchTerm(term: string) {
		this.searchTerm = term;
	}

	setObjectives(newObjs: string[]) {
		this.objectives = newObjs;
	}
}


const TYPE_OPTIONS = [
	'Steep angle',
	'High angle',
	'Snow',
	'Highline'
];

const TrainingList = () => {
	const store = new TrainingSearchStore();
	return <_TrainingList store={store} />
}

const _TrainingList = observer(({store}) => {
	return (<div>
		<Box >
			<SearchBar term={store.searchTerm} setSearchTerm={store.setSearchTerm} />
			<TypeMenuSelector store={store} />
			<ObjectivesMenuSelector objectives={store.objectives} setObjectives={store.setObjectives} />
		</Box>
		{store.type}
		{store.searchTerm}
		{store.objectives}
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

function SearchBar({term, setSearchTerm}) {
	return (
		<Paper elevation={2} sx={{width: '240px'}}>
			<InputBase
				sx={{ ml: 1 }}
				placeholder="Search by name"
			/>
			<IconButton type="button" sx={{ p: '10px' }} aria-label="search">
				<SearchIcon />
			</IconButton>
		</Paper>
	)
}

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
    <MenuItem value={'any'}>Any</MenuItem>
    <MenuItem value={'steep'}>Steep Angle</MenuItem>
    <MenuItem value={'high'}>High Angle</MenuItem>
    <MenuItem value={'snow'}>Snow</MenuItem>
    <MenuItem value={'highline'}>High Line</MenuItem>
  </Select>
	);
});


const AVAILABLE_TAGS = ['hard edge', 'vertical litter', 'sloping edge'];
function ObjectivesMenuSelector({objectives, setObjectives}) {
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
	/>);
}

export default TrainingList;