import { createEffect, createSignal } from "solid-js";

const BottomBar = (props) => {
    const chooseSrc = () => {
        if (props.songId()) {
            return `https://open.spotify.com/embed/track/${props.songId()}?utm_source=generator`;
        } else if (props.artistId()) {
            return `https://open.spotify.com/embed/artist/${props.artistId()}?utm_source=generator`;
        } else if (props.albumId()) {
            return `https://open.spotify.com/embed/album/${props.albumId()}?utm_source=generator`;
        }
        return '';
    };

    return (
        <div>
            {props.open() && <div style={{['margin-top']: '70px'}}>
                <iframe
                    style={{
                        position: 'fixed',
                        width: '100%',
                        ['border-radius']: '12px',
                        bottom: '-70px',
                    }}
                    src={chooseSrc()}
                    frameBorder="0" 
                    allowFullScreen="" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                ></iframe>
                <IconButton 
                    sx={{
                        bottom: 70,
                        ['margin-bottom']: 1, 
                        ['margin-right']: 'auto', 
                        position: 'fixed'
                    }}
                    onClick={() => props.setOpen(false)}
                >
                    <CancelOutlined 
                        sx={{color: 'white'}}
                    />
                </IconButton>
            </div>}
        </div>
    )
};

export default BottomBar;