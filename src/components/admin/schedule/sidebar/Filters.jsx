import React from "react";
import { TbRefresh } from "react-icons/tb";

const Filters = (props) => {
  const { filters, setFilters, setResetFilter } = props;

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
    <div className="filters">
      <div className="filters-refreshNtitle">
        <div className="filters-title">Filters:</div>
        <TbRefresh onClick={() => setResetFilter((pre) => !pre)} />
      </div>
      <div className="hours-container">
        <label>Availabilty</label>
        <div className="hours">
          {filters?.hours?.map((hr, i) => {
            const checked = hr.value;
            return (
              <button
                className={`filterHrs ${hr.type} ${checked}`}
                name={hr.type}
                value={hr.value}
                onClick={onClickHrs}
                key={`filterHrs ${i}`}
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
          {filters?.positions?.map((p, i) => {
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
                key={`filterPos ${i}`}
              >
                {p.type}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Filters;
