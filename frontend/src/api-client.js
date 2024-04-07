import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
export const signUp = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};
export const signIn = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};
export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Token Invalid");
  }
  const json = await response.json();
  return json;
};
export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};
export const fetchTweets = async (ticker) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDateOfMonth = currentDate.getDate() - 1;
  const fullDate = `${currentYear}-${currentMonth
    .toString()
    .padStart(2, "0")}-${currentDateOfMonth.toString().padStart(2, "0")}`;
  console.log(fullDate);
  const options = {
    method: "GET",
    url: "https://twitter154.p.rapidapi.com/search/search",
    params: {
      query: ticker,
      section: "top",
      min_retweets: "0",
      min_likes: "0",
      limit: "20",
      start_date: fullDate,
      language: "en",
    },
    headers: {
      "X-RapidAPI-Key": "395f2b3228msh1a2beb7b2b81380p1ee20ajsn3a57dde9dcc8",
      "X-RapidAPI-Host": "twitter154.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data.results);
    const res = response.data.results.map((tweet) => {
      return tweet.text;
    });
    console.log(res);
    return res;
  } catch (error) {
    return error.message;
  }
};
