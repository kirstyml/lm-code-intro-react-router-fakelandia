import { MISDEMEANOURS, MisdemeanourKind } from "../types/misdemeanours.types";

export const reasons = ["", ...MISDEMEANOURS, "talk"] as const;
export type reasonOptions = (typeof reasons)[number];