import { CardActionArea, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@suid/material';
import { mainColor, darkerMainColor, lighterMainColor, spotifyGreen } from '../common';
import { ArtistPlayButton } from './MaterialComponentsCss';
import PlayCircleOutline from '@suid/icons-material/PlayCircleOutline';
import { AppContext } from '../App';
import { useNavigate } from '@solidjs/router';
import { useAppContext } from '../App';

const ArtistCard = (props) => {
//   const setArtistId = useContext(AppContext)?.setArtistId;
//   const setSongId = useContext(AppContext)?.setSongId;
//   const setAlbumId = useContext(AppContext)?.setAlbumId;
//   const setOpenBottomBar = useContext(AppContext)?.setOpenBottomBar;
  const { setArtistId, setSongId, setAlbumId, setOpenBottomBar } = useAppContext(AppContext);
  const navigate = useNavigate();

  const handleClickPlayBtn = () => {
    setArtistId(props.artistInfo?.id);
    setOpenBottomBar(true);
    setSongId(null);
    setAlbumId(null);
  };

  const handleClickAritst = () => {
    navigate(`/artist/${props.artistInfo.id}`);
  };

  return (
    <Card sx={{backgroundColor: mainColor, margin: 1}}>
      <CardActionArea
        onClick={handleClickAritst}
      >
        <CardMedia
          sx={{ height: '200px'}}
          //image={props.artistInfo.images[0].url}
        />
        <CardContent>
          {/* <Typography gutterBottom variant="h7" color='white'>
            {`${props.index}. ${props.artistInfo.name}`}
          </Typography> */}
        </CardContent>
        <CardActions
          disableSpacing
        >
        </CardActions>
      </CardActionArea>
      <ArtistPlayButton
            onClick={handleClickPlayBtn}
      >
        <PlayCircleOutline 
          sx={{color: 'white'}}
        />
      </ArtistPlayButton>
    </Card>
  );
}

export default ArtistCard;