import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filteredUsers: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filter_users(state, action) {
      const { users, search } = action.payload;
      const tempUsers = users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(search.toLowerCase()) ||
          user.lastName.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredUsers = tempUsers;
    },
  },
});

export const { filter_users } = filterSlice.actions;
export const selectUsers = (state) => state.filter.filteredUsers;

export default filterSlice.reducer;
