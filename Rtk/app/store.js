const { postReducer } = require("../features/singlePost/singlePost");
const { configureStore } = require("@reduxjs/toolkit");
const { relatedPostsReducer } = require("../features/relatedPosts");

const store = configureStore({
  reducer: {
    post: postReducer,
    relatedPost: relatedPostsReducer,
  },
});

module.exports = store;
