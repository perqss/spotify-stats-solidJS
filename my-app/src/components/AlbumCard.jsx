import { mainColor } from "../common";
import { useNavigate } from "@solidjs/router";

const AlbumCard = (props) => {
    const setSongId = useAppContext()?.setSongId;
    const setArtistId = useAppContext()?.setArtistId;
    const setAlbumId = useAppContext()?.setAlbumId;
    const setOpenBottomBar = useAppContext()?.setOpenBottomBar;
    const navigate = useNavigate();

    const handleClickPlayBtn = (event) => {
        event.stopPropagation();
        setAlbumId(props.album[1].id);
        setOpenBottomBar(true);
        setSongId(null);
        setArtistId(null);
    };

    const handleClickAlbum = () => {
        navigate(`/album/${props.album[1].id}`);
    };

    return (
        <Card sx={{backgroundColor: mainColor, margin: 1}}>
          <CardActionArea
            onClick={handleClickAlbum}
          >
            <CardMedia
              sx={{ height: '200px'}}
              image={props.album[1].image}
            />
            <CardContent>
              <Typography gutterBottom variant="h7" color='white'>
                {`${props.index}. ${props.album[0]}`}
              </Typography>
            </CardContent>
            <CardActions
              disableSpacing
            >
            </CardActions>
          </CardActionArea>
          <ArtistPlayButton
            onClick={handleClickPlayBtn}
          >
            <PlayCircleFilledOutlined 
              sx={{color: 'white'}}
            />
          </ArtistPlayButton>
        </Card>
      );
};

export default AlbumCard;