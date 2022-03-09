import axios from "axios";

export const setAxiosAuthToken = token => {
  if (typeof token !== "undefined" && token) {
      // Apply for every request
      axios.defaults.headers.common["Authorization"] = "Token " + token;
  } else {
      // Delete auth header
      delete axios.defaults.headers.common["Authorization"];
  }
};

export const setToken = token => {
  localStorage.setItem("token", token);
};

export const setCurrentUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const unsetCurrentUser = () =>  {
  setAxiosAuthToken("");
  localStorage.clear();
};