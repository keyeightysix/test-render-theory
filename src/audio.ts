import { el } from '@elemaudio/core';

import { kick, bass, stab } from "./sources";
import { useProvider } from "./provider";
import { bpmToHz } from "./utils";

/**
 * Main render function, takes state and builds the complete
 * Audio graph for rendering, then renders it.
 *
 * @param      {<type>}  state     The state
 * @param      {<type>}  setState  The set state
 */
export function renderAudio(state, setState) {

	console.log( state );
	//console.log( state.channels );

	// Play Head | Tempo | Sequance | Time -----------------------------------------------------------------
	
	let bpm = state.transport.bpm;
	let bpmAsHz = el.const({ key: "bpm:hz", value: bpmToHz(bpm, 1) });
  let tick = el.train(el.mul(bpmAsHz, 16));
  let sync = el.seq({ seq: [1, ...Array(15).fill(0)], hold: false }, tick, 0);

  let signal = el.const({ value: 0 });

	let playheadTrain = el.phasor(bpmAsHz, sync);
	let playheadSignal = el.snapshot(
		{ name: "patternPos" },
		tick,
		playheadTrain
	);

	signal = el.add(signal, el.mul(0, playheadSignal));

	console.log(playheadSignal);

	// ---------------------------------------------------------------------------------------------------

	const audio = [];
	let source;
	let sourceOut;

	state.channels.forEach( channel => {

		if ( channel.source === 'default' ) {
			return false;
		}

		if ( channel.source === 'kick' ) {
			source = kick(65.41, tick, sync);
		}

		if ( channel.source === 'bass' ) {
			source = bass(82.41, tick, sync);
		}

		if ( channel.source === 'stab' ) {
			source = stab(349.23, 440.00, 523.25, 329.63, tick, sync);
		}

		sourceOut = el.add( signal, el.mul( source, ( channel.gain / 100 ) ) );

		if ( channel.mute === 'checked' ) {

			sourceOut = el.add( signal, el.mul( source, ( 0 / 100 ) ) );
			audio.push( el.add( sourceOut, el.meter( { name: channel.id }, sourceOut ) ) );
			return false;
		}

		audio.push( el.add( sourceOut, el.meter( { name: channel.id }, sourceOut ) ) );
	});

	const poop = el.add(...audio);
	state.core.render(poop,poop);
}

export function stopAudio() {
	//core.render(0,0);
}

// export async function initilizeAudioContext(globalContext) {

//     setState( {
//       	context: new window.AudioContext()
//     });

//     state.core.on('load', function () {
//       	setState( { ElementaryReady: true } );
//     });
// }