const apiKey = "77bbf7f41fd03d8e145e8d78bdfe2d61";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

async function weather(city) {
  try {
    let response = await fetch(apiUrl + city + `&appid=${apiKey}&units=metric`);
    let data = await response.json();

    if (!data.name) {
      console.log("condition true");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "City does't exist or may be you miss spell it!",
      });
      return;
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " m/s";
    if (data.weather[0].main == "Clear") {
      let wh = document.querySelector(".mainimg");
      wh.src = "clear.png";
    } else if (data.weather[0].main == "Mist") {
      let wh = document.querySelector(".mainimg");
      wh.src = "mist.png";
    } else if (data.weather[0].main == "Drizzle") {
      let wh = document.querySelector(".mainimg");
      wh.src = "drizzle.png";
    } else if (data.weather[0].main == "Rain") {
      let wh = document.querySelector(".mainimg");
      wh.src = "rain.png";
    } else if (data.weather[0].main == "Snow") {
      let wh = document.querySelector(".mainimg");
      wh.src = "snow.png";
    } else if (data.weather[0].main == "Clouds") {
      let wh = document.querySelector(".mainimg");
      wh.src = "clouds.png";
    }
  } catch (error) {}
}
weather("karachi");

// Get button and input field
const input = document.querySelector(".input");
const btn = document.querySelector(".search");

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const city = input.value.trim();
    if (city) {
      weather(city);
    } else {
      alert("Please enter a city name.");
    }
  }
});

// Add event listener
btn.addEventListener("click", () => {
  const city = input.value.trim();
  if (city) {
    weather(city);
  } else {
    alert("Please enter a city name.");
  }
});
