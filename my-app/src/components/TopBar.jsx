import { createSignal, createEffect, onCleanup, onMount } from 'solid-js';
import { AppBar, Box, IconButton, Typography, Avatar, Popper, Grow, MenuList, MenuItem, Paper, Button, Fade } from '@suid/material';
import Tooltip from './Tooltip'
import { darkerMainColor, githubUrl, mainColor } from '../common';
import LogoutIcon from '@suid/icons-material/Logout';
import { FaBrandsSpotify } from 'solid-icons/fa'
import { spotifyGreen } from '../common';
import { useNavigate } from '@solidjs/router';
import { getProfile } from '../clients/SpotifyClient';

const TopBar = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = createSignal();
  const [openProfileMenu, setOpenProfileMenu] = createSignal(false);
  const [anchorEl, setAnchorEl] = createSignal(null);
  let anchorRef, popperRef;

  createEffect(() => {
    const getProfileWrapper = async () => {
      const response = await getProfile();
      setProfileData(response);
    };
    getProfileWrapper();
  });

  const handleLogout = () => {
    localStorage.setItem('token', undefined);
    localStorage.setItem('refresh_token', undefined);
    localStorage.setItem('token_expiration_timestamp', undefined);
    navigate('/');
  };

  const handleAvatarClick = (event) => {
    if (!openProfileMenu()) {
      setOpenProfileMenu(true);
      setAnchorEl(event.currentTarget);
    } else {
      setOpenProfileMenu(false);
      setAnchorEl(null);
    }
  };

  const handleClickAway = (event) => {
    if (!popperRef.contains(event.target)) {
      setOpenProfileMenu(false);
      setAnchorEl(null);
    }
  };

  onMount(() => {
    document.addEventListener('click', handleClickAway);
  });

  onCleanup(() => {
    document.removeEventListener('click', handleClickAway);
  });

  return (
    <AppBar
      sx={{
        position: 'fixed',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: darkerMainColor,
        height: '60px',
        top: '0px',
        width: '100%',
      }}
    >
      <FaBrandsSpotify
        size={60}
        color={spotifyGreen}
        style={{
          backgroundColor: darkerMainColor,
          marginLeft: 10,
        }}
      />
      <Typography sx={{ margin: 2 }}>Spotify Stats - Solid JS</Typography>
      <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
        <Button sx={{ color: 'white' }} href={githubUrl} target="_blank">
          Github
        </Button>
        <IconButton 
          onClick={handleAvatarClick} 
          ref={popperRef}
        >
            <Tooltip text="Account">
                <Avatar src={profileData()?.images[1]?.url} />
            </Tooltip>
            <Popper
              open={openProfileMenu()}
              anchorEl={anchorEl()}
              
              placement='bottom-start'
              transition
            >  
              <Fade>
                <MenuList
                  sx={{
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    flexDirection: 'column',
                    backgroundColor: mainColor,
                    color: 'white'
                  }}
                >
                  <Typography>
                    {profileData()?.display_name}
                  </Typography>
                  <Typography>
                    {`${profileData()?.followers.total} followers`}
                  </Typography>
                  <MenuItem
                    component='a'
                    href={profileData()?.external_urls?.spotify}
                    target='_blank'
                  >
                    Go to your Spotify page
                  </MenuItem>
                </MenuList>
              </Fade>
            </Popper>
        </IconButton>
        <Tooltip text="Log out">
          <IconButton onClick={handleLogout}>
            <LogoutIcon sx={{ fontSize: 30, color: 'white' }} />
          </IconButton>
        </Tooltip>
      </Box>
    </AppBar>
  );
};

export default TopBar;
