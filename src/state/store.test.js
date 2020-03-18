import * as actions from "./actions/auth";
import * as types from "./types/index";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as axiosMock from "../utils/axios";

jest.mock("../utils/axios");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Auth actions", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("Login action dispatches LOGIN_START and LOGIN_SUCCESS on resolve from backend", () => {
    //set axios moxk to resolve once
    const axiosPost = jest
      .fn()
      .mockResolvedValueOnce({data: {data: {user: "HEY", token: "BABY"}}});
    axiosMock.justAxios = () => {
      return {
        post: axiosPost,
      };
    };

    //mock store in initial state
    const store = mockStore({
      auth: {
        isLoggedIn: false,
        user: {},
        token: null,
      },
    });
    const expectedActions = [
      {type: types.LOGIN_START},
      {type: types.LOGIN_SUCCESS, payload: {user: "HEY", token: "BABY"}},
    ];
    return store
      .dispatch(actions.login({username: "BABY", password: "OOOH"}))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
        expect(axiosPost).toHaveBeenCalledWith("/auth/login", {
          username: "BABY",
          password: "OOOH",
        });
      });
  });

  test("Login action throws on backend error", async () => {
    //Arrange
    //set axios mock to reject once
    axiosMock.justAxios = () => {
      return {
        post: jest.fn().mockRejectedValue({message: "ERROR!!!"}),
      };
    };
    const spy = jest.fn();
    await actions
      .login()(() => null)
      .catch(spy);
    //Act & Assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({message: "ERROR!!!"});
  });

  test("registerNewUser action dispatches REGISTER SUCCESS on succesfull request", () => {
    //set axios mock to resolve once
    const axiosPost = jest
      .fn()
      .mockResolvedValueOnce({data: {data: {user: "HEY", token: "BABY"}}});

    axiosMock.justAxios = () => {
      return {
        post: axiosPost,
      };
    };
    //mock store in initial state
    const store = mockStore();
    const expectedActions = [
      {type: types.REGISTER_SUCCESS, payload: {user: "HEY", token: "BABY"}},
    ];
    return store
      .dispatch(actions.registerNewUser({username: "BABY", password: "OOOH"}))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
        expect(axiosPost).toHaveBeenCalledWith("/auth/register", {
          username: "BABY",
          password: "OOOH",
        });
      });
  });

  test("addRecoveryPassword action dispatches LOGIN_SUCCESS on succesfull request", () => {
    //Arrange
    //set axios mock to resolve once
    const axiosPost = jest
      .fn()
      .mockResolvedValueOnce({data: {data: {user: "HEY", token: "BABY"}}});

    axiosMock.justAxios = () => {
      return {
        post: axiosPost,
      };
    };
    //mock store in initial state
    const store = mockStore();
    const expectedActions = [
      {type: types.LOGIN_SUCCESS, payload: {user: "HEY", token: "BABY"}},
    ];
    //ACT
    return store.dispatch(actions.addRecoveryPassword("BABYYY", "TOKEN")).then(() => {
      // return of async actions
      //ASSERT
      expect(store.getActions()).toEqual(expectedActions);
      expect(axiosPost).toHaveBeenCalledWith(
        "/auth/recovery",
        {password: "BABYYY"},
        {
          headers: {Authorization: "TOKEN"},
        }
      );
    });
  });

  test("googleAuthorized action dispatches LOGIN_START & LOGIN_SUCCESS on succesfull request", () => {
    //Arrange
    //set axios mock to resolve once
    let postMock = jest
      .fn()
      .mockResolvedValueOnce({data: {data: {user: "HEY", token: "BABY"}}});
    axiosMock.axiosWithAuth = () => {
      return {
        post: postMock,
      };
    };
    //mock store in initial state
    const store = mockStore();
    const expectedActions = [
      {type: types.LOGIN_START},
      {type: types.LOGIN_SUCCESS, payload: {user: "HEY", token: "BABY"}},
    ];
    //ACT
    return store
      .dispatch(actions.googleAuthorized("TOKEN", {push: jest.fn()}))
      .then(() => {
        // return of async actions
        //ASSERT
        expect(store.getActions()).toEqual(expectedActions);
        expect(postMock).toHaveBeenCalledWith("/auth/google/TOKEN");
      });
  });
});
