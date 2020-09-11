import { all } from "redux-saga/effects";
import counter from "./counter";
// import home from "./home";
// import user from "./user";

export default function* () {
  yield all([...counter]);
}
