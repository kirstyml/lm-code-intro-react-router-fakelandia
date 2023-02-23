import { reasonOptions } from "../types/reasons.types";

export interface ConfessionData {
    subject: string,
    reason: reasonOptions,
    details: string
}

export type ConfessionChangeHandler = <TKey extends keyof ConfessionData>(
	value: ConfessionData[TKey],
	name: TKey
) => void;

export type ConfessionResponse = {
    success: boolean, 
    justTalked?: boolean, // true if this was just wanting to talk, false for a real confession. Not present if success is false.
    message: string
}