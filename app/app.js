import * as MODEL from "../model/model.js";

function initListeners() {
  $("#search").on("click", () => {
    let searchResult = $("#user-input").val();
    if (searchResult != "") {
      MODEL.getWeatherByLocation(searchResult);
      MODEL.getForecast(searchResult);
    } else {
      alert("Please enter a location");
    }
  });
}

$(document).ready(function () {
  initListeners();
});
