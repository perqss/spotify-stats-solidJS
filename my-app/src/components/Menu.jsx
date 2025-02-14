import { createSignal, createEffect } from 'solid-js';
import { Box, List, ListItem, ListItemText, ListItemIcon, Grow } from '@suid/material';
import MicIcon from '@suid/icons-material/Mic';
import MusicNoteIcon from '@suid/icons-material/MusicNote';
import HistoryIcon from '@suid/icons-material/History';
import AlbumIcon from '@suid/icons-material/Album';
import QueryStatsIcon from '@suid/icons-material/QueryStats';
import TopBar from './TopBar';
import { useNavigate } from '@solidjs/router';
import { mainColor } from '../common';
import { MenuItemButton, SubMenuItemButton } from './MaterialComponentsCss';

const Menu = (props) => {
  const [selectedMenu, setSelectedMenu] = createSignal(props.componentIndex);
  const [selectedSubMenu, setSelectedSubMenu] = createSignal('All Time');
  const menuItems = ['Top Artists', 'Top Songs', 'Top Albums', 'Recently Played', 'Music Taste'];
  const subMenuItems = ['All Time', 'Last 6 Months', 'Last 4 Weeks'];
  const menuIcons = [MicIcon, MusicNoteIcon, AlbumIcon, HistoryIcon, QueryStatsIcon];
  const navigate = useNavigate();

  const handleClickMenuItem = (index) => {
    setSelectedMenu(index);
  };

  createEffect(() => {
    if (selectedMenu() === 0) navigate('/top-artists');
    else if (selectedMenu() === 1) navigate('/top-songs');
    else if (selectedMenu() === 2) navigate('/top-albums');
    else if (selectedMenu() === 3) navigate('/recently-played');
    else if (selectedMenu() === 4) navigate('/music-taste');
  });

  createEffect(() => {
    if (props.term() === 'long_term') setSelectedSubMenu(subMenuItems[0]);
    else if (props.term() === 'medium_term') setSelectedSubMenu(subMenuItems[1]);
    else if (props.term() === 'short_term') setSelectedSubMenu(subMenuItems[2]);
  });

  const setPropsTerm = (subMenuItem, setTerm) => {
    if (subMenuItem === subMenuItems[0]) setTerm('long_term');
    else if (subMenuItem === subMenuItems[1]) setTerm('medium_term');
    else setTerm('short_term');
  };

  const handleClickSubMenuItem = (subMenuItem, index) => {
    if (index === 0) setPropsTerm(subMenuItem, props.setArtistTerm);
    else if (index === 1) setPropsTerm(subMenuItem, props.setSongTerm);
    else if (index === 2) setPropsTerm(subMenuItem, props.setAlbumTerm);
    setSelectedSubMenu(subMenuItem);
  };

  const isGrowIn = (index) => {
    return selectedMenu() === index;
  };

  const shouldSubMenuBeRendered = (index) => {
    return [0, 1, 2].includes(index) && isGrowIn(index);
  };

  return (
    <div>
      <TopBar />
      <Box sx={{ maxWidth: '200px', width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', marginTop: '60px', position: 'fixed' }}>
        <div>
          <List sx={{ backgroundColor: mainColor }}>
            {menuItems.map((item, index) => (
              <div>
                <ListItem disablePadding>
                  <MenuItemButton onClick={() => handleClickMenuItem(index)} selected={selectedMenu() === index}>
                    <ListItemIcon sx={{ color: 'white' }}>{menuIcons[index]}</ListItemIcon>
                    <ListItemText sx={{ color: 'white' }}>{item}</ListItemText>
                  </MenuItemButton>
                </ListItem>
                {shouldSubMenuBeRendered(index) && (
                  <Grow in={isGrowIn(index)}>
                    <div>
                      {selectedMenu() === index && subMenuItems.map((subMenuItem) => (
                        <ListItem disablePadding>
                          <SubMenuItemButton onClick={() => handleClickSubMenuItem(subMenuItem, index)} selected={selectedSubMenu() === subMenuItem}>
                            <ListItemText sx={{ color: 'white', 'font-size': 'medium' }} disableTypography>
                              {subMenuItem}
                            </ListItemText>
                          </SubMenuItemButton>
                        </ListItem>
                      ))}
                    </div>
                  </Grow>
                )}
              </div>
            ))}
          </List>
          <div style={{ height: '100vh', ['background-color']: mainColor }} />
        </div>
      </Box>
    </div>
  );
};

export default Menu;
