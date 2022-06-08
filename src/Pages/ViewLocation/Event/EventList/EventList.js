import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "antd/dist/antd.css";
import { Table, Card, Button, Alert, Spin } from "antd";
import Search from "antd/lib/input/Search";
import { NavLink } from "react-router-dom";
import { API } from "../../../../API/API";
import classes from "./EventList.module.css";

const EventList = () => {
  const { id } = useParams();
  const [event, setEvent] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState("");

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
      sorter: (a, b) => a.eventNote.localeCompare(b.eventNote),
    },
    {
      title: "Sport Name",
      dataIndex: "sportName",
      key: "sportName",
      sorter: (a, b) => a.sportName.localeCompare(b.sportName),
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      sorter: (a, b) => a.startTime.localeCompare(b.startTime),
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      sorter: (a, b) => a.endTime.localeCompare(b.endTime),
    },
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
      sorter: (a, b) => a.day.localeCompare(b.day),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => a.date.localeCompare(b.date),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  useEffect(() => {
    // setloading(false);
    setIsLoading(true);
    fetch(`${API}/admin/api/getPlaceEventList`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // setData(result.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setHasError(error);
      });
  }, []);
  return (
    <>
      <Card className={classes.main_card}>
        <div className={classes.divLocationList}>
          <h1 className={classes.label}>Past Event List</h1>
          <Search
            placeholder="search location"
            allowClear
            className={classes.searchBox}
            // onSearch={searchHandler}
          />
          <div style={{ marginLeft: "50%" }}>
            <Button type="primary">
              <NavLink to={`/location/add-event/${id}`}>
                <b>+</b> Add Event
              </NavLink>
            </Button>
          </div>
        </div>

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
          <Table
            rowKey="id"
            columns={columns}
            dataSource={event}
            pagination={true}
            locale={{ emptyText: "Event List Data Not Found...!" }}
          ></Table>
        )}
      </Card>
    </>
  );
};

export default EventList;
