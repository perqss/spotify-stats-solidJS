/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import App from './App';
import Spotify from 'spotify-web-api-js';
import { getLocalAccessToken } from './common';

const s = new Spotify();

export const spotify = () => {
    s.setAccessToken(getLocalAccessToken());
    return s;
};

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => <App />, root);
