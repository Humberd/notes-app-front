import { NameModel } from '@domain/common/name-model';

export interface NoteCreateRequest {
  title: string;
  url?: string;
  content?: string;
  tags?: NameModel[];
}
