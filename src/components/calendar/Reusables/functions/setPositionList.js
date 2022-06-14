const setPositionList = (data) => {
  let positionLists = [];

  data?.forEach((prof) => {
    // console.log(typeof prof);
    typeof prof === 'object' ? positionLists.push(prof.position): positionLists=data;
  });
  const positionList = Array.from(new Set(positionLists));
  // console.log("positions", positionList)
  //color list
  const colorList = ["860E2B", "6E3CDA", "D87400", "0070D8", "50B700"];

  let newPositonArray = [];
  positionList?.forEach((pos, i) => {
    if (colorList[i]) {
      newPositonArray.push({ position: pos, color: colorList[i] });
    } else {
      newPositonArray.push({
        position: pos,
        color: colorList[i % colorList.length],
      });
    }
  });
  // console.log("newarray", newPositonArray);
  return newPositonArray;
};

export default setPositionList;
