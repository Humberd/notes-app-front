import { NameModel } from '@domain/common/name-model';

export interface NotePatchRequest {
  title?: string;
  url?: string;
  content?: string;
  tags?: NameModel[];
}
