import { useProvider } from "./provider";
import { renderAudio } from "./audio";

export default function Transport(props) {

	const [store, setStore, setStoreRender] = useProvider();

	const playback = async (checked, action) => {

		if ( store.context === null ) {

			// #todo move all this to a different file managing audio 
			// # metering and playback features
			
			setStore( 'context', new window.AudioContext() );

	        store.core.on('load', function () {

	            setStore( 'ElementaryReady', true );

	            store.core.on('snapshot', function(e) {
	            	if ( e.source === "patternPos" ) {
              			setStore( 'matrixPosition', 16 * e.data );
              		}
            	});

	            store.core.on('meter', function(e) {

	            	// will need to put a check in here and give meters a multi-keyed source.
	            	// need to split channels and find a way to access store easily without 
	            	// messing with the keys to do it.
	            	// 
	            	setStore( 'channels', e.source, 'meter', [e.min, e.max] );
            	});
	        });

	        // Browser
	        const theContext = store.context;

	        // craete main audio
	        let node = await store.core.initialize(theContext, {
	          numberOfInputs: 0,
	          numberOfOutputs: 1,
	          outputChannelCount: [2],
	        });

	        node.connect(theContext.destination);
    	}

    	if ( action === 'play' && checked ) {
    		store.context.resume();
    		setStoreRender( ['transport', 'playing', true] );
    	}

    	if ( action === 'stop' && checked ) {
    		store.context.suspend();
    		setStoreRender( ['transport', 'playing', false] );
    	}
	}

	const setbpm = (value) => {
		setStoreRender( [ 'transport', 'bpm', value] );
	}

	return (
		<section class="transport">
			<div class="matrix-playhead">
				<span style={{transform: `translateX(${store.matrixPosition * 10}px)`}}></span>
			</div>
			<div class="tempo">
				<input type="number" onInput={ (e) => { setbpm( e.currentTarget.value ) } } value={store.transport.bpm} />
			</div>
			<div class="playback-ui">
				<label>▶<input type="radio" name="transport_playback" value="play" onChange={ (e) => { playback(e.currentTarget.checked, 'play' ) } } /></label>
				<label>■<input type="radio" name="transport_playback" value="stop" onChange={ (e) => { playback(e.currentTarget.checked, 'stop' ) } }/></label>
			</div>
		</section>
	);
}