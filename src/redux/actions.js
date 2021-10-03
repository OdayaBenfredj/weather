
export function getWeather(city) {
  return { type: 'GET_WEATHER', payload: city };
}

export function addToHistory(searchRes) {
  return { type: 'ADD_TO_HISTORY', payload: searchRes };
}

export function setLoginUser(userId) {
  return { type: 'LOGIN_USER', payload: userId };
}

export function initHistory(history) {
  return { type: 'INIT_HISTORY', payload: history };
}



//לשמור מי עשה לוגין
//להביא היסטורי
//לקבל עיר ולשמור בהיסטורי ולהחזיר לריאקט.






