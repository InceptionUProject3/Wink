const filterOutMy = (arr, myProfile) => {
  const currentUserData = arr?.filter((e) => e.UserId !== myProfile.UserId);
  return currentUserData;
};

export default filterOutMy;

// ytetetetete