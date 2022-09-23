const BASE_URL = "https://auth.nomoreparties.co/";

const request = ({ url, method = "POST", data, token }) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  return fetch(`${BASE_URL}${url}`, config);
};

export const registration = (data) => {
  return request({
    url: "signup",
    data,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

export const authorization = (data) => {
  return request({
    url: "signin",
    data,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

export const getContent = (token) => {
  return request({
    url: "users/me",
    method: "GET",
    token,
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};
