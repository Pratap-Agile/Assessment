import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "antd/dist/antd.css";
import { Table, Card, Checkbox, Avatar, Space } from "antd";
import { Link } from "react-router-dom";
import { API } from "../../API/API";
import { useHistory } from "react-router-dom";
import classes from "./Past_Event.module.css";

const Location_Review = () => {
  const history = useHistory();
  const { id } = useParams();
  const [review, setReview] = useState([]);
  const [loading, setloading] = useState(true);
  // console.log("review", review);

  const token = localStorage.getItem("access_token");

  const myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    placeId: id,
    draw: 1,
    columns: [
      {
        data: "image",
        name: "",
        searchable: false,
        orderable: false,
        search: {
          value: "",
          regex: false,
        },
      },
      {
        data: "userDetails.firstName",
        name: "",
        searchable: true,
        orderable: true,
        search: {
          value: "",
          regex: false,
        },
      },
      {
        data: "description",
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
      value: "second",
      regex: false,
    },
  });

  const requestOptionsEvent = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const columns = [
    {
      title: "Reviewer Name",
      dataIndex: "reviewerName",
      key: "reviewerName",
    },
    {
      title: "Description",
      dataIndex: "discription",
      key: "discription",
    },
    {
      title: "Likes",
      dataIndex: "likes",
      key: "likes",
    },
    {
      title: "flags",
      dataIndex: "flags",
      key: "flags",
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
    fetch(`${API}/v6/api/getPlaceReviewList`, requestOptionsEvent)
      .then((response) => response.json())
      .then((result) => setReview(result.data))
      .catch((error) => console.log("error", error));
  }, []);
  
  if (!token) {
    history.push("/login");
  }
  return (
    <>
      <Card className={classes.main_card}>
        <h1 className={classes.label}>Location Reviews</h1>
        {/* {loading ? (
          "Loading"
        ) : ( */}
        <Table
          // className={classes.main_table}
          rowKey="id"
          columns={columns}
          dataSource={review}
          pagination={true}
        ></Table>
        {/* )} */}
      </Card>
    </>
  );
};

export default Location_Review;
