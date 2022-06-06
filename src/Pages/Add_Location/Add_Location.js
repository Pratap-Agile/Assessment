import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Card, Select } from "antd";
import { API } from "../../API/API";
import classes from "./Add_Location.module.css";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";

const { Option } = Select;

const Add_Location = () => {
  const history = useHistory();
  // const { _id } = useParams();
  const [chooseImage, setChooseImage] = useState();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  // const [sportAdd, setSportAdd] = useState("");
  const [allSport, setAllSport] = useState([]);
  const [verify, setVerify] = useState("");
  const [premium, setPremium] = useState("");

  const [sportsd, setSportsd] = useState();

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetch(`${API}/admin/api/getAllSports`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setAllSport(result.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const selectSportHandler = (value) => {
    setSportsd(value);
    // setSportAdd(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("images", chooseImage, "image");
    formdata.append("sportIds", sportsd);
    formdata.append("googlePlaceId", "ChIJN7yVhviFXjkRwcf0aTFYpNQ");
    formdata.append("name", name);
    formdata.append("address", address);
    formdata.append("isVerified", verify);
    formdata.append("isPremium", premium);

    axios({
      method: "post",
      url: `${API}/admin/api/addPlace`,
      headers: {
        Authorization: token,
      },
      data: formdata,
    })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const imageHandler = (event) => {
    setChooseImage(event.target.files[0]);
  };

  const backHandler = () => {
    history.push("/location");
  };

  const verifyCheck = () => {
    var checkBox = document.getElementById("myCheckVerify");

    if (checkBox.checked == true) {
      setVerify(true);
    } else {
      setVerify(false);
    }
  };

  const premiumCheck = () => {
    var checkBox = document.getElementById("myCheckPremium");

    if (checkBox.checked == true) {
      setPremium(true);
    } else {
      setPremium(false);
    }
  };

  if (!token) {
    history.push("/login");
  }

  return (
    <div>
      <Card className={classes.main_div}>
        <h1 className={classes.label}>Add New Location</h1>
        <form>
          <div className={classes.view_text}>
            <label className={classes.view_text_title}>
              Select Place Image
            </label>
            <input type="file" name="file" onChange={imageHandler} />
          </div>

          <div className={classes.view_text}>
            <label className={classes.view_text_title}>Place Name </label>
            <input
              style={{ background: "#E4E7EA" }}
              type="text"
              name="name"
              placeholder="Place Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={classes.view_text}>
            <label className={classes.view_text_title}>Place Address </label>
            <input
              style={{ background: "#E4E7EA" }}
              type="text"
              placeholder="Place Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className={classes.view_text}>
            <label className={classes.view_text_title}>
              Select Available Sports
            </label>
            <Select
              placeholder="Select Sport Name"
              allowClear
              onChange={selectSportHandler}
              style={{
                width: "40%",
              }}
              // onChange={(e) => setAllSport(e.target.value)}
            >
              {allSport?.map((text) => (
                <Option
                  onChange={(e) => setAllSport(e.target.value)}
                  key={text?._id}
                  value={text?._id}
                >
                  {text.name}
                </Option>
              ))}
            </Select>
          </div>

          <div className={classes.view_text}>
            <label className={classes.view_text_title}>Verify Location</label>
            <input
              type="checkbox"
              value={verify}
              id="myCheckVerify"
              onChange={verifyCheck}
            />
          </div>

          <div className={classes.view_text}>
            <label className={classes.view_text_title}>Premium Location</label>
            <input
              type="checkbox"
              value={premium}
              id="myCheckPremium"
              onChange={premiumCheck}
            />
          </div>

          <div className={classes.view_text}>
            <button
              type="button"
              onClick={onSubmitHandler}
              className={classes.update_button}
              value="Add"
            >
              add
            </button>
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

export default Add_Location;
