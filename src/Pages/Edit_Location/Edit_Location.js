import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Card, Select } from "antd";
import classes from "./Edit_Location.module.css";
import { useParams } from "react-router";
import { API } from "../../API/API";
import { useHistory } from "react-router-dom";

const { Option } = Select;

const Edit_location = () => {
  const history = useHistory();

  const { id } = useParams();
  const [place, setPlace] = useState({});
  console.log("button update", place);
  const [sport, setsport] = useState({});
  const [allSport, setAllSport] = useState([]);

  // const [placeName, setPlaceName] = useState("");
  // console.log(placeName);

  const token = localStorage.getItem("access_token");

  //getplace details api header
  const myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  var urlencoded = new URLSearchParams();
  urlencoded.append("placeId", id);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };
  //getplace details end

  //Sport imge start
  const myHeadersSport = new Headers();
  myHeadersSport.append("Content-Type", "application/json");
  myHeadersSport.append("Authorization", token);

  const rawSport = JSON.stringify({
    // sport api code
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
          value: "c",
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

  const requestOptionsSport = {
    method: "POST",
    headers: myHeadersSport,
    body: rawSport,
  };
  //sport imge end

  //EDit update Start
  const myHeadersEdit = new Headers();
  myHeadersEdit.append("Authorization", token);
  myHeadersEdit.append("Content-Type", "application/json");

  // edit api body

  const rawEdit = JSON.stringify({
    placeId: id,
    sportIds: ["605c68795b3a1e3260cf2a23", "60e3ddff02e66a45d5e87e64"],
    isVerified: true,
    isPremium: false,
  });

  const requestOptionsEdit = {
    method: "POST",
    headers: myHeadersEdit,
    body: rawEdit,
    redirect: "follow",
  };
  //Edit End

  //all sport
  var requestOptionsAllSport = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(`${API}/admin/api/getPlaceDetails`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log("main get place details api",(result));
        setPlace(result);
      })
      .catch((error) => console.log("error", error));

    fetch(`${API}/admin/api/getSportsList`, requestOptionsSport)
      .then((response) => response.json())
      .then((result) => {
        console.log("sport api", result);
        setsport(result);
      })
      .catch((error) => console.log("error", error));

    // All get sport api fetch
    fetch(`${API}/admin/api/getAllSports`, requestOptionsAllSport)
      .then((response) => response.json())
      .then((result) => {
        // console.log(
        //   "all sport",
        //   result.data.forEach((element) => {
        //     console.log(element?.name);
        //   })
        // );
        setAllSport(result.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const updateHandler = (e) => {
    e.preventDefault();
    fetch(`${API}/admin/api/editPlace`, requestOptionsEdit)
      .then((response) => response.json())
      .then((result) => setPlace(result))
      .catch((error) => console.log("error", error));
  };

  const backHandler = () => {
    console.log("hello");
    history.push("/location");
  };

  const handleChange = (value, e) => {
    console.log();
    setsport(`selected ${value}`);
  };

  return (
    <div>
      <Card className={classes.main_div}>
        <h1 className={classes.label}>Edit Location's Available Sports</h1>
        <form>
          {/* <br />
        <label htmlFor="firstname">Place Image :- </label>
        <img src={sport?.data?.data[0]?.image} /> */}

          <div className={classes.view_text}>
            <label className={classes.view_text_title}>Place Name </label>
            <input
              style={{ background: "#E4E7EA" }}
              type="text"
              name="name"
              placeholder="Place Name"
              disabled
              onChange={(e) => setPlace(e.target.value)}
              value={place?.data?.name}
            />
          </div>

          <div className={classes.view_text}>
            <label className={classes.view_text_title}>Place Address </label>
            <input
              style={{ background: "#E4E7EA" }}
              type="text"
              placeholder="Place Address"
              onChange={(e) => setPlace(e.target.value)}
              disabled
              value={place?.data?.address}
            />
          </div>

          <div className={classes.view_text}>
            <label className={classes.view_text_title}>
              Place Phone Number{" "}
            </label>
            <input
              type="number"
              placeholder="Place Phone Number"
              value={place?.data?.placeContact}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>

          <div className={classes.view_text}>
            <label className={classes.view_text_title}>Place Website </label>
            <input
              type="text"
              placeholder="Place Website"
              value={place?.data?.placeWebsite}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>

          <div className={classes.view_text}>
            <label className={classes.view_text_title}>
              Select Available Sports
            </label>
            <Select
              mode="multiple"
              placeholder="Select Sport Name"
              allowClear
              style={{
                width: "50%",
              }}
              defaultValue={sport?.data?.data[0]?.name}
              onChange={handleChange}
            >
              {allSport?.map((text) => (
                <Option key={text?._id} value={text?._id}>
                  {text.name}
                </Option>
              ))}
            </Select>
          </div>

          <div className={classes.view_text}>
            <label className={classes.view_text_title}>Verify Location</label>
            <input
              type="checkbox"
              checked={place?.data?.isVerified}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>

          <div className={classes.view_text}>
            <label className={classes.view_text_title}>Premium Location</label>
            <input
              type="checkbox"
              checked={place?.data?.isPremium}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
          <div className={classes.view_text}>
            <input
              className={classes.update_button}
              type="submit"
              value="Update"
              onClick={updateHandler}
            />
            <input
              className={classes.update_button}
              type="button"
              value="Back"
              onClick={backHandler}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Edit_location;
