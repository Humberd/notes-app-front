import { UserMinimalView } from '@domain/entity/user/view/user-minimal-view';

export interface GroupView {
  id: string,
  name: string,
  iconUrl: string,
  members: UserMinimalView[]
}
