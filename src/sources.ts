// [Elementary]
import { el } from '@elemaudio/core';

export function kick(frequency, tick, sync) {
	//console.log(beat)

		let pitch = frequency;
    //let gate = el.train(2); // el.metro({interval: 250});
    let beat = el.seq({ seq: [1, 0, 0, 0, 1, 0, 0, 0], hold: false }, tick, sync);

    let env = el.adsr(0.01, 0.35, 0.1, 0.1, beat);

    let pitchenv = el.adsr(0.005, 0.03, 0.0, 0.0, beat);
    let clean = el.mul(
      env,
      el.cycle(
        el.mul(
          el.add(1, el.mul(2, pitchenv)),
          pitch,
        )
      )
    );

    return clean;
}

export function bass(frequency, tick, sync) {

	//let gate = el.train(6);
	let beat = el.seq({ seq: [0, 1, 0, 1], hold: false }, tick, sync);
	let env = el.adsr(0.25, 0.1, 0.1, 0.35, beat);
	let bass = el.mul( env, el.cycle(frequency) );

	return bass;
}


export function stab(root, frequency1, frequency2, frequency3, tick, sync) {

	//let gate = el.train(3);
	let beat = el.seq({ seq: [0, 0, 1, 0], hold: false }, tick, sync);

	let env = el.adsr(0.01, 0.1, 0.05, 1.2, beat);

	let rootNote = el.mul( env, el.blepsaw(root) );
	let note1 = el.mul( env, el.blepsaw(frequency1) );
	let note2 = el.mul( env, el.blepsaw(frequency2) );
	let note3 = el.mul( env, el.blepsaw(frequency3) );

	const stab = ( 
		el.add( 
			rootNote,
			note1,
			note2,
			note3
		)
	);

	return stab;
}