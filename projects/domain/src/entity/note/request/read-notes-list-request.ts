import { PageableRequest } from '@domain/common/pageable-request';

export interface ReadNotesListRequest extends PageableRequest {
  query?: string;
  url?: string
  tagIds?: string[];
}
