import React from "react";
import "./homepage.style.css";
import { Card } from "../Card/Card";
import { fetchData } from "../../Utils/fetchData";
import { convertToNum } from "../../Utils/convertToNum";
import { LeftComponent } from "./LeftComponent";

export const HomePage = () => {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [select, setSelect] = React.useState("england");
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [filter, setFilter] = React.useState({ start: 0, end: Infinity });

  // Fetching Data after the render done and saving into data state
  const handleFetch = async () => {
    await fetchData("https://www.gov.uk/bank-holidays.json").then((res) => {
      setData(res);
      setLoading(false);
    });
  };

  const handleClick = (val) => {
    setSelect(val);
  };

  React.useEffect(() => {
    handleFetch();
  }, []);
  return (
    <>
      <LeftComponent
        handleClick={handleClick}
        setFilter={setFilter}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <div className="right">
        <div>
          <div className="fixedData">
            <h1>Simple Weekend's Data Application</h1>
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
            {Object.keys(data).length === 0 && <h1>No Data Available...</h1>}
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
                      return <Card key={index} data={e} />;
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
                      return <Card key={index} data={e} />;
                    })
                : data["northern-ireland"].events
                    .filter((e) => {
                      return (
                        convertToNum(e.date) >= filter.start &&
                        convertToNum(e.date) <= filter.end
                      );
                    })
                    .map((e, index) => {
                      return <Card key={index} data={e} />;
                    }))}
          </div>
        </div>
      </div>
    </>
  );
};
