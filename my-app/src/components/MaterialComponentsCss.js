import { styled } from "solid-styled-components";
import { ListItemButton, IconButton, Button } from '@suid/material';
import { darkerMainColor, spotifyGreen } from '../common';

const colorOnSelectMenuItem = '#444744';
const colorOnSelectSubMenuItem = '#333633';

const MenuItemButton = styled(ListItemButton)`
  &.Mui-selected {
    background-color: ${colorOnSelectMenuItem};
  }
  &.Mui-selected:hover {
    background-color: ${colorOnSelectMenuItem};
  }
  &:hover {
    background-color: ${colorOnSelectMenuItem};
  }
`;

const SubMenuItemButton = styled(ListItemButton)`
  &.Mui-selected {
    background-color: ${colorOnSelectSubMenuItem};
  }
  &.Mui-selected:hover {
    background-color: ${colorOnSelectSubMenuItem};
  }
  &:hover {
    background-color: ${colorOnSelectSubMenuItem};
  }
`;

const SongPlayButton = styled(IconButton)`
  margin-top: 3px;
  &.Mui-selected {
    background-color: ${darkerMainColor};
  }
  &.Mui-selected:hover {
    background-color: ${darkerMainColor};
  }
  &:hover {
    background-color: ${darkerMainColor};
  }
`;

const ArtistPlayButton = styled(IconButton)`
  &.Mui-selected {
    background-color: ${darkerMainColor};
  }
  &.Mui-selected:hover {
    background-color: ${darkerMainColor};
  }
  &:hover {
    background-color: ${darkerMainColor};
  }
`;

const SpotifyPlayButton = styled(Button)`
  &:hover {
    background-color: #26eb6b !important;
  }
  color: black !important;
  background-color: ${spotifyGreen} !important;
`;

export {
  MenuItemButton,
  SubMenuItemButton,
  SongPlayButton,
  ArtistPlayButton,
  SpotifyPlayButton,
};
