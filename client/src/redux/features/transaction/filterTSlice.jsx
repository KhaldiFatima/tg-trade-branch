import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filteredTrans: [],
};

const filterTSlice = createSlice({
  name: 'filterTrans',
  initialState,
  reducers: {
    FILTER_TRANS(state, action) {
      const { transactions, search } = action.payload;
      const tempTrans = transactions.filter(
        (transaction) =>
          transaction.type.toLowerCase().includes(search.toLowerCase()) ||
          transaction.status.toLowerCase().includes(search.toLowerCase())
      );
      // const tempUsers = users.filter((usersTrans) => {
      //   tempTrans.filter((tempTran) => tempTran.userId === usersTrans.id);
      // });
      // console.log(tempUsers);
      // const tempUsersTr = tempUsers.filter(
      //   (user) =>
      //     user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      //     user.lastName.toLowerCase().includes(search.toLowerCase())
      // );

      state.filteredTrans = tempTrans;
    },
  },
});

export const { FILTER_TRANS } = filterTSlice.actions;
export const selectTransactions = (state) => state.filterTrans.filteredTrans;

export default filterTSlice.reducer;
