const store = require("./app/store");
const { fetchSinglePost } = require("./features/singlePost/singlePost");
store.subscribe(() => {
  // console.log(store.getState());
});

// dispatch actions
store.dispatch(fetchSinglePost(100));
