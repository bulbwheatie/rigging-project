import { RiggingScene } from './types';

export const AREAS = [{
	id: 1,
	name: 'Little Si'
}, {
	id: 2,
	name: 'Steggo Butte'
}]

export const RIGGING_SITES = [{
	id: 1,
	areaId: 1,
	name: 'Practice Rock',
	approach: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	hazards: null,
}, {
	id: 2,
	areaId: 2,
	name: 'Sloping Edge',
	approach: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	hazards: null,
}, {
	id: 3,
	areaId: 2,
	name: 'Twig of Fate',
	approach: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	hazards: null,
}];

export const RIGGING_SCENES = [{
	id: 1,
	siteId: 1,
	name: "Scene #1",
	description: "",
	trainingObjectives: ["novice"],
	type: "HIGH"
}, {
	id: 2,
	siteId: 1,
	name: "Scene #2",
	description: "",
	trainingObjectives: ["rounded edge", "pick-off", "novice"],
	type: "HIGH"
}, {
	id: 3,
	siteId: 1,
	name: "Scene #3",
	description: "",
	trainingObjectives: ["novice", "overhang"],
	type: "HIGH"
}, {
	id: 4,
	siteId: 2,
	name: "Scene #1",
	description: "",
	trainingObjectives: ["hard edge", "overhang"],
	type: "STEEP"
}, {
	id: 5,
	siteId: 2,
	name: "Scene #2",
	description: "",
	trainingObjectives: ["litter", "hard edge"],
	type: "HIGH"
}, {
	id: 6,
	siteId: 3,
	name: "Scene #1",
	description: "",
	trainingObjectives: ["back tie"],
	type: "HIGH"
}, {
	id: 7,
	siteId: 3,
	name: "Scene #1",
	description: "",
	trainingObjectives: ["vertical litter", "hard edge", "overhang"],
	type: "HIGH"
}];



export interface SearchOptions {
	searchTerm: string;
	type: string;
	trainingObjectives: string[];
	matchAcrossSite?: boolean;
}

export const getMatchingSites = (searchOptions: SearchOptions): Record<number, RiggingScene[]> => {
	const matchingScenes = RIGGING_SCENES.filter((scene) => {
		let isTypeMatch = true;
		let isTermMatch = true;
		if (searchOptions.type !== 'ANY') {
			isTypeMatch = scene.type === searchOptions.type;
		}

		if (searchOptions.searchTerm?.length > 0) {
			isTermMatch = scene.name.includes(searchOptions.searchTerm);
		}
		return isTypeMatch && isTermMatch;
	});

	const siteMap: Record<number, RiggingScene[]> = {};
	matchingScenes.forEach((scene) => {
		siteMap[scene.siteId] = siteMap[scene.siteId] != null ? [...siteMap[scene.siteId], scene] : [scene];
	});

	if (searchOptions.trainingObjectives.length > 0) {
		const matchingSites: Record<number, RiggingScene[]> = {};
		Object.entries(siteMap).forEach(([siteId, sceneList]) => {

			// Map each scene to the its objectives
			const objectivesInSite = new Map<string, RiggingScene[]>();
			sceneList.forEach((scene) => {
				scene.trainingObjectives.forEach((objective) => {
					if (searchOptions.trainingObjectives.includes(objective)) {
						objectivesInSite.set(objective, [...objectivesInSite.get(objective) ?? [], scene]);
					}
				});
			});

			// Ensure all objectives are met within scene
			let containsAll = true;
			const scenesWithObjectives = new Set();
			searchOptions.trainingObjectives.forEach((objective) => {
				const scenes = objectivesInSite.get(objective);

				if (scenes == null) {
					containsAll = false;
					return;
				} 

				// Store the scenes that meet at least one objective
				scenes.forEach(scene => scenesWithObjectives.add(scene));
			});

			if (containsAll) {
				matchingSites[siteId] = Array.from(scenesWithObjectives);
			}
		});
		return matchingSites;
	}
	return siteMap;
}