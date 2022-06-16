import React from "react";

const TableGrid = () => {
  const flexboxes = () => {
    let i = 0;
    const boxes = [];
    while (i < 12) {
        console.log('ere')
        
      boxes.push(<div></div>);
      i++;
    }
    console.log("boxes",boxes)
    return boxes;
  };
  return <div className="gridLines">{flexboxes()}</div>;
};

export default TableGrid;
