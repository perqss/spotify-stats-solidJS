import { createSignal, createEffect } from 'solid-js';
import { useNavigate } from '@solidjs/router'; 
import logo from '../logo.svg';
import '../App.css';
import { Button } from '@suid/material';
import { spotifyGreen, getLoginUrl, getLocalAccessToken, getCodeFromUrl, getTokens, checkIfTokenHasExpired } from './common';

const Login = (props) => {
  const navigate = useNavigate();
  const [loginUrl, setLoginUrl] = createSignal('');

  createEffect(() => {
    const code = getCodeFromUrl();
    if (code) {
      const afterLogIn = async () => {
        await getTokens(code);
        navigate('/top-artists');
      };
      afterLogIn();
    } else if (getLocalAccessToken() !== 'undefined') {
      const refreshToken = async () => {
        await checkIfTokenHasExpired();
        navigate('/top-artists');
      };
      refreshToken();
    }
  });

  createEffect(() => {
    getLoginUrl().then((login) => setLoginUrl(login));
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button
          href={loginUrl()}
          variant="contained"
          sx={{
            backgroundColor: spotifyGreen,
            color: 'black',
            '&:hover': {
              backgroundColor: '#68bd72',
            },
          }}
        >
          Log in with Spotify
        </Button>
      </header>
    </div>
  );
};

export default Login;
