import { MISDEMEANOURS, MisdemeanourKind } from "../types/misdemeanours.types";

export const reasons = ["", ...MISDEMEANOURS, "just-talk"] as const;
export type reasonOptions = (typeof reasons)[number];