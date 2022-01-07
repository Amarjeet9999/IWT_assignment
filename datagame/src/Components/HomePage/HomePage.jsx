import React from "react";
import "./homepage.style.css";
import { Card } from "../Card/Card";
import { fetchData } from "../../Utils/fetchData";

export const HomePage = () => {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [select, setSelect] = React.useState("england");

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
          <div className="button">
            <button>Yesterday</button>
            <button>Last Week</button>
            <button>Last Month</button>
          </div>
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
                ? data["england-and-wales"].events.map((e, index) => {
                    return <Card key={index} title={e.title} />;
                  })
                : select === "scotland"
                ? data["scotland"].events.map((e, index) => {
                    return <Card key={index} title={e.title} />;
                  })
                : data["northern-ireland"].events.map((e, index) => {
                    return <Card key={index} title={e.title} />;
                  }))}
          </div>
        </div>
      </div>
    </>
  );
};
