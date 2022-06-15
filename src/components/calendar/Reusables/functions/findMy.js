/** The findMy methods must return a Promise. */
const findMy = (arr, myProfile) => {
  const currentUserData = arr?.filter((e) => e.UserId === myProfile.UserId);
  return currentUserData;
};

/** It's part of the ES6 module system thats defines a default export. In the case of Wink project findMy. */
export default findMy;