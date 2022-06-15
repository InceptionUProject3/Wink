const findMy = (arr, myProfile) => {
  // console.log("findMy",myProfile, arr)
  const currentUserData = arr?.filter((e) => e.userId === myProfile.userId);
  return currentUserData;
};

export default findMy;
