import { onMount, createEffect, For, Index } from "solid-js";
import { throttle } from "@solid-primitives/scheduled";

import { useProvider } from "./provider";
import { renderAudio } from "./audio";
import { clamp } from "./utils";

export default function Channels(props) {

  const [store, setStore] = useProvider();

  const addNewChannel = () => {
    setStore({
      idChannelCount: store.idChannelCount + 1,
      channels: [
        ...store.channels,
        {
          id: store.idChannelCount,
          source: 'default',
          gain: 0,
          mute: false,
          meter: 0
        }
      ]
    });
  };

  const selectInstrument = (id, value) => {
    setStore( 'channels', id, 'source', value);
    renderAudio(store, setStore);
  }

  const setMute = (id, value) => {
    const checked = ( value ? 'checked' : '' );
    setStore( 'channels', id, 'mute', checked);
    renderAudio(store, setStore);
  }

  const setGain = (id, value) => {

    setStore( 'channels', id, 'gain', value);
    const doGain = throttle( () => renderAudio(store, setStore), 350 );
    doGain();
    //renderAudio(store, setStore);
  }

  return (
    <>

    <For each={store.channels}>{(channel) =>

      <div>

        <h3>{channel.id + 1}</h3>

        <select value={channel.source} onChange={ (e) => { selectInstrument( channel.id, e.currentTarget.value ) } }>
          <option value="default">Select an instrument</option>
          <option value="kick">Kick</option>
          <option value="bass">Bass</option>
          <option value="stab">Stab</option>
        </select>

        <div class="module module-channel">
            <div class="meter">
                <span style={{ height: `${ clamp( Math.sqrt( channel.meter[1] ) * 100, 0, 100 ) }%`}}></span>
            </div>
            <div class="meter">
                <span style={{ height: `${ clamp( Math.sqrt( channel.meter[1] ) * 100, 0, 100 ) }%`}}></span>
            </div>
        </div>

        <input 
          type="range"
          onInput={(e) => { setGain( channel.id, e.currentTarget.value) } } 
          value={store.channels[channel.id]['gain'] || 0}
          step="1"
          min="0"
          max="100"
        />
        <output id={`output-${channel.id}`}>{store.channels[channel.id]['gain'] || 0}</output>
        <span></span>

        <label>M<input type="checkbox" onChange={ (e) => { setMute( channel.id, e.currentTarget.checked ) } } checked={ store.channels[channel.id]['mute'] }/></label>

      </div>

    }</For>

    <button onclick={addNewChannel}>+</button>

    </>
  );
}
