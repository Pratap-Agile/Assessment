import { Card } from "antd";
import { API } from "../../API/API";
import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import classes from "./View_Location.module.css";
import Past_Event from "./Past_Event";
import Location_Review from "./Location_Review";
import { useHistory } from "react-router-dom";

const View_Location = () => {
  const history = useHistory();
  const { id } = useParams();
  const [view, setView] = useState({});

  const token = localStorage.getItem("access_token");

  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  // myHeaders.append("Content-Type", "application/json");

  var urlencoded = new URLSearchParams();
  urlencoded.append("placeId", id);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    // body: raw,
    body: urlencoded,
  };

  useEffect(() => {
    fetch(`${API}/admin/api/getPlaceDetails`, requestOptions)
      .then((response) => response.text())
      .then((result) => setView(JSON.parse(result)))
      .catch((error) => console.log("error", error));

    // get event list
  }, []);

  if (!token) {
    history.push("/login");
  }

  return (
    <>
      <Card className={classes.main_card}>
        <h1 className={classes.label}>View Location</h1>

        <div className={classes.view_text}>
          <label className={classes.view_text_title}>Location Name : </label>
          <p> {view?.data?.name}</p>
        </div>

        <div className={classes.view_text}>
          <label className={classes.view_text_title}>Address : </label>
          <p> {view?.data?.address}</p>
        </div>

        <div className={classes.view_text}>
          <label className={classes.view_text_title}>Available Sport : </label>
          <p>
            {" "}
            <span className={classes.sport_text}>
              {view?.data?.sports[0]?.name}
            </span>
          </p>
        </div>

        <div className={classes.view_text}>
          <label className={classes.view_text_title}>Image : </label>
          <p>
            <img
              className={classes.sport_image}
              src={view?.data?.images[0]?.url}
              height="100px"
              width="100px"
              alt="image"
            />
          </p>
        </div>

        <div className={classes.view_text}>
          <label className={classes.view_text_title}>total Reviews : </label>
          <p> {view?.data?.totalReviews}</p>
        </div>
      </Card>

      <Past_Event />
      <Location_Review />
    </>
  );
};

export default View_Location;
