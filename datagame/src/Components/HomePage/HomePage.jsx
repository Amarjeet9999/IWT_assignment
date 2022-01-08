import React from "react";
import "./homepage.style.css";
import { Card } from "../Card/Card";
import { fetchData } from "../../Utils/fetchData";
import DatePicker from "react-date-picker";
import { convertToNum } from "../../Utils/convertToNum";

export const HomePage = () => {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [select, setSelect] = React.useState("england");
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [filter, setFilter] = React.useState({ start: 0, end: Infinity });

  const handleFetch = async () => {
    await fetchData("https://www.gov.uk/bank-holidays.json").then((res) => {
      setData(res);
      setLoading(false);
    });
  };

  const handleClick = (val) => {
    setSelect(val);
  };

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

  React.useEffect(() => {
    handleFetch();
  }, []);

  return (
    <>
      <div className="left">
        <div className="button">
          <h1>Choose Location</h1>
          <button onClick={() => handleClick("england")}>
            England-and-wale
          </button>
          <button onClick={() => handleClick("scotland")}>Scotland</button>
          <button onClick={() => handleClick("northern-ireland")}>
            Northern-Ireland
          </button>
        </div>
        <div className="filters">
          <h1>Filter Options</h1>
          <div className="startDate">
            <span className="dateSpan">Start date</span>
            <DatePicker
              className="datePicker"
              onChange={setStartDate}
              value={startDate}
            />
          </div>
          <div className="startDate">
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
      </div>
      <div className="right">
        <div>
          <div className="fixedData">
            <h1>Simple Data Application</h1>
            <div className="showData">
              {!loading &&
                (select === "england" ? (
                  <h1>England And Wale Data</h1>
                ) : select === "scotland" ? (
                  <h1>Scotland Data</h1>
                ) : (
                  <h1>Northern-Ireland Data</h1>
                ))}
            </div>
          </div>
          <div className="data">
            {!loading &&
              (select === "england"
                ? data["england-and-wales"].events
                    .filter((e) => {
                      return (
                        convertToNum(e.date) >= filter.start &&
                        convertToNum(e.date) <= filter.end
                      );
                    })
                    .map((e, index) => {
                      return <Card key={index} title={e.title} />;
                    })
                : select === "scotland"
                ? data["scotland"].events
                    .filter((e) => {
                      return (
                        convertToNum(e.date) >= filter.start &&
                        convertToNum(e.date) <= filter.end
                      );
                    })
                    .map((e, index) => {
                      return <Card key={index} title={e.title} />;
                    })
                : data["northern-ireland"].events
                    .filter((e) => {
                      return (
                        convertToNum(e.date) >= filter.start &&
                        convertToNum(e.date) <= filter.end
                      );
                    })
                    .map((e, index) => {
                      return <Card key={index} title={e.title} />;
                    }))}
          </div>
        </div>
      </div>
    </>
  );
};
