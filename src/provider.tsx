import { createSignal, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

// [Elementary]
import WebRenderer from "@elemaudio/web-renderer";

// Going to have to build the sources initially, figure out 
//how to add them and/or add them via state (currently couldn't do this)

export const initialize = {
  context: null,
  core: new WebRenderer(),
  ElementaryReady: false,
  sources: {
    sourceOne: {
      gain: 0, 
      source: ''
    },
    sourceTwo: {
      gain: 0, 
      source: ''
    },
    sourceThree: {
      gain: 0, 
      source: ''
    }
  }
}

const theContext = createContext();

export function Provider(props) {
  const [store, setStore] = createStore(initialize);
  const pass = [store, setStore];

  return (
    <theContext.Provider value={pass}>
      {props.children}
    </theContext.Provider>
  );
}

export function useProvider() {
  return useContext(theContext);
}