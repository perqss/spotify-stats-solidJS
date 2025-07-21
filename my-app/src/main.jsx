import { render } from 'solid-js/web';
import App from './App';
import './App.css';
import Spotify from 'spotify-web-api-js';
import { getLocalAccessToken } from './common';

const s = new Spotify();

export const spotify = () => {
    s.setAccessToken(getLocalAccessToken());
    return s;
};

const root = document.getElementById('root');

render(() => <App />, root);
