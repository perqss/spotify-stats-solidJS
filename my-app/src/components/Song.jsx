import { useAppContext } from "../App";
import { ListItemAvatar, ListItemText, Avatar, Divider } from "@suid/material";
import { MenuItemButton, SongPlayButton } from "./MaterialComponentsCss";
import { useNavigate } from "@solidjs/router";
import { grey, parseArtists } from "../common";
import { PlayCircleFilledOutlined } from "@suid/icons-material";

const Song = (props) => {
const setSongId = useAppContext()?.setSongId;
const setArtistId = useAppContext()?.setArtistId;
const setAlbumId = useAppContext()?.setAlbumId;
const setOpenBottomBar = useAppContext()?.setOpenBottomBar;
const navigate = useNavigate();

const durationInHrMinSec = (duration) => {
    let milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    let result;
    hours === '00' ? result = minutes + ':' + seconds : result = hours + ':' + minutes + ':' + seconds;
    return result;
};

const handleClickPlayBtn = (event) => {
    event.stopPropagation();
    setSongId(props.songInfo.id);
    setOpenBottomBar(true);
    setArtistId(null);
    setAlbumId(null);
};

const handleSecondary = () => {
    if (props.albumInfo) {
        return `${parseArtists(props.songInfo.artists)}`;
    } else {
        return `${parseArtists(props.songInfo.album.artists)} - ${props.songInfo.album.name}`;
    }
    }
    
return (
    <div>
        <MenuItemButton
            onClick={() => navigate(`/song/${props.songInfo.id}`)}
        >
            <ListItemAvatar>
                <Avatar
                    src={props.albumInfo ? props.albumInfo.images[1].url : props.songInfo.album.images[2].url}
                />
            </ListItemAvatar>
            <ListItemText
                primary={`${props.index}. ${props.songInfo.name}`}
                primaryTypographyProps={{sx: {color: 'white'}}}
                secondary={handleSecondary()}
                secondaryTypographyProps={{sx: {color: grey}}}
            />
            <SongPlayButton
                onClick={handleClickPlayBtn}
            >
                <PlayCircleFilledOutlined
                    sx={{color: 'white'}}
                />
            </SongPlayButton>
            <div
                style={{
                    color: 'white'
                    }}
                >
                {durationInHrMinSec(props.songInfo.duration_ms)}
            </div>

        </MenuItemButton>
        {props.index < props.length ? 
            <Divider 
                variant='inset'
                sx={{
                    backgroundColor: 'white'
                }}
            /> : ''
        }
    </div>
    )
};

export default Song;