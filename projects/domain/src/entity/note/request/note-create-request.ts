import { NameModel } from '@domain/common/name-model';
import { IdModel } from '@domain/common/id-model';

export interface NoteCreateRequest {
  title: string;
  url?: string;
  content?: string;
  tags?: NameModel[];
  workspaces?: IdModel[];
}
