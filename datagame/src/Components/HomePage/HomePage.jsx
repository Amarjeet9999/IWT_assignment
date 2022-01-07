import React from "react";
import styles from "./homepage.style.css";
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
    <div>
      <h1>Simple Data Application</h1>
      <div className="button">
        <button onClick={() => handleClick("england")}>England-and-wale</button>
        <button onClick={() => handleClick("scotland")}>Scotland</button>
        <button onClick={() => handleClick("northern-ireland")}>
          Northern-Ireland
        </button>
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
  );
};
