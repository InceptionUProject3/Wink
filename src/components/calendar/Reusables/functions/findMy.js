/** The findMy methods must return a Promise. */
const findMy = (arr, myProfile) => {
  // console.log("findMy",myProfile, arr)
  const currentUserData = arr?.filter((e) => e.userId === myProfile.userId);
  return currentUserData;
};

/** It's part of the ES6 module system thats defines a default export. In the case of Wink project findMy. */
export default findMy;