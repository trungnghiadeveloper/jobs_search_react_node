// Function Recharge

import React, { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@material-ui/core";
import axios from "axios";
import apiList from "../lib/apiList";

const Recharge = () => {
  // Local State
  const [inputValue, setInputValue] = useState(null);
  const [imageResult, setImageResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Event Handlers
  const handleChange = (e) => {
    const { value } = e.target;
    if (!isNaN(value) && parseInt(value) >= 2) {
      setInputValue(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      price: inputValue,
    };

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(apiList.recharge, data, config)
      .then(function (response) {
        console.log(response);
        setImageResult(response.data.image);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleResetTopUp = () => {
    setInputValue("");
    setImageResult("");
    setIsImageLoaded(false);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "90vh", background: "#fff" }}
      >
        <Grid item xs={3}>
          {isLoading && <CircularProgress />}

          {imageResult ? (
            <>
              {!isImageLoaded ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "90vh",
                      background: "#fff",
                    }}
                  >
                    <Card
                      variant="outlined"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 400,
                        padding: "20px 0",
                        margin: "auto",
                      }}
                    >
                      <CardContent
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <CircularProgress />
                      </CardContent>
                      <CardContent
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="h5" component="div">
                          Generating QR...
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                  <img
                    src={imageResult}
                    style={{ width: "70%", height: "70%", opacity: 0 }}
                    alt="Recharge Success"
                    loading="lazy"
                    onLoad={handleImageLoad}
                  />
                </>
              ) : (
                <>
                  {/* Form khi load ảnh xong */}
                  <Typography variant="h4" align="center" gutterBottom>
                    Success Recharge
                  </Typography>
                  <FormControl fullWidth>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={imageResult}
                        style={{
                          width: "70%",
                          height: "70%",
                          marginBottom: "10px",
                        }}
                        alt="Recharge Success"
                        loading="lazy"
                        onLoad={handleImageLoad}
                      />
                    </div>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#3f51b5", color: "#ffffff" }}
                      onClick={handleResetTopUp}
                      disabled={!isImageLoaded}
                    >
                      Continune Top Up
                    </Button>
                  </FormControl>
                </>
              )}
            </>
          ) : (
            <>
              {/* Form khi mới nạp tiền */}
              <Typography variant="h4" align="center" gutterBottom>
                Recharge Page
              </Typography>
              <FormControl fullWidth sx={{ m: 1 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Enter the amount to top up:
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Amount"
                  variant="outlined"
                  type="number"
                  value={inputValue}
                  onChange={handleChange}
                />
                <Typography
                  variant="subtitle1"
                  style={{ color: "red", marginBottom: "15px" }}
                >
                  Conversion: 2 tokens = 1,000vnd
                </Typography>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#3f51b5", color: "#ffffff" }}
                  onClick={handleSubmit}
                >
                  Top Up
                </Button>
              </FormControl>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Recharge;
