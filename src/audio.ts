import { el } from '@elemaudio/core';

import { kick, bass, stab } from "./sources";
import { useProvider } from "./provider";

export function renderAudio(state, setState) {

	console.log( state );

	const audioGraph = {
		sources: [
			{ sound: kick(69.30), gain: '15', mute: false },
			{ sound: bass(34.65), gain: '20', mute: false },
			{ sound: stab(311.127, 369.994, 466.164, 523.25), gain: '10', mute: false }
		]
	}

	const audio = [];

	const soundSources = audioGraph.sources;
	soundSources.forEach( source => {
		audio.push( el.mul( source.sound, ( source.gain / 100 ) ) );
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