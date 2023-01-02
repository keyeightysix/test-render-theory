import { onMount } from "solid-js";

import { useProvider } from "./provider";
import { renderAudio } from "./audio";

export default function Source(props) {

  const [store, setStore] = useProvider();

  const select = (value, param) => {
    //setStore( 'sources', param, 'source', value );

    //setStore( [...store.sources, { id: props.id, source: value }] );

    //setStore( [...store.sources, { id: props.id, source: value }] );
    // setStore( (theSource) => theSource[props.id] === id, "source", (source) => value );
    //setStore( (theSource) => theSource[props.id] === id, "source", (source) => value );

    console.log(store);
    //renderAudio(store, setStore);
  };

  // add something similar in the mixer & 
  // arrange sections when adding new sources.
  
  onMount( () => {
    //setStore( [...store.sources, { id: ++sourceid, source: '', gain: '' }]); 
    setStore( [...store.sources, { id: props.id, source: '', gain: '' }]);
    //setStore()
    console.log(store);
  });

  return (
    <div>
      <span>Mute</span>
      <input type="checkbox" onChange={(e) => { setStore(props.name, e.currentTarget.value) } } value={store[props.name] || ''}/>
      <select onChange={ (e) => { select( e.currentTarget.value, props.name ) } }>
        <option selected="selected">Select an instrument</option>
        <option value="kick">Kick</option>
        <option value="bass">Bass</option>
        <option value="stab">Stab</option>
      </select>
      {props.children}
    </div>
  );
}