import { useEffect, useState } from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import Style from "../Styles/weatherApp.module.css";

const MyweatherApp = () => {
  const [cityName, setCityName] = useState("");

  const [weatherData, setWeatherData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  async function getweatherData() {
    try {
      setLoading(true);
      let API_KEY = process.env.REACT_APP_API_KEY;
      let response = await fetch(
        // `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${API_KEY}`

        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
      );

      let result = await response.json();
      console.log(result);

      if (result.cod == "404") {
        setError(result.message);
        console.log("Error occured");
      }
      if (result.cod !== "400" && result.cod !== "404") {
        setWeatherData(result);
        setError("");
      }
    } catch (error) {
      setError("An Error accurred while fetching request");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getweatherData();
  }, [cityName]);
  console.log("city name", cityName);
  // getweatherData();
  function convertToCelcius(temp) {
    let newTemp = temp - 273;
    return Math.floor(newTemp);
  }
  return (
    <>
      <div className={Style.bigBox}>
        <h1 className={Style.hOneHeading}>Weather App:</h1>
        <p className={Style.myCityName}>Enter Your City:</p>
    <div className={Style.loadingBox}>
        {loading && (
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{  justifycontent: "center"}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          
          />
        )}
        </div>
        <input
          className={Style.inputField}
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="City/Country: Name"
        />

        
        {error && <p style={{ color: "red" }}>Error : {error}</p>}
        {weatherData && (
          <div className={Style.insideBox}>
            <h3 className={Style.nameOfCity}>City Name :{weatherData.name} </h3>
            <h3 className={Style.countryName}>Country : {weatherData?.sys?.country}</h3>
            <h3 className={Style.description}>
              Description :{" "}
              {weatherData.weather && weatherData?.weather[0].description}{" "}
            </h3>

            {weatherData.weather && (
              <img
                src={`${weatherData?.weather[0].icon}.svg`}
                alt="img"
                style={{ width: "200px", height: "160px" }}
              />
            )}

            <h3 className={Style.temperature}>
              Temperature : {convertToCelcius(weatherData?.main?.temp)} celcius
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default MyweatherApp;
