
import React from "react";

const Filters = (props) => {
  const { filters, setFilters } = props;

  const rearrangeFilter = (key, name) => {
    const newFilterArray = [];
    filters[key].map((hr) => {
      if (hr.type === name) {
        return newFilterArray.push({ type: name, value: !hr.value,color: hr.color });
      } else {
        return newFilterArray.push({ type: hr.type, value: hr.value,color: hr.color });
      }
    });
    return newFilterArray;
  };

  const onClickHrs = (e) => {
    const { className, name } = e.target;

    if (className.includes("filterHrs")) {
      const newFilterArray = rearrangeFilter("hours", name);
      setFilters((pre) => {
        return { ...pre, hours: newFilterArray };
      });
    } else if (className.includes("filterPos")) {
      const newFilterArray = rearrangeFilter("positions", name);
      setFilters((pre) => {
        return { ...pre, positions: newFilterArray };
      });
    }
  };

  return (
    <>
      <div className="hours-container">
        <label>Availabilty</label>
        <div className="hours">
          {filters?.hours.map((hr) => {
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
          {filters?.positions.map((p) => {
            const checked = p.value;
            // console.log("color", p.color);
            return (
              <button
                style={{ 
                  backgroundColor: checked ? `#${p.color}` : "white", 
                  border: checked? 'none':  `2px solid #${p.color}`,
                  color: checked? "white": "#5a5a5a"
                }}
                // {...checked&&style={{backgroundColor:"white"}}}
                className={`filterPos ${p.type} ${checked}`}
                name={p.type}
                value={p.value}
                onClick={onClickHrs}
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
