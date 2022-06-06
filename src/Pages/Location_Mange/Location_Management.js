import React, { useEffect, useState } from "react";
import { API } from "../../API/API";
import "antd/dist/antd.css";
import { Table, Card, Checkbox, Avatar, Space, Select } from "antd";
import { Link } from "react-router-dom";
import { DeleteFilled, EyeFilled, EditFilled } from "@ant-design/icons";
import classes from "./Location_manage.module.css";
import Search from "antd/lib/input/Search";
import { Button } from "antd";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

const { Option } = Select;

const Location_Management = () => {
  const history = useHistory();
  const [data, setData] = useState([]);

  const [isSearched, setIsSearched] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const [allSport, setAllSport] = useState([]);

  // const [isSport, setIsSport] = useState(false);
  // const [sportResult, setSportResult] = useState([]);

  const token = localStorage.getItem("access_token");

  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/json");

  const deleteHandler = (id) => {
    // let raw = new URLSearchParams();
    // raw.append("googlePlaceId", id);
    // const requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    // };
    // fetch("http://202.131.117.92:7100/admin/api/deletePlace", requestOptions)
    //   .then((response) => response.text())
    //   .then((result) => alert(" delete succesfully", result))
    //   .catch((error) => console.log("error", error));
  };

  const columns = [
    {
      title: "Images",
      key: "images",
      dataIndex: "images",
      render: (images) => (
        <Avatar
          style={{ borderRadius: "14px" }}
          shape="square"
          size={70}
          icon={<img src={images[0]?.url} />}
        />
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
            return (
              <p className={classes.sport_text} key={sport._id}>
                {sport.name}
              </p>
            );
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
        <Space size="middle">
          <Link to={`/location/view/${actionId._id}`}>
            <EyeFilled className={classes.action_icon} />
          </Link>
          <Link to={`/location/edit/${actionId._id}`}>
            <EditFilled className={classes.action_icon} />
          </Link>
          <Link onClick={(e) => deleteHandler(actionId._id)}>
            <DeleteFilled className={classes.action_icon} />
          </Link>
        </Space>
      ),
    },
  ];

  let raw = JSON.stringify({
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
    length: 100,
    search: {
      value: "",
      regex: false,
    },
  });

  useEffect(() => {
    // all table data get api
    fetch(`${API}/admin/api/getPlaceManagementList`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: raw,
    })
      .then((response) => response.json())
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err.message));

    // sport list data api
    fetch(`${API}/admin/api/getAllSports`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => setAllSport(result.data))
      .catch((error) => console.log("error", error));
  }, []);

  const searchHandler = (searchInput) => {
    if (searchInput !== "") {
      let serchedUser = data.filter((user) => {
        return user.name.toLowerCase().indexOf(searchInput.toLowerCase()) >= 0;
      });
      setSearchResult(serchedUser);
      setIsSearched(true);
    } else {
      setIsSearched(false);
    }
  };
  // const selectHandler = (selectInput) => {
  //   if (selectInput !== "") {
  //     let selectSportName = allSport.filter((sportNamee) => {
  //       return (
  //         sportNamee.name.toLowerCase().indexOf(selectInput.toLowerCase()) >= 0
  //       );
  //     });
  //     console.log(
  //       "🚀 ~ file: Location_Management.js ~ line 219 ~ selectSportName ~ selectSportName",
  //       selectSportName
  //     );
  //     setSportResult(selectSportName);

  //     setIsSport(true);
  //   } else {
  //     setIsSport(false);
  //   }
  // };

  if (!token) {
    history.push("/login");
  }

  const Logout = () => {
    localStorage.removeItem("access_token");
    localStorage.clear();
    history.push("/");
  };

  return (
    <>
      <div style={{ display: "flex", marginTop: "15px" }}>
        <div style={{ marginLeft: "90%" }}>
          <Button type="primary">
            <NavLink to="/" onClick={Logout}>
              Log Out
            </NavLink>
          </Button>
        </div>
      </div>

      <Card className={classes.main_card}>
        <div className={classes.divLocationList}>
          <h1 className={classes.label}>Location List</h1>
          <Search
            placeholder="search location"
            allowClear
            onSearch={searchHandler}
            style={{
              maxWidth: "fit-content",
              justifyContent: "center",
              alignTtems: "center",
            }}
          />
          <div style={{ marginLeft: "45%", marginRight: "10px" }}>
            <Button type="primary">
              <NavLink to="/location/add">Add Location</NavLink>
            </Button>
          </div>
          <div>
            <Select
              placeholder="Select Sport Name"
              allowClear
              // onSelect={selectHandler}
              // value={isSport === false ? allSport : sportResult}
            >
              {allSport?.map((text) => (
                <Option key={text?._id} value={text?._id}>
                  {text.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <Table
          // className={classes.main_table}
          rowKey="id"
          columns={columns}
          dataSource={isSearched === false ? data : searchResult}
          pagination={true}
        ></Table>
      </Card>
    </>
  );
};

export default Location_Management;
