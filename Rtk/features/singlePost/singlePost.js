const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
const store = require("../../app/store");
const { fetchRelatedPosts } = require("../relatedPosts");

// initial state
const initialState = {
  loading: false,
  post: {},
  error: "",
};

const fetchSinglePost = createAsyncThunk(
  "fetch/singlePost",
  async (id, { dispatch }) => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const { title } = data;
    const titleArray = title.split(" ").map((title) => `title_like=${title}`);
    const query = titleArray.join("&");
    dispatch(fetchRelatedPosts(query));
    return data;
  }
);

const postSlice = createSlice({
  name: "singlePost",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSinglePost.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(fetchSinglePost.fulfilled, (state, action) => {
      state.loading = false;
      state.post = action.payload;
      state.error = "";
    });

    builder.addCase(fetchSinglePost.rejected, (state, action) => {
      state.loading = false;
      state.post = {};
      state.error = action.error.message;
    });
  },
});

const postReducer = postSlice.reducer;
const postActions = postSlice.actions;

module.exports = { postReducer, postActions, fetchSinglePost };
