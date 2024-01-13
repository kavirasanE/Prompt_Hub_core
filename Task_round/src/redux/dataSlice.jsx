import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("fetchData", async (_, { getState }) => {
    const { currentPage} = getState().data.pages;
    const data = await fetch(`https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=10`);
    return data.json();
  });

const dataSlice = createSlice({
  name: "data",
  initialState: {
    isLoading: false,
    data: [],
    error: false,
    pages: {
      datasPerPage: 10,
      currentPage: 1,
    },
  },
  reducers: {
    onNavigateNext: (state) => {
      state.pages.currentPage +=1;
    },
    onNavigatePrev: (state ) => {
      state.pages.currentPage --;
    },
    onChangeDatasPerPage: (state, action) => {
      state.pages.datasPerPage = action.payload;
    },
    onClickCurrentPage: (state, action) => {
      state.pages.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.error = true;
    });
  },
});



export const { onNavigateNext, onNavigatePrev, onChangeDatasPerPage, onClickCurrentPage } = dataSlice.actions;
export default dataSlice.reducer;
