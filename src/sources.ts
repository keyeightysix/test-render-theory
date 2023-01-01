// [Elementary]
import { el } from '@elemaudio/core';

export function kick(frequency) {

	let pitch = frequency;
    let gate = el.train(2); // el.metro({interval: 250});
    let env = el.adsr(0.01, 0.35, 0.0, 0.0, gate);

    let pitchenv = el.adsr(0.005, 0.03, 0.0, 0.0, gate);
    let clean = el.mul(
      env,
      el.cycle(
        el.mul(
          el.add(1, el.mul(2, pitchenv)),
          pitch,
        )
      )
    );

    return el.meter( { name: "kick" }, clean );
}

export function bass(frequency) {

	let gate = el.train(6);
	let env = el.adsr(0.01, 0.5, 1, 0.5, gate);

	let bass = el.mul( env, el.cycle(frequency) );

	return bass;
}


export function stab(root, frequency1, frequency2, frequency3) {

	let gate = el.train(3);
	let env = el.adsr(0.01, 0.2, 0.05, 0.1, gate);

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