import moment from "moment";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { LoginContext } from "../../../authentication/LoginProvider";
import { StoreContext } from "../../../authentication/StoreProvider";
import "./style/swapShiftModal.css";

const SwapShiftModal = (props) => {
  const storeId = useContext(StoreContext).store?.Store_idStore;
  const userId = useContext(LoginContext).user?.id;
  const [mySchedules, setMySchdules] = useState();
  const [swapList, setSwapList] = useState();
  const [request, setRequest] = useState({ userId: "", storeId:"", date: "", reason: "" });
  useEffect(() => {
    const today = moment().format("YYYY-MM-DD");

    //get all my future schedules
    const getMySchedules = async () => {
      try {
        const data = await fetch(
          `/api/schedule/mySchedules?storeId=${storeId}&myId=${userId}&from=${today}`
        );
        const myschedules = await data.json();
        console.log("myschedules", myschedules);
        setMySchdules(() => myschedules.mySchedules);
        setSwapList(()=>myschedules.schedulesToSwap)
      } catch (err) {
        console.log("failed to fetch my schedule data", err);
        setMySchdules(() => null);
      }
    };
    getMySchedules();
  }, []);

  const updateReq = (e) => {
    const { name, value } = e.target;
    setRequest((pre) => {
      return { ...pre, [name]: value };
    });
  };
  console.log("Request to send", request);


  return (
    <div className="Shiftswap">
      <div className="date">
        <label htmlFor="date">*Date: </label>
        <select
          name="date"
          className="Day-lists"
          onChange={updateReq}
          value={request.date}
        >
          <option value="">--Select date--</option>
          {mySchedules ? (
            mySchedules.schedules.map((sched) => {
              const option = moment(sched.starttime).format("ddd, MMM Do");
              if (sched.workcode === 0) {
                return <option value={sched.starttime}>{option}</option>;
              }
            })
          ) : (
            <option value="">No schedule found</option>
          )}
        </select>
      </div>
      <label htmlFor="reason">*Reason: </label>
      <textarea
        name="reason"
        className="Reason-box"
        cols="30"
        rows="10"
        onChange={updateReq}
        value={request.reason}
      />
    </div>
  );
};

export default SwapShiftModal;
