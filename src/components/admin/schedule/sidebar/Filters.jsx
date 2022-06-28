import React from "react";

const Filters = (props) => {
  const { filters, setFilters } = props;

  const rearrangeFilter = (key, name) => {
    const newFilterArray = [];
    filters[key].map((hr) => {
      if (hr.type === name) {
        return newFilterArray.push({ type: name, value: !hr.value });
      } else {
        return newFilterArray.push({ type: hr.type, value: hr.value });
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
    <div className="filters">
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
      <div className="positions">
        {filters?.positions.map((p) => {
          const checked = p.value;
          return (
            <button
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
  );
};

export default Filters;
