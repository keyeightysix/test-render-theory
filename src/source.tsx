import { useProvider } from "./provider";

export default function Source(props) {

  const [store, setStore] = useProvider();

  const select = (value, param) => {
    setStore( 'sources', param, 'source', value );
  };

  return (
    <>
      <span>Mute</span>
      <input type="checkbox" onChange={(e) => { setStore(props.name, e.currentTarget.value) } } value={store[props.name] || ''}/>
      <select onChange={ (e) => { select( e.currentTarget.value, props.name ) } }> 
        <option value="kick">Kick</option>
        <option value="bass">Bass</option>
        <option value="stab">Stab</option>
      </select>
      {props.children}
    </>
  );
}