import type { Component } from 'solid-js';

import { Provider, useProvider } from "./provider";
import Source from "./source";
import Parameter from "./parameter";

import { el } from '@elemaudio/core';//temp

import { renderAudio, stopAudio, initilizeAudioContext } from "./audio";

import logo from './logo.svg';
import styles from './App.module.css';

const App: Component = () => {

    const [state, setState] = useProvider();

    const initiate = async () => {

        setState( 'context', new window.AudioContext() );

        state.core.on('load', function () {
            setState( 'ElementaryReady', true );
        });

        // Browser
        const theContext = state.context;

        // craete main audio
        let node = await state.core.initialize(theContext, {
          numberOfInputs: 0,
          numberOfOutputs: 1,
          outputChannelCount: [2],
        });

        node.connect(theContext.destination);

        renderAudio(state, setState);

        //state.core.render( el.cycle(440));
    };

    return (
        <div class={styles.App}>
            <header class={styles.header}><input type="radio" onChange={initiate} /></header>
            <main>
                <Source name="sourceOne">
                    <Parameter parent="sourceOne" name="gainOne" />
                </ Source>
                <Source name="sourceTwo">
                    <Parameter parent="sourceTwo" name="gainTwo" />
                </ Source>
                <Source name="sourceThree">
                    <Parameter parent="sourceThree" name="gainThree" />
                </ Source>
            </main>
            <footer>
                <a class={styles.link} href="https://github.com/solidjs/solid" target="_blank" rel="noopener noreferrer">Learn Solid</a>
            </footer>
        </div>
  );
};

export default () => ( 
    <Provider>
        <App />
    </Provider>
);
