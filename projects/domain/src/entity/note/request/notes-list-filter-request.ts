import { PageableRequest } from '@domain/common/pageable-request';

export interface NotesListFilterRequest extends PageableRequest {
  query?: string;
  url?: string
  tagIds?: string[];
  workspaceId?: string;
}
