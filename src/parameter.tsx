import { useProvider } from "./provider";
import { renderAudio } from "./audio";

export default function Parameter(props) {

  const [store, setStore] = useProvider();

  const set = (value, param) => {
    //setStore( 'sources', param, 'gain', value );
    //renderAudio(store, setStore);
  }

  // onMount( () => {
  //   setStore( [...store.sources, { id: ++sourceid, source: '', gain: '' }]); 
  //   console.log(store);
  // });

  return (
    <>
      <input 
        type="range"
        onInput={(e) => { set( e.currentTarget.value, props.parent ) } } 
        value={store[props.name] || 0}
        step="0.1"
        min="-20.00"
        max="6.00"
      />
      <output id={`output-${props.name}`}>{store[props.name] || 0}</output>
      <span>db</span>
    </>
  );
}