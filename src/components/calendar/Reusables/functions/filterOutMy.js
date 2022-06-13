const filterOutMy = (arr, myProfile) => {
  const currentUserData = arr?.filter((e) => e.userId !== myProfile.userId);
  return currentUserData;
};

export default filterOutMy;
