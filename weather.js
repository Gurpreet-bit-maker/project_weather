let btn = document.getElementById("btn");
let searchInput = document.querySelector("input");
let cityName = document.querySelector("h2");
let backBackDiv = document.querySelector("#back");
let imgIcon = document.querySelector("img");
let temp = document.querySelector("#temp");
let header = document.querySelector("header");
let h3 = document.querySelector("h3");
// imgIcon.src = '/projects images/checked.png'

console.log(searchInput);
searchInput.addEventListener("input", async function (e) {
  //   let city = "delhi";
  try {
    let key = "b85fb1b7531693be68592c88d144b971";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${key}&units=metric`;
    let result = await fetch(url);
    let originData = await result.json();
    let apiIcon;
    let srcId;
    // null
    if (e.target.value == "") {
      // alert("please enter city");
      cityName.innerText = "";
      imgIcon.src = "";
      header.classList.remove("cloud");
      header.classList.remove("rain");
      header.classList.remove("clear");
    }

    if (originData.cod === 200) {
      temp.textContent = originData.main.temp;
      if (originData.weather[0].main == "Clear") {
        cityName.innerText = originData.name;
        h3.innerText = "day";
        // console.log(originData.weather[0].main);
        apiIcon = originData.weather[0].icon;
        console.log(apiIcon);
        srcId = `https://openweathermap.org/img/wn/${apiIcon}@2x.png`;
        imgIcon.src = srcId;
        header.classList.remove("cloud");
        header.classList.remove("rain");
        header.classList.add("clear");
      } else if (originData.weather[0].main == "Clouds") {
        h3.innerText = "night";
        apiIcon = originData.weather[0].icon;
        console.log(apiIcon);
        srcId = `https://openweathermap.org/img/wn/${apiIcon}@2x.png`;
        imgIcon.src = srcId;
        header.classList.remove("clear");
        header.classList.remove("rain");
        header.classList.add("cloud");
        console.log(originData.weather[0].main);
      } else if (originData.weather[0].main == "Rain") {
        apiIcon = originData.weather[0].icon;
        console.log(apiIcon);
        srcId = `https://openweathermap.org/img/wn/${apiIcon}@2x.png`;
        imgIcon.src = srcId;
        console.log("ranny");
        header.classList.remove("clear");
        header.classList.remove("cloud");
        header.classList.add("rain");
      }

      console.log(originData);
    }

    // if (e.target.value == "delhi") {
    //   header.classList.add();

    //   console.log("correct");
    // } else if (e.target.value == "") {
    //   console.log("please enter a name");
    // }
  } catch (error) {
    console.log("data cannot finded", error);
  }
});
