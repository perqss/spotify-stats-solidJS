import { createSignal, createEffect, onCleanup } from 'solid-js';
import { AppBar, Box, IconButton, Typography, Avatar, Popper, Grow, MenuList, MenuItem, Paper, Button } from '@suid/material';
import Tooltip from './Tooltip'
import { darkerMainColor, githubUrl, mainColor } from '../common';
import LogoutIcon from '@suid/icons-material/Logout';
import { FaBrandsSpotify } from 'solid-icons/fa'
import { spotifyGreen } from '../common';
import { useNavigate, A } from '@solidjs/router';
import { getProfile } from '../clients/SpotifyClient';

const TopBar = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = createSignal();
  const [openProfileMenu, setOpenProfileMenu] = createSignal(false);
  let anchorRef;

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

  const handleAvatarClick = () => {
    setOpenProfileMenu(!openProfileMenu());
  };

  const handleProfileMenuClose = () => {
    setOpenProfileMenu(false);
  };

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
        <IconButton onClick={handleAvatarClick} ref={el => (anchorRef = el)}>
            <Tooltip text="Account">
                <Avatar src={profileData()?.images[1]?.url} />
            </Tooltip>
            
          {/* <Tooltip.Root>
            <Tooltip.Trigger>
                <Avatar src={profileData()?.images[1]?.url} />
            </Tooltip.Trigger>
            <Tooltip.Positioner>
                <Tooltip.Content>Account</Tooltip.Content>
            </Tooltip.Positioner>
          </Tooltip.Root> */}
          {/* <Popper open={openProfileMenu()} anchorEl={anchorRef} placement="bottom-start" transition>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleProfileMenuClose}>
                    <MenuList
                      autoFocusItem={openProfileMenu()}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        backgroundColor: mainColor,
                        color: 'white',
                      }}
                    >
                      <Typography>{profileData()?.display_name}</Typography>
                      <Typography>{`${profileData()?.followers.total} followers`}</Typography>
                      <MenuItem component={A} href={profileData()?.external_urls?.spotify} target="_blank">
                        Go to your Spotify page
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper> */}
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
