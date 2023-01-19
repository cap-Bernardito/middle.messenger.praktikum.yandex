import { useSelector } from "app/store";

import { _ } from "shared/utils";
import { connect } from "shared/utils/connect";

import { TUserState } from "./store";

export const setUser = (data: Partial<TUserState>) => _.set<Partial<{ auth: TUserState }>>({}, "auth", data);

export const selectUser = <T = TUserState>() => <T>useSelector((state) => state.auth);

export const withAuth = connect((state) => ({
  authError: state.auth.error,
  authLoading: state.auth.loading,
  authUser: state.auth.user,
}));
