import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Card, Alert, Spin } from "antd";
import moment from "moment";
import classes from "./AddEvent.module.css";
import { useParams } from "react-router";
import { API } from "../../../../API/API";
import { useHistory } from "react-router-dom";
import axios from "axios";
import qs from "qs";

const AddEvent = () => {
  const history = useHistory();
  const { id } = useParams();
  const token = localStorage.getItem("access_token");

  const [locationName, setLocationName] = useState();
  const [address, setAddress] = useState();
  const [availabelSport, setAvailabelSport] = useState();

  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [eventNotes, setEventNotes] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState("");

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
      .then(function (response) {
        setLocationName(response.data.data.name);
        setAddress(response.data.data.address);
        setAvailabelSport(response.data.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        setHasError(error);
      });
  }, []);

  const updateHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // const urlencoded = qs.stringify({
    //   date: "11/02/2021",
    //   endTime: "01:15 PM",
    //   notes: "CARROM DAILY EVENT",
    //   placeId: "6110fb660cb2a92d078e9f78",
    //   recurrence: "1",
    //   sportId: "60ab91a4fda5602719d087b6",
    //   startTime: "01:00 PM",
    // });

    const urlencoded = qs.stringify({
      date: date,
      startTime: startTime,
      endTime: endTime,
      notes: eventNotes,
      placeId: "6110fb660cb2a92d078e9f78",
      recurrence: "1",
      sportId: "60ab91a4fda5602719d087b6",
    });

    axios({
      method: "post",
      url: `${API}/admin/api/addEvent`,
      headers: {
        Authorization: token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: urlencoded,
    })
      .then(function (response) {
        setIsLoading(false);
        alert("Add event succesfully!");
        history.push(`/location/view/${id}`);
      })
      .catch(function (error) {
        setHasError(error);
      });
  };

  const backHandler = () => {
    history.push(`/location/view/${id}`);
  };

  if (!token) {
    history.push("/login");
  }
  return (
    <div>
      <Card className={classes.main_div}>
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
          <form>
            <h1 className={classes.label}>Add Event</h1>

            <div className={classes.view_text}>
              <label className={classes.view_text_title}>Location Name: </label>
              <p>{locationName}</p>
            </div>

            <div className={classes.view_text}>
              <label className={classes.view_text_title}>Address: </label>
              <p>{address}</p>
            </div>

            <div className={classes.view_text}>
              <label className={classes.view_text_title}>
                Available Sport:
              </label>
              <p>
                {availabelSport?.sports.map((sportss) => (
                  <span className={classes.sport_text} key={sportss._id}>
                    {sportss.name}
                  </span>
                ))}
              </p>
            </div>

            <div className={classes.view_text}>
              <label className={classes.view_text_title}>Date: </label>
              <input
                type="date"
                value={moment(date).format("YYYY-MM-DD")}
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                type="time"
                placeholder="start time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                id="timeInput"
              />
              <input
                type="time"
                placeholder="end time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>

            <div className={classes.view_text}>
              <label className={classes.view_text_title}>Event Note: </label>
              <input
                type="text"
                placeholder="Type your note..."
                onChange={(e) => setEventNotes(e.target.value)}
              />
            </div>

            <div className={classes.view_text} style={{ border: "none" }}>
              <button
                className={classes.update_button}
                type="submit"
                onClick={updateHandler}
              >
                Update
              </button>
              <input
                className={classes.update_button}
                type="button"
                value="Back"
                onClick={backHandler}
              />
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};

export default AddEvent;
