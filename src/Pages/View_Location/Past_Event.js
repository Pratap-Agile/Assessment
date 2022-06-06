import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "antd/dist/antd.css";
import { Table, Card, Checkbox, Avatar, Space } from "antd";
import { Link } from "react-router-dom";
import { API } from "../../API/API";
import classes from "./Past_Event.module.css";

const Past_Event = () => {
  const { id } = useParams();
  const [event, setEvent] = useState([]);
  //   console.log("Event", event);
  const token = localStorage.getItem("access_token");

  const myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    placeId: id,
    draw: 1,
    eventType: 2,
    columns: [
      {
        data: "userDetails.lastName",
        name: "",
        searchable: true,
        orderable: true,
        search: {
          value: "",
          regex: false,
        },
      },
      {
        data: "createdAt",
        name: "",
        searchable: true,
        orderable: true,
        search: {
          value: "",
          regex: false,
        },
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

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const columns = [
    {
      title: "Event Note",
      dataIndex: "eventNote",
      key: "eventNote",
    },
    {
      title: "Sport Name",
      dataIndex: "sportName",
      key: "sportName",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  useEffect(() => {
    // setloading(false);
    fetch(`${API}/admin/api/getPlaceEventList`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // setData(result.data);
        // console.log("past event data", result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <>
      <Card className={classes.main_card}>
        <h1 className={classes.label}>Past Event List</h1>

        {/* {loading ? (
          "Loading"
        ) : ( */}
        <Table
          rowKey="id"
          columns={columns}
          dataSource={event}
          pagination={true}
        ></Table>
        {/* )} */}
      </Card>
    </>
  );
};

export default Past_Event;
