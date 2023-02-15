import { searchUsersLib } from "widgets/list-with-search-users/model/lib";
import { searchUsersState } from "widgets/list-with-search-users/model/store";

export const resetSearchUsers: DispatchStateHandler<null> = async (dispatch) => {
  dispatch(searchUsersLib.setSearchUsers({ ...searchUsersState }));
};
