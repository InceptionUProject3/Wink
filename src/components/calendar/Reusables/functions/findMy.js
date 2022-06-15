const findMy = (arr, currentUserId) => {
  // console.log("findMy",myProfile, arr)
  const currentUserData = arr?.filter((e) => e.userId === currentUserId);
  return currentUserData;
};

export default findMy;
