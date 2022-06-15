import React, { useEffect, useState } from "react";

const OthersDailyScheds = (props) => {
  const { othersScheds, positions } = props;
  const [groupedScheds, setGroupedScheds] = useState();
  useEffect(() => {
    const groupByPosition = () => {
      const initialVal = {};
      return othersScheds?.reduce((acc, current) => {
        if (!acc[current.position]) {
          acc[current.position] = [];
        }

        acc[current.position].push(current);
        return acc;
      }, initialVal);
    };
    const groupedObj = groupByPosition();
    setGroupedScheds(() => groupedObj);
  }, [othersScheds]);

  return <div></div>;
};

export default OthersDailyScheds;
