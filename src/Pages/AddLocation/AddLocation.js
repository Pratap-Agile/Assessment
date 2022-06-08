import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Card, Select, Alert, Spin } from "antd";
import { API } from "../../API/API";
import classes from "./AddLocation.module.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

const { Option } = Select;

const AddLocation = () => {
  const history = useHistory();
  const [chooseImage, setChooseImage] = useState();
  console.log(
    "🚀 ~ file: AddLocation.js ~ line 14 ~ AddLocation ~ chooseImage",
    chooseImage
  );

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  // const [sportAdd, setSportAdd] = useState("");
  const [allSport, setAllSport] = useState([]);
  const [verify, setVerify] = useState("");
  const [premium, setPremium] = useState("");
  const [sportsd, setSportsd] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState("");

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((error) => {
        setHasError(error);
      });
  }, []);

  const selectSportHandler = (value) => {
    setSportsd(value);
    // setSportAdd(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("images", chooseImage);
    // formdata.append("sportIds", sportsd);
    // formdata.append("googlePlaceId", "ChIJN7yVhviFXjkRwcf0aTFYpNQ");
    // formdata.append("name", name);
    // formdata.append("address", address);
    // formdata.append("isVerified", verify);
    // formdata.append("isPremium", premium);

    formdata.append("sportIds", "605b1b93f97445412338267b");
    formdata.append("googlePlaceId", "ChIJMUxetS6FXjkRWwj3CdP44WQ");
    formdata.append("name", "Jivraj erte");
    formdata.append("address", "Jivraj Park, erter, Gujarat, India");
    formdata.append("isVerified", "true");
    formdata.append("isPremium", "true");
    axios({
      method: "post",
      url: `${API}/admin/api/addPlace`,
      headers: {
        Authorization: token,
      },
      data: formdata,
    })
      .then(function (response) {
        setIsLoading(false);
        alert("Place update succesfully!");
        history.push("/location");
      })
      .catch(function (error) {
        setHasError(error);
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
              {hasError && <p>Something went wrong</p>}
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
              <label className={classes.view_text_title}>
                Premium Location
              </label>
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
        )}
      </Card>
    </div>
  );
};

export default AddLocation;
