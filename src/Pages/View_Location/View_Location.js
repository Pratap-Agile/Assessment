import { Card, Col } from "antd";
import { API } from "../../API/API";
import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import classes from "./View_Location.module.css";

const View_Location = () => {
  const { id } = useParams();

  const [user, setUser] = useState({});

  const [Event, setEvent] = useState("");
  console.log("Event data", Event);

  // event header start
  const token = localStorage.getItem("access_token");

  var myHeadersEvent = new Headers();
  myHeadersEvent.append("Authorization", token);
  myHeadersEvent.append("Content-Type", "application/json");
  // event header end

  var myHeaders = new Headers();

  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  // myHeaders.append("Content-Type", "application/json");

  var rawEvent = JSON.stringify({
    placeId: id,
    draw: 1,
    columns: [
      {
        data: "userDetails.lastName",
        name: "",
      },
      {
        data: "createdAt",
        name: "",
      },
    ],
    order: [
      {
        column: 1,
        dir: "asc",
      },
    ],
    start: 0,
    length: 20,
    search: {
      value: "polo",
      regex: false,
    },
  });

  var urlencoded = new URLSearchParams();
  urlencoded.append("placeId", id);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    // body: raw,
    body: urlencoded,
  };

  const requestOptionsEvent = {
    method: "POST",
    headers: myHeadersEvent,
    body: rawEvent,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(`${API}/admin/api/getPlaceDetails`, requestOptions)
      .then((response) => response.text())
      .then((result) => setUser(JSON.parse(result)))
      .catch((error) => console.log("error", error));

    // get event list
    fetch(`${API}/admin/api/getPlaceEventList`, requestOptionsEvent)
      .then((response) => response.json())
      .then((result) => setEvent(result.data))
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <div>
      {/* <Col span={24}> */}
      <Card className={classes.main_card}>
        <h1 className={classes.label}>View Location</h1>

        <div className={classes.view_text}>
          <label className={classes.view_text_title}>Location Name : </label>
          <p> {user?.data?.name}</p>
        </div>

        <div className={classes.view_text}>
          <label className={classes.view_text_title}>Address : </label>
          <p> {user?.data?.address}</p>
        </div>

        <div className={classes.view_text}>
          <label className={classes.view_text_title}>Available Sport : </label>
          <p>
            {" "}
            <span className={classes.sport_text}>
              {user?.data?.sports[0]?.name}
            </span>
          </p>
        </div>

        <div className={classes.view_text}>
          <label className={classes.view_text_title}>Image : </label>
          <p>
            <img
              className={classes.sport_image}
              src={user?.data?.images[0]?.url}
              height="100px"
              width="100px"
              alt="image"
            />
          </p>
        </div>

        <div className={classes.view_text}>
          <label className={classes.view_text_title}>total Reviews : </label>
          <p> {user?.data?.totalReviews}</p>
        </div>
      </Card>

      <Card className={classes.main_card}>
        <h1 className={classes.label}>Past Event List</h1>
      </Card>

      <Card className={classes.main_card}>
        <h1 className={classes.label}>Location Reviews</h1>
      </Card>
      {/* </Col> */}
    </div>
  );
};

export default View_Location;
