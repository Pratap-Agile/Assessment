import { Card, Col } from "antd";
import { API } from "../API/API";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const View_Location = () => {
  const paperStyle = { padding: 20, width: 400, margin: "100px auto" };
  const { id } = useParams();
  console.log(id);

  const [user, setUser] = useState({});

  var myHeaders = new Headers();
  const token = localStorage.getItem("access_token");

  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("placeId", id);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  useEffect(() => {
    fetch(`${API}/admin/api/getPlaceDetails`, requestOptions)
      .then((response) => response.text())
      .then((result) => setUser(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  }, []);
  console.log("user", user);
  return (
    <div className="site-card-wrapper">
      <Col span={24}>
        <Card style={{ border: "1px solid black", margin: "10px" }}>
          <h1 style={{ borderBottom: "1px solid black" }}>View Location</h1>
          <p>Location Name : {user?.data?.name}</p>
          <p>Location Name : {user?.data?.address}</p>
          <p>Location Name : {user?.data?.sports[0]?.name}</p>
          <p>
            Location Name :{" "}
            <img
              src={user?.data?.images[0]?.url}
              height="100px"
              width="100px"
            />
          </p>
          <p>Location Name : {user?.data?.totalReviews}</p>
        </Card>
      </Col>
    </div>
  );
};

export default View_Location;
