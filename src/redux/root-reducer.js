import { combineReducers } from "redux";
import User from "./users/user.reducer";
import weatherReducer from "./weather/weather.reducer";
import searchReducer from "./flights/search.reducer";
import trackReducer from "./track/track.reducer";
import plugsReducer from "./plugs/plugs.reducer";

const rootReducer = combineReducers({
  user: User,
  weather: weatherReducer,
  search: searchReducer,
  track: trackReducer,
  plugs:plugsReducer,
});

export default rootReducer;
