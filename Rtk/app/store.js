const { postReducer } = require("../features/singlePost/singlePost");
const { configureStore } = require("@reduxjs/toolkit");
const { relatedPostsReducer } = require("../features/relatedPosts");
const { default: logger } = require("redux-logger");

const store = configureStore({
  reducer: {
    post: postReducer,
    relatedPost: relatedPostsReducer,
  },
  middleware: (dm) => dm().concat(logger)
});

module.exports = store;
