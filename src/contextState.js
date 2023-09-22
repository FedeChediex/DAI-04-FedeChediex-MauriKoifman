import React, { useContext } from "react";

export const initialState = {
  loading: false,
  allRecipes: [],
  userToken: "",
};

export const ActionTypes = {
  setLoading: "SET_LOADING",
  setRecipes: "SET_RECIPES",
  setUserToken: "Set_USER_TOKEN",
};

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.setLoading: {
      return { ...state, loading: action.newValue };
    }
    case ActionTypes.setComidas: {
      return { ...state, allComidas: action.newValue };
    }
    case ActionTypes.setUserToken: {
      return { ...state, userToken: action.newValue };
    }
    case ActionTypes.setMenu: {
      return { ...state, menu: action.newValue };
    }
    default: {
      return state;
    }
  }
};

export const initialContext = {
  contextState: initialState,
  setContextState: () => {},
};

const Context = React.createContext(initialContext);

export function ContextProvider({ children, initialState = initialState }) {
  const [contextState, setContextState] = React.useReducer(
    reducer,
    initialState
  );

  return (
    <Context.Provider value={{ contextState, setContextState }}>
      {children}
    </Context.Provider>
  );
}

export const useContextState = () => useContext(Context);