import React from "react";

const Filters = (props) => {
  const { filters, setFilters } = props;

  const onClickHrs = (e) => {
    const { name } = e.target;
    const newFilterArray = [];
    filters?.hours.map((hr) => {
      if (hr.type === name) {
        return newFilterArray.push({
          type: name,
          value: !hr.value,
          min: hr.min,
          max: hr.max,
        });
      } else {
        return newFilterArray.push({
          type: hr.type,
          value: hr.value,
          min: hr.min,
          max: hr.max,
        });
      }
    });
    setFilters((pre) => {
      return { ...pre, hours: newFilterArray };
    });
  };

  const onClickPos = (e) => {
    const { name } = e.target;
    const newFilterArray = [];
    filters?.positions.map((pos) => {
      if (pos.type === name) {
        return newFilterArray.push({
          type: name,
          value: !pos.value,
          color: pos.color,
        });
      } else {
        return newFilterArray.push({
          type: pos.type,
          value: pos.value,
          color: pos.color,
        });
      }
    });
    setFilters((pre) => {
      return { ...pre, positions: newFilterArray };
    });
  };

  return (
    <>
      <div className="hours-container">
        <label>Availabilty</label>
        <div className="hours">
          {filters?.hours?.map((hr) => {
            const checked = hr.value;
            return (
              <button
                className={`filterHrs ${hr.type} ${checked}`}
                name={hr.type}
                value={hr.value}
                onClick={onClickHrs}
              >
                {hr.type}
              </button>
            );
          })}
        </div>
      </div>
      <div className="positions-container">
        <label>Positions</label>
        <div className="positions">
          {filters?.positions?.map((p) => {
            const checked = p.value;

            return (
              <button
                style={{
                  backgroundColor: checked ? `#${p.color}` : "white",
                  border: checked ? "none" : `2px solid #${p.color}`,
                  color: checked ? "white" : "#5a5a5a",
                }}
                className={`filterPos ${p.type} ${checked}`}
                name={p.type}
                value={p.value}
                onClick={onClickPos}
              >
                {p.type}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Filters;
