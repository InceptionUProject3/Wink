
import { Autocomplete, TextField } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React from "react";
import { ProfileIcon } from "../../../Reusables/components/ProfileIcon";
import Filters from "./Filters";

import "./sidebar.css";

const Sidebar = (props) => {
  const {
    storeZone,
    startDaysOfWeek,
    setSelectedStart,
    selectedStart,
    filters,
    setFilters,
    empList,
    setSelectedEmp,
  } = props;

  const displayWeekList = () => {
    return startDaysOfWeek?.map((weekStart, i) => {
      const endWeek = weekStart.clone().endOf("week").format("MMM Do");
      const startWeek = weekStart.format("MMM Do");
      return (
        <option key={`weekStart ${i}`} value={startWeek}>
          {startWeek} - {endWeek}
        </option>
      );
    });
  };
  // console.log('filters', filters)
  const updateDate = (e) => {
    const { value } = e.target;
    const momentValue = moment.tz(value, "MMM Do", storeZone);
    // console.log("value", momentValue)
    setSelectedStart(() => momentValue);
  };

  const updateUserFilter = (e, newVal) => {
    // const value = e.target;
    const userId = newVal;
    // console.log("userids", newVal);
    setSelectedEmp(() => userId);
  };
  // console.log("Changed filters", filters);

  return (
    <div className="Side-bar">
      <div className="Date-choice-box">
        <label>Period:</label>
        <select
          name="startDate"
          onChange={updateDate}
          value={moment(selectedStart)?.format("MMM Do")}
        >
          {displayWeekList()}
        </select>
      </div>
      <div className="userFilter" style={{display: "flex", flexDirection: "column" }}>
        <div className="filters-title">Filters:</div>
        <div className="filters">
          <div className="user-filter">
            <Autocomplete
              multiple
              getOptionLabel={(empList) =>
                `${empList.firstname}, ${empList.lastname}`
              }
              options={empList}
              sx={{ width: 300}}
              isOptionEqualToValue={(option, value) =>
                option.firstname === value.firstname
              }
              filterSelectedOptions
              noOptionsText={"No employee found"}
              renderOption={(props, empList) => {
                // console.log('empList',empList)
                return (
                  <Box
                    {...props}
                    key={empList.userId}
                    sx={{ display: "flex", flexDirection: "row", gap:'5%'}}
                  >
                    <ProfileIcon
                      profile={empList.position}
                      color={empList.position.color}
                    />
                    <div>
                      {empList.firstname}, {empList.lastname}
                    </div>
                  </Box>
                );
              }}
              renderInput={(params) => (
                <TextField {...params} label="Search employees" variant="outlined" />
              )}
              onChange={(e, newVal) => updateUserFilter(e, newVal)}
            />
          </div>
          <Filters filters={filters} setFilters={setFilters} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
