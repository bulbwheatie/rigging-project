export interface RiggingScene {
	id: number;
	siteId: number;
	name: string;
	description: string;
	trainingObjectives: string[];
	hazards?: string[];
	type: string; // TODO: create string union
}
