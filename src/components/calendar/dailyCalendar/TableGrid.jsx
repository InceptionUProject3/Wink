import React from "react";

const TableGrid = () => {
  const flexboxes = () => {
    let i = 0;
    const boxes = [];
    while (i < 12) {
      let color
      const findstyle = (i) => {
        if ((i+1) % 2 === 0) {
          return color={ backgroundColor: "rgba(230, 235, 230, 0.15)" };
        }
      };
      findstyle(i);

      boxes.push(<div  style={color}></div>);
      i++;
    }
    // console.log("boxes",boxes)
    return boxes;
  };
  return <div className="gridLines">{flexboxes()}</div>;
};

export default TableGrid;
