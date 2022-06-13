import moment from "moment";
import React from "react";
import { VscCircleFilled } from "react-icons/vsc";

const WeeklyCalendarHeader = (props) => {
  const { storeOpen, storeClose } = props;

  return (
    <div className="Table-info-header">
      <div className="Table-info">
        <div className="Store-hours">
          <p className="open">
            <span>From</span>
            <span> {storeOpen.format("HH:mm")}</span>
          </p>
          <p className="close">
            <span>To</span>
            <span> {storeClose.format("HH:mm")}</span>
          </p>
        </div>

        <div className="Work-code">
          <div className="Working">
            <VscCircleFilled
              style={{ color: "#71C8C8", alignSelf: "center" }}
            />
            <span>Working</span>
          </div>
          <div className="Vacation">
            <VscCircleFilled
              style={{ color: "#5a5a5a", alignSelf: "center" }}
            />
            <span>Vacation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendarHeader;
