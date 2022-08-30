const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

// initial state
const initialState = {
  loading: false,
  posts: [],
  error: "",
};

const fetchRelatedPosts = createAsyncThunk(
  "fetch/relatedPosts",
  async (query) => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?${query}`
    );
    return data;
  }
);

const relatedPostsSlice = createSlice({
  name: "relatedPosts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRelatedPosts.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(fetchRelatedPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.error = "";
    });

    builder.addCase(fetchRelatedPosts.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.error.message;
    });
  },
});

const relatedPostsReducer = relatedPostsSlice.reducer;
const relatedPostsActions = relatedPostsSlice.actions;

module.exports = {
  relatedPostsReducer,
  relatedPostsActions,
  fetchRelatedPosts,
};
