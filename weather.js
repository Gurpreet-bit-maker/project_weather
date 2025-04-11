let btn = document.getElementById("btn");
let searchInput = document.querySelector("input");
let cityName = document.querySelector("h4");
let backBackDiv = document.querySelector("#back");
let imgIcon = document.querySelector("img");
let temp = document.querySelector("#temp");
let header = document.querySelector("header");
let h3 = document.querySelector("h3");
let cloudy = document.querySelector("#cloudy");

imgIcon.style.display = "none";
btn.addEventListener("click", async function () {
  try {
    let key = "b85fb1b7531693be68592c88d144b971";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${key}&units=metric`;
    let result = await fetch(url);
    let originData = await result.json();
    //     let forcast = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&appid=${key}&units=metric
    // `;
    //     let res = await fetch(forcast);
    //     let resu = await res.json();
    //     console.log(resu);
    //     resu.list.forEach((element) => {
    //       console.log(element);
    //     });
    let apiIcon;
    let srcId;
    // if saurce code 200
    if (originData.cod === 200) {
      temp.textContent = originData.main.temp;
      let date = originData.dt;
      let realTime = new Date(date * 1000);
      let weekday = realTime.toLocaleDateString("eng-US", { weekday: "long" });
      let month = realTime.toLocaleDateString("eng-US", { month: "long" });
      let day = realTime.toLocaleDateString("eng-US", { day: "numeric" });
      let temprature = originData.main.temp;
      let perfectTemp = parseInt(temprature.toFixed(2));
      imgIcon.style.display = "block";

      if (originData.weather[0].main == "Clear") {
        cityName.innerText = originData.name;
        h3.innerText = `${weekday}, ${month} ${day}`;
        apiIcon = originData.weather[0].icon;
        srcId = `https://openweathermap.org/img/wn/${apiIcon}@2x.png`;
        imgIcon.src = srcId;
        cloudy.innerText = originData.weather[0].description;
        temp.innerText = `${perfectTemp}°`;

        backBackDiv.classList.remove("cloud");
        backBackDiv.classList.remove("rain");
        backBackDiv.classList.add("clear");
      } else if (originData.weather[0].main == "Clouds") {
        cityName.innerText = originData.name;
        h3.innerText = `${weekday}, ${month} ${day}`;

        apiIcon = originData.weather[0].icon;
        srcId = `https://openweathermap.org/img/wn/${apiIcon}@2x.png`;
        imgIcon.src = srcId;

        cloudy.innerText = originData.weather[0].main;
        temp.innerText = `${perfectTemp}°`;
        console.log(perfectTemp);
        backBackDiv.classList.remove("clear");
        backBackDiv.classList.remove("rain");
        backBackDiv.classList.add("cloud");
        console.log(originData.weather[0].main);
      } else if (originData.weather[0].main == "Rain") {
        cityName.innerText = originData.name;
        h3.innerText = `${weekday}, ${month} ${day}`;

        apiIcon = originData.weather[0].icon;
        srcId = `https://openweathermap.org/img/wn/${apiIcon}@2x.png`;
        imgIcon.src = srcId;

        temp.innerText = `${perfectTemp}°`;
        cloudy.innerText = originData.weather[0].main;
        backBackDiv.classList.remove("clear");
        backBackDiv.classList.remove("cloud");
        backBackDiv.classList.add("rain");
      }
      console.log(originData);
    } else {
      if (searchInput.value == "") {
        alert("please enter city");
        cityName.innerText = "Welcome to weather app";
        h3.innerText = "";
        cloudy.innerText = "";
        temp.innerText = "";
        document.querySelector("img").remove();
        backBackDiv.classList.remove("cloud");
        backBackDiv.classList.remove("rain");
        backBackDiv.classList.remove("clear");
        console.log("search empty");
        location.reload(); //! impotent good
      } else {
        alert("wrong enter");
      }
    }
    searchInput.value = "";
  } catch (error) {
    console.log("data cannot finded", error);
  }
});
