import { styled } from "solid-styled-components";
import { ListItemButton, IconButton, Button } from '@suid/material';
import { darkerMainColor, spotifyGreen } from '../common';

const colorOnSelectMenuItem = '#444744';
const colorOnSelectSubMenuItem = '#333633';

const MenuItemButton = styled(ListItemButton)`
  &.Mui-selected {
    background-color: ${colorOnSelectMenuItem} !important;
  }
  &.Mui-selected:hover {
    background-color: ${colorOnSelectMenuItem} !important;
  }
  &:hover {
    background-color: ${colorOnSelectMenuItem} !important;
  }
`;

const SubMenuItemButton = styled(ListItemButton)`
  &.Mui-selected {
    background-color: ${colorOnSelectSubMenuItem} !important;
  }
  &.Mui-selected:hover {
    background-color: ${colorOnSelectSubMenuItem} !important;
  }
  &:hover {
    background-color: ${colorOnSelectSubMenuItem} !important;
  }
`;

const SongPlayButton = styled(IconButton)`
  margin-top: 3px;
  &.Mui-selected {
    background-color: ${darkerMainColor} !important;
  }
  &.Mui-selected:hover {
    background-color: ${darkerMainColor} !important;
  }
  &:hover {
    background-color: ${darkerMainColor} !important;
  }
`;

const ArtistPlayButton = styled(IconButton)`
  &.Mui-selected {
    background-color: ${darkerMainColor} !important;
  }
  &.Mui-selected:hover {
    background-color: ${darkerMainColor} !important;
  }
  &:hover {
    background-color: ${darkerMainColor} !important;
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
