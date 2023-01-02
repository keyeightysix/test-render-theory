import { createSignal, createContext, useContext, onMount, createEffect } from "solid-js";
import { createStore } from "solid-js/store";

// [Elementary]
import WebRenderer from "@elemaudio/web-renderer";

// Going to have to build the sources initially, figure out 
//how to add them and/or add them via state (currently couldn't do this)

// Will have to do some caching here
// As well as splitting out into finer grained contexts

export const initialize = {
  transport: {
    bpm: 70,
    playing: false
  },
  context: null,
  core: new WebRenderer(),
  ElementaryReady: false,
  idChannelCount: 3, // move to separate store later?
  channels: [ // build from a config/template for example load project with 3 channels
    { id: 0, source: 'kick', gain: 5, mute: '', meter: [0,0] },
    { id: 1, source: 'stab', gain: 5, mute: '', meter: [0,0] },
    { id: 2, source: 'bass', gain: 5, mute: '', meter: [0,0] }
  ],
  master: {
    gain: 0,
    meterLeft: 0,
    meterRight: 0,
    inserts: []
  } // move to separate store later?
}

console.log(initialize);

const theContext = createContext();

// const [store, setStoreOrigin] = createStore<LearningModule>(initialModules);
// const [triggerUpdate, setTriggerUpdating] = createSignal(1);
// const setStore: typeof setStoreOrigin = (...args) => {
//     setTriggerUpdating((v) => v + 1);
//     setStoreOrigin(...args);
// };

//  createEffect(() => {
//     console.log(triggerUpdate());
//     console.log(unwrap(store));
// });

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