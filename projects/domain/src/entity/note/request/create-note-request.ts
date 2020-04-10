import { NameModel } from '@domain/common/name-model';

export interface CreateNoteRequest {
  title: string;
  url?: string;
  content?: string;
  tags?: NameModel[];
}
