export type ConfessionResponse = {
    success: boolean, 
    justTalked?: boolean, // true if this was just wanting to talk, false for a real confession. Not present if success is false.
    message: string
}