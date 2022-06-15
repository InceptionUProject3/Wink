const filterOutMy = (arr, currentUserId) => {
  const currentUserData = arr?.filter((e) => e.userId !== currentUserId);
  return currentUserData;
};

export default filterOutMy;
