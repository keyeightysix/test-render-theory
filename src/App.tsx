import type { Component } from 'solid-js';

import { Provider, useProvider } from "./provider";
import Channels from "./channels";
import Source from "./source";
import Parameter from "./parameter";
import Transport from "./transport";

import { el } from '@elemaudio/core';//temp

import { renderAudio, stopAudio, initilizeAudioContext } from "./audio";

import logo from './logo.svg';
import styles from './App.module.css';

const App: Component = () => {

    const [state, setState] = useProvider();

    return (
        <div class={styles.App}>
            <header class={styles.header}><h1>Thinking in Render & State</h1></header>
            <main>
                <Transport />
                <Channels />
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
