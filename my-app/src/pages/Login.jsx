import { createSignal, createEffect } from 'solid-js';
import { useNavigate } from '@solidjs/router'; 
import logo from '../logo.svg';
import { Button } from '@suid/material';
import { spotifyGreen, getLoginUrl, getLocalAccessToken, getCodeFromUrl, getTokens, checkIfTokenHasExpired } from '../common';
import styles from '../App.module.css'

const Login = (props) => {
  const navigate = useNavigate();
  const [loginUrl, setLoginUrl] = createSignal('');

  createEffect(() => {
    const code = getCodeFromUrl();
    console.log(code);
    const afterLogIn = async () => {
        await getTokens(code);
        navigate('/top-artists');
    };
    if (code) {
        afterLogIn();
    // } else if (getLocalAccessToken() !== 'undefined') {
    //     console.log(getLocalAccessToken())
    //   const refreshToken = async () => {
    //     await checkIfTokenHasExpired();
    //     navigate('/top-artists');
    //   };
    //   refreshToken();
    }
  });

  createEffect(() => {
    getLoginUrl().then((login) => setLoginUrl(login));
  });

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <Button
          href={loginUrl()}
          variant="contained"
          sx={{
            margin: '5vh',
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
