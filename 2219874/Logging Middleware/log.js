const axios = require('axios');

const API = "http://20.244.56.144/evaluation-service/logs";
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2YW5zaHJhanNvYW0xQGdtYWlsLmNvbSIsImV4cCI6MTc1MjU1NjcyNCwiaWF0IjoxNzUyNTU1ODI0LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNTUzYzhhOTAtMjcwNy00OWJmLTg0YjEtNmIwZmQ3ZjZhZWI3IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidmFuc2ggcmFqIHNvYW0iLCJzdWIiOiJhM2NiZTk1YS1jN2Q3LTRhNDMtYjI3MC0wNDJlMmU5MTQ1ZjcifSwiZW1haWwiOiJ2YW5zaHJhanNvYW0xQGdtYWlsLmNvbSIsIm5hbWUiOiJ2YW5zaCByYWogc29hbSIsInJvbGxObyI6IjIyMTk4NzQiLCJhY2Nlc3NDb2RlIjoiUUFoRFVyIiwiY2xpZW50SUQiOiJhM2NiZTk1YS1jN2Q3LTRhNDMtYjI3MC0wNDJlMmU5MTQ1ZjciLCJjbGllbnRTZWNyZXQiOiJ6Z2huQ0hybWVrRWFXRGJuIn0.v0X4KfNabxsEuGiC7UdaZcOo1VuW4C0ZevqXl69Gj5k";

async function Log(
  stack, // "backend" | "frontend"
  level, // "debug" | "info" | "warn" | "error" | "fatal"
  pkg,
  message
) {
  try {
    const res = await axios.post(API, {
      stack,
      level,
      package: pkg,
      message
    }, {
      headers: {
        Authorization: TOKEN,
        "Content-Type": "application/json"
      }
    });
    return res.data;
  } catch (err) {
    // Avoid logging errors causing crashes
  }
}

module.exports = { Log }; 