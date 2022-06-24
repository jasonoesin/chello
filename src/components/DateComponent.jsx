import { useRef, useState } from "react";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const DateComponent = (props) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date(new Date().getTime() + 86400000)
  );

  const options = [
    {
      value: 0,
      label: "No Reminder",
    },
    {
      value: 86400000,
      label: "1 Day Before",
    },
    {
      value: 604800000,
      label: "7 Day Before",
    },
    {
      value: 2592000000,
      label: "1 Month Before",
    },
  ];

  const filterPassedTime = (time) => {
    const currentDate = new Date(new Date().getTime() + 86400000);
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const selectRef = useRef();

  const handleOnClick = (e) => {
    const selectForm = document.querySelector(".selectForm");
    e.preventDefault();
    updateDoc(doc(db, "card", props.card), {
      duedate: selectedDate.getTime(),
    });

    console.log(
      selectedDate,
      selectForm.select.value,
      new Date(selectedDate.getTime() - parseInt(selectForm.select.value))
    );
  };

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <DatePicker
          className="bg-gray-50 border-2 border-gray-500 flex justify-center items-center ml-20 px-2 py-0.5 rounded"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date(new Date().getTime() + 86400000)}
          timeIntervals={60}
          showTimeSelect
          placeholderText="Pick a date and time"
          filterTime={filterPassedTime}
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>

      <form className="selectForm" action="" onSubmit={handleOnClick}>
        <div className="p-3">
          <Select
            ref={selectRef}
            name="select"
            options={options}
            placeholder="Set Reminder"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="absolute bottom-4 m-auto px-3 py-1 bg-blue-400 rounded text-white font-semi-bold "
          >
            Set Due Date
          </button>
        </div>
      </form>
    </>
  );
};

export default DateComponent;
