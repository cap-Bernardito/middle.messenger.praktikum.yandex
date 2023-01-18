import { useSelector } from "app/store";

import { _ } from "shared/utils/utils";

import { TUserState } from "./store";

export const setUser = (data: Partial<TUserState>) => _.set<Partial<{ auth: TUserState }>>({}, "auth", data);

export const selectUser = <T = TUserState>() => <T>useSelector((state) => state.auth);
