let btn = document.getElementById("btn");
let searchInput = document.querySelector("input");
let cityName = document.querySelector("h2");
let backBackDiv = document.querySelector("#back");
let imgIcon = document.querySelector("img");
let temp = document.querySelector("#temp");
let header = document.querySelector("header");

console.log(searchInput);
searchInput.addEventListener("input", async function (e) {
  //   let city = "delhi";
  try {
    let key = "b85fb1b7531693be68592c88d144b971";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${key}&units=metric`;
    let result = await fetch(url);
    let originData = await result.json();
    if (originData.cod === 200) {
      cityName.innerText = originData.name;
      temp.textContent = originData.main.temp;
      if (originData.weather[0].description == "few clouds") {
        console.log("hello");
        header.classList.add("cloudy");
      } else if (originData.weather[0].description == "clear sky") {
        
        header.classList.add("sunny");
      }
      console.log(originData);
    } else if (e.target.value == "") {
      alert("please enter city");
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
