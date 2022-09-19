const BASE_URL = "https://auth.nomoreparties.co/";

export const registration = (email, password) => {
  return fetch(`${BASE_URL}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .then(res => res)
  .catch(res => {
    console.log(res)
  });
};

export const authorization = (email, password) => {
  return fetch(`${BASE_URL}signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .then(res => res)
  .catch(res => {
    console.log(res)
  });
}
