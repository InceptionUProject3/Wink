import moment from "moment";
import React, { useEffect, useRef } from "react";
import { useContext } from "react";
import { useState } from "react";
import { BsFillCalendar2CheckFill } from "react-icons/bs";
import { LoginContext } from "../../../authentication/LoginProvider";
import { StoreContext } from "../../../authentication/StoreProvider";
import MonthlyCalendar from "../../monthlyCalendar/MonthlyCalendar";
import "./style/swapShiftModal.css";

const SwapShiftModal = (props) => {
  //   const modalref = useRef();
  //   const { modalRef } = props;
  //   const [showMonthly, setShowMonthly] = useState(false);
  const storeId = useContext(StoreContext).store?.Store_idStore;
  const userId = useContext(LoginContext).user?.id;
  const [mySchedules, setMySchdules] = useState();
  const [request, setRequest] = useState({ userId: "", date: "" });
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
        setMySchdules(() => myschedules);
      } catch (err) {
        console.log("failed to fetch my schedule data", err);
        setMySchdules(() => null);
      }
    };
    getMySchedules();
  }, []);
  //   //Hide datemodal when outside clicked.
  //   useEffect(() => {
  //     const clickOutside = (e) => {
  //       if (!modalRef?.current.contains(e.target)) {
  //         setShowMonthly(false);
  //       }
  //     };
  //     document.addEventListener("mousedown", clickOutside);
  //     return () => {
  //       document.removeEventListener("mousedown", clickOutside);
  //     };
  //   }, [showMonthly]);

  //   const displayDateOptions = (e) => {
  //     e.stopPropagation();
  //     setShowMonthly((pre) => !pre);
  //   };
  //   useEffect(()=>{

  //   },[])
  const updateReq = (e) => {
    const { name, value } = e.target;
    setRequest((pre)=>{
      return{...pre, [name]:value}
    });
  };
console.log("Request to send", request)
  return (
    <div className="Shiftswap">
      <div className="date">
        <label htmlFor="Day-lists">Date: </label>
        <select name="date" className="Day-lists" onChange={updateReq} value={request.date}>
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

        {/* <div className="Selected-day">14th, jun</div>
          <button
            className="Calendar-button"
            onClick={(e) => displayDateOptions(e)}
          >
            <BsFillCalendar2CheckFill />
            <div className="Date-modal" ref={modalref}>
              {showMonthly && <MonthlyCalendar />}
            </div> */}
        {/* </button> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default SwapShiftModal;
