export const allowedNoteTypes = ['all', 'starred', 'trash'] as const;
export type NoteType = typeof allowedNoteTypes[number];
