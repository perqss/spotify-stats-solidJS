import { createSignal, createEffect } from 'solid-js';
import { useNavigate } from '@solidjs/router'; 
import logo from '../logo.svg';
import { getLoginUrl, getCodeFromUrl, getTokens } from '../common';
import styles from '../components/Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [loginUrl, setLoginUrl] = createSignal('');

  createEffect(() => {
    const code = getCodeFromUrl();
    const afterLogIn = async () => {
        await getTokens(code);
        navigate('/top-artists');
    };

    const logIn = async () => {
      const url = await getLoginUrl();
      setLoginUrl(url);
    };

    code ? afterLogIn() : logIn();
  });

  return (
    <div class={styles["App"]}>
      <header class={styles["App-header"]}>
        <img src={logo} class={styles["logo"]} alt="logo" />
        {loginUrl() && 
            <a 
              href={loginUrl()}
              class={styles["login-button"]}
             >
                Log in with Spotify
            </a>
        }
      </header>
    </div>
  );
};

export default Login;
