import { Autocomplete, TextField } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useMemo } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { IconContext } from "react-icons";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { TbRefresh } from "react-icons/tb";
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
    setSelectedPeriodStart,
    selectedPeriodStart,
    storeTimeZone,
  } = props;

  //Display scheduling periods in sidebar
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

  const displayedPeriod = useMemo(() => {
    console.log("expansive calc")
    const start = selectedPeriodStart?.format("YYYY-MM-DD");
    const end = selectedPeriodStart
      ?.clone()
      .add(4, "weeks")
      .subtract(1, "days")
      .format("YYYY-MM-DD");
    return (
      <div className="Range">
        {start} ~ {end}
      </div>
    );
  }, [selectedPeriodStart]);

  const moveToPreFour = () => {
    setSelectedPeriodStart((pre) => pre?.clone().subtract(4, "weeks"));
  };

  const moveToNextFour = () => {
    setSelectedPeriodStart((pre) => pre?.clone().add(4, "weeks"));
  };

  const onClickRefresh = () => {
    setSelectedPeriodStart(moment.tz(moment(), storeTimeZone).startOf("week"));
  };

  //Period onClick Event
  const updateDate = (e) => {
    const { value } = e.target;
    const momentValue = moment.tz(value, "MMM Do", storeZone);
    setSelectedStart(() => momentValue);
  };

  //Userfilter onChange Event
  const updateUserFilter = (e, newVal) => {
    const empProfiles = newVal;
    setFilters((pre) => {
      return { ...pre, employees: empProfiles };
    });
  };

  return (
    <div className="Side-bar">
      <div className="Period-container">
        <div className="RangeNrefresh-container">
          <div className="Range-container">
            <IconContext.Provider value={{ className: "Range-buttons" }}>
              <MdOutlineArrowBackIos onClick={moveToPreFour} />
              {displayedPeriod}
              <MdOutlineArrowForwardIos onClick={moveToNextFour} />
            </IconContext.Provider>
          </div>
          <TbRefresh onClick={onClickRefresh} />
        </div>
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
      </div>
      <div
        className="userFilter"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="filters-title">Filters:</div>
        <div className="filters">
          <div className="user-filter">
            <Autocomplete
              multiple
              getOptionLabel={(empList) =>
                `${empList.firstname}, ${empList.lastname}`
              }
              options={empList}
              sx={{ width: 300 }}
              isOptionEqualToValue={(option, value) =>
                option.firstname === value.firstname
              }
              filterSelectedOptions
              noOptionsText={"No employee found"}
              renderOption={(props, empList) => {
                console.log("empList", empList);
                return (
                  <Box
                    {...props}
                    key={empList.userId}
                    sx={{ display: "flex", flexDirection: "row", gap: "5%" }}
                  >
                    <ProfileIcon
                      profile={empList}
                      color={empList.position.color}
                    />
                    <div>
                      {empList.firstname}, {empList.lastname}
                    </div>
                  </Box>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search employees"
                  variant="outlined"
                />
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
