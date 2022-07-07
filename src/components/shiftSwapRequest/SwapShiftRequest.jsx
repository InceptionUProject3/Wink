import moment from "moment";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { LoginContext } from "../authentication/LoginProvider";
import { StoreContext } from "../authentication/StoreProvider";
import ConfirmModals from "./ConfirmModals";

import "./swapShiftRequest.css";

const SwapShiftRequest = (props) => {
  const { setOpenModal } = props;
  const storeId = useContext(StoreContext).store?.Store_idStore;
  const userId = useContext(LoginContext).user?.id;
  const [mySchedules, setMySchdules] = useState();
  const [swapList, setSwapList] = useState();

  const [request, setRequest] = useState({
    userId: userId,
    storeId: storeId,
    date: "",
    reason: "",
    swapAvailable: {},
  });

  useEffect(() => {
    const today = moment().format("YYYY-MM-DD");

    //get all my future schedules
    const getMySchedules = async () => {
      try {
        const data = await fetch(
          // `/api/schedule/shiftswap?storeId=${storeId}&myId=${userId}&from=${today}`
          `/api/schedule/shiftswap?storeId=1&myId=9&from=${today}`
        );
        const dataObj = await data.json();
        console.log("data", dataObj);
        setMySchdules(() => dataObj.mySchedules);
        setSwapList(() => dataObj.schedulestoSwap);
      } catch (err) {
        console.log("failed to fetch my schedule data", err);
        setMySchdules(() => null);
      }
    };
    getMySchedules();
  }, []);


  const updateReq = (e) => {
    const { name, value, type, checked } = e.target;
    setRequest((pre) => {
      if (type === "checkbox") {
        return {
          ...pre,
          swapAvailable: { ...pre.swapAvailable, [name]: checked },
        };
      }else if(name==="date"){
        const idNDate = value.split('/')
        return {...pre, scheduleId: idNDate[0],[name]:idNDate[1]}
      } 
      else {
        console.log("value", value)
        return { ...pre, [name]: value };
      }
    });
  };

  // console.log("swap", swapList)
  console.log("Request to send", request);

  return (
    <div className="Shiftswap">
      <button className="close" onClick={()=>setOpenModal(false)}>x</button>
      <ConfirmModals request={request} setOpenModal={setOpenModal} />
      <div className="date">
        <label htmlFor="date">*Date: </label>
        <select
          name="date"
          className="Day-lists"
          onChange={updateReq}
          value={`${request?.scheduleId}/${request?.date}`}
        >
          <option value="">--Select date--</option>
          {mySchedules?.schedules.length ? (
            mySchedules.schedules.map((sched) => {
              const option = moment(sched.starttime).format("ddd, MMM Do");
              if (sched.workcode === 0) {
                return <option value={`${sched.idSchedule}/${option}`}>{option}</option>;
              }
            })
          ) : (
            <option value="">No schedule found</option>
          )}
        </select>
      </div>
      <div className="Reason-container">
        <label htmlFor="reason">*Reason: </label>
        <textarea
          name="reason"
          className="Reason-box"
          cols="30"
          rows="10"
          onChange={updateReq}
          value={request?.reason}
        />
      </div>
      <div className="Schedules-container">
        <label htmlFor="schedules">
          Choose available shifts (optional):{" "}
        </label>
        <div className="Container">
          {swapList?.map((sched) => {
            return sched.schedules.map((s) => {
              return (
                <div className="Schedule-conatiner">
                  <input
                    type="checkbox"
                    name={s.idSchedule}
                    onChange={updateReq}
                    checked={request.swapAvailable[s.idSchedule] || false}
                  />
                  <label htmlFor={s.idSchedule} className="Schedule-label">
                    <span>
                      {moment(s.starttime).format("ddd, MMM Do h:mm a")} -
                    </span>
                    <span> {moment(s.endtime).format("h:mm a")} </span>
                  </label>
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
};

export default SwapShiftRequest;
