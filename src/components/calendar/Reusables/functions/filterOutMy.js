/** The filterOutMy methods must return a Promise. */
const filterOutMy = (arr, myProfile) => {
  const currentUserData = arr?.filter((e) => e.userId !== myProfile.userId);
  return currentUserData;
};


/** It's part of the ES6 module system thats defines a default export. In the case of Wink project filterOutMy. */
export default filterOutMy;