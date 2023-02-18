export const MISDEMEANOURS = [
	'rudeness',
	'vegetables',
	'lift',
	'united',
] as const;
export type MisdemeanourKind = (typeof MISDEMEANOURS)[number];

export const JUST_TALK = 'just-talk';
export type JustTalk = typeof JUST_TALK;

export const YOUR_ID = 'YOU!';
export type YourId = typeof YOUR_ID;

export type Misdemeanour = {
	citizenId: number | YourId;
	misdemeanour: MisdemeanourKind;
	date: string; // we'll stringify this for easy sending via HTTP rather than storing the full Date object
};
