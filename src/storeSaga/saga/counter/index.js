import {
  take,
  put,
  fork,
  select,
  // takeEvery,
  // takeLatest,
} from "redux-saga/effects";

function* watchIncCount() {
  while (true) {
    // 获取reducers中state所有的值
    let rootState = yield select();
    console.log(rootState, "@@@@@@@@@@@@@@store@@@@@@@@@@@@@");
    // 监听action的dispatch传过来的type
    let action = yield take("INC");
    // put将action里面的值传递给reducer
    yield put({ type: "inc", data: action.data });
  }
}

function* watchDecCount() {
  // 1.传统写法
  while (true) {
    // 监听action的dispatch传过来的type
    let action = yield take("DEC");
    // put将action里面的值传递给reducer
    yield put({ type: "dec", data: action.data });
  }

  // 2.并发监听
  // yield takeEvery("DEC", function *(action){
  //   yield put({type: "dec", data: action.data});
  // })

  // 3.非并发监听
  // yield takeLatest("DEC", function* (action) {
  //   yield put({ type: "dec", data: action.data });
  // });
}

export default [fork(watchIncCount), fork(watchDecCount)];
