<<<<<<< HEAD
/** The findMy methods must return a Promise. */
const findMy = (arr, myProfile) => {
=======
const findMy = (arr, currentUserId) => {
>>>>>>> main
  // console.log("findMy",myProfile, arr)
  const currentUserData = arr?.filter((e) => e.userId === currentUserId);
  return currentUserData;
};

/** It's part of the ES6 module system thats defines a default export. In the case of Wink project findMy. */
export default findMy;