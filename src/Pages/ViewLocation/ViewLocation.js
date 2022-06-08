import { Card, Alert, Spin } from "antd";
import { API } from "../../API/API";
import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import classes from "./ViewLocation.module.css";
import EventList from "./Event/EventList/EventList";
import axios from "axios";
import LocationReview from "./LocationReview/LocationReview";
import { useHistory } from "react-router-dom";

const ViewLocation = () => {
  const history = useHistory();
  const { id } = useParams();
  const [view, setView] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState("");

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    setIsLoading(true);
    var urlencoded = new URLSearchParams();
    urlencoded.append("placeId", id);

    axios({
      method: "post",
      url: `${API}/admin/api/getPlaceDetails`,
      headers: {
        Authorization: token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: urlencoded,
    })
      .then((response) => {
        setView(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setHasError(error);
      });
  }, []);

  if (!token) {
    history.push("/login");
  }

  return (
    <>
      <Card className={classes.main_card}>
        <h1 className={classes.label}>View Location</h1>

        {hasError && <Alert message="something went wrong" type="error" />}
        {isLoading && (
          <Spin tip="Loading...">
            <Alert
              message="Loading data.."
              description="Please wait for minute or refresh the page."
              type="Server Issue"
            />
          </Spin>
        )}
        {!isLoading && (
          <div>
            <div className={classes.view_text}>
              <label className={classes.view_text_title}>
                Location Name :{" "}
              </label>
              <p> {view?.data?.name}</p>
            </div>

            <div className={classes.view_text}>
              <label className={classes.view_text_title}>Address : </label>
              <p> {view?.data?.address}</p>
            </div>

            <div className={classes.view_text}>
              <label className={classes.view_text_title}>
                Available Sport :{" "}
              </label>
              <p>
                {view?.data?.sports.map((sportss) => (
                  <span className={classes.sport_text} key={sportss._id}>
                    {sportss.name}
                  </span>
                ))}
              </p>
            </div>

            <div className={classes.view_text}>
              <label className={classes.view_text_title}>Image : </label>
              <p>
                {view?.data?.images.map((imagess) => (
                  <img
                    key={imagess._id}
                    className={classes.sport_image}
                    src={imagess.url}
                    height="100px"
                    width="100px"
                    alt="image"
                  />
                ))}
              </p>
            </div>

            <div className={classes.view_text}>
              <label className={classes.view_text_title}>
                total Reviews :{" "}
              </label>
              <p> {view?.data?.totalReviews}</p>
            </div>
          </div>
        )}
      </Card>

      <EventList />
      <LocationReview />
    </>
  );
};

export default ViewLocation;
