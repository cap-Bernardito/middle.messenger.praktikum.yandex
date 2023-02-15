import { useSelector } from "app/store";

import { _ } from "shared/utils";

import { TSearchUsersState } from "./store";

const setSearchUsers = (data: Partial<TSearchUsersState>) =>
  _.set<Partial<{ chats: TSearchUsersState }>>({}, "searchUsers", data);

const selectSearchUsers = <T = TSearchUsersState>() => <T>useSelector((state) => state.searchUsers);

export const searchUsersLib = {
  setSearchUsers,
  selectSearchUsers,
};
