import React, { useEffect, useState } from "react";
import { API } from "../API/API";
import "antd/dist/antd.css";
import { Table, Card, Checkbox, Avatar, Space } from "antd";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import Icons, { DeleteFilled, EyeFilled, EditFilled } from "@ant-design/icons";
import classes from "./Location_manage.module.css";

const Location_Management = () => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "Images",
      key: "images",
      dataIndex: "images",
      render: (images) => (
        <div style={{ display: "flex" }}>
          <Avatar
            shape="square"
            size={70}
            icon={<img src={images[0]?.url} />}
          />
        </div>
      ),
    },

    {
      title: "Location name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Available Sports",
      key: "sports",
      dataIndex: "sports",
      render: (sports) => (
        <div>
          {sports.map((sport) => {
            return <p key={sport._id}>{sport.name}</p>;
          })}
        </div>
      ),
    },
    {
      title: "flagCount",
      key: "flagCount",
      dataIndex: "flagCount",
    },
    {
      title: "Verified",
      dataIndex: "isVerified",
      key: "isVerified",
      render: (isVerified) => (
        <div>
          <Checkbox checked={isVerified} />
        </div>
      ),
    },
    {
      title: "Premium Location",
      dataIndex: "isPremium",
      key: "isPremium",
      render: (isPremium) => (
        <div>
          <Checkbox checked={isPremium} />
        </div>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, actionId) => (
        <div style={{ display: "flex" }}>
          <Space size="middle">
            <Link to={`/location/view/${actionId._id}`}>
              {/* <Link to={`/location/view?id=${actionId._id}`}> */}
              <EyeFilled className={classes.action_icon} />
            </Link>
            <Link to={`/location/edit/${actionId._id}`}>
              <EditFilled className={classes.action_icon} />
            </Link>

            {/* <DeleteFilled className={classes.action_icon} /> */}
          </Space>
        </div>
      ),
    },
  ];

  var myHeaders = new Headers();
  const token = localStorage.getItem("access_token");
  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
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
        data: "name",
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
        dir: "desc",
      },
    ],
    start: 0,
    length: 15,
    search: {
      value: "",
      regex: false,
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  useEffect(() => {
    fetch(`${API}/admin/api/getPlaceManagementList`, requestOptions)
      .then((response) => response.json())
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <Card>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Table
          style={{ width: "800px", height: "auto" }}
          rowKey="id"
          columns={columns}
          dataSource={data}
          pagination={true}
        ></Table>
      </div>
    </Card>
  );
};

export default Location_Management;
