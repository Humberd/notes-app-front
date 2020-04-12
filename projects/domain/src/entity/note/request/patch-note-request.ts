import { NameModel } from '@domain/common/name-model';

export interface PatchNoteRequest {
  title?: string;
  url?: string;
  content?: string;
  tags?: NameModel[];
}
