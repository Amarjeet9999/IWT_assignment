import DatePicker from "react-date-picker";

export const LeftComponent = ({
  handleClick,
  setFilter,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  // Date range selection logic
  const handleChange = () => {
    let startDay = startDate.getDate();
    let startMonth = startDate.getMonth() + 1;
    let startYear = startDate.getFullYear();
    let start =
      "" +
      startYear +
      (startMonth <= 9 ? "0" + startMonth : startMonth) +
      (startDay <= 9 ? "0" + startDay : startDay);

    let endDay = endDate.getDate();
    let endMonth = endDate.getMonth() + 1;
    let endYear = endDate.getFullYear();
    let end =
      "" +
      endYear +
      (endMonth <= 9 ? "0" + endMonth : endMonth) +
      (endDay <= 9 ? "0" + endDay : endDay);
    return setFilter({ start: +start, end: +end });
  };

  // Single Click date filter logic, Not Working as expected
  const handleDateFilter = (type) => {
    let todayDay = new Date().getDate();
    let todayMonth = new Date().getMonth() + 1;
    let todayYear = new Date().getFullYear();

    let finalDay =
      "" +
      todayYear +
      (todayMonth <= 9 ? "0" + todayMonth : todayMonth) +
      (todayDay <= 9 ? "0" + todayDay : todayDay);
    if (type === "yesterday") {
      return setFilter({ start: +finalDay - 1, end: +finalDay });
    }
    if (type === "lastweek") {
      return setFilter({ start: +finalDay - 7, end: +finalDay });
    }
    if (type === "lastmonth") {
      return setFilter({ start: +finalDay - 28, end: +finalDay });
    }
  };

  return (
    <div className="left">
      <div className="button">
        <h1>Choose Location</h1>
        <button onClick={() => handleClick("england")}>England-and-wale</button>
        <button onClick={() => handleClick("scotland")}>Scotland</button>
        <button onClick={() => handleClick("northern-ireland")}>
          Northern-Ireland
        </button>
      </div>
      <div className="filters">
        <h1>Filter Options</h1>
        <button
          onClick={() => setFilter({ start: 0, end: Infinity })}
          className="buttonSearch"
        >
          Clear Filter
        </button>
        <div className="startDate firstDate">
          <span className="dateSpan">Start date</span>
          <DatePicker
            className="datePicker"
            onChange={setStartDate}
            value={startDate}
          />
        </div>
        <div className="startDate ">
          <span className="dateSpan">End date</span>
          <DatePicker
            className="datePicker"
            onChange={setEndDate}
            value={endDate}
          />
        </div>
        <button
          disabled={!startDate && !endDate}
          className="buttonSearch"
          onClick={handleChange}
        >
          Search
        </button>
      </div>
      <div className="button2">
        <button onClick={() => handleDateFilter("yesterday")}>Yesterday</button>
        <button onClick={() => handleDateFilter("lastweek")}>Last Week</button>
        <button onClick={() => handleDateFilter("lastmonth")}>
          Last Month
        </button>
      </div>
    </div>
  );
};
