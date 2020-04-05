import { UserMinimalView } from '../../user/view/user-minimal-view';
import { TagMinimalView } from '../../tag/view/tag-minimal-view';

export interface NoteView {
  id: string;
  author: UserMinimalView;
  url?: string;
  title: string;
  content?: string;
  tags: TagMinimalView[];
  createdAt: number;
  updatedAt: number;
}
