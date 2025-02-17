import { createSignal, createEffect, createResource } from 'solid-js';
import Menu from '../components/Menu';
import { LOAD_AT_ONCE_LIMIT, OFFSET, lighterMainColor, spotifyGreen } from '../common';
import { getTopArtists } from '../clients/SpotifyClient';
//import ArtistCard from '../components/ArtistCard';
import { Grid } from '@suid/material';
import { Spinner, SpinnerType } from 'solid-spinner';
//import BottomBar from '../components/BottomBar';
import { SpotifyPlayButton } from '../components/MaterialComponentsCss';
//import LoadMoreButton from '../components/LoadMoreButton';
import styles from '../App.module.css'
import ArtistCard from '../components/ArtistCard';

const TopArtists = (props) => {

    const fetchTopArtists = async (term) => {
        const response = await getTopArtists(term);
        return response.items;
    }
    
    const [artists] = createResource(props.artistTerm, fetchTopArtists);
    return (
        <div>
            <div
                class={styles.displayOuterContainer}
            >
                <div
                    class={styles.displayInnerContainer}
                >
                    <Grid
                        container
                        spacing={1}
                    >
                        {artists() ? artists.map((artist, index) => 
                            <Grid
                                item
                                key={index}
                                xs={12}
                                sm={6}
                                md={2}
                            >
                                <ArtistCard
                                    artistInfo={artist}
                                    index={index + 1}
                                />
                            </Grid>)
                                :
                            <Spinner 
                                type={SpinnerType.bars} 
                                color={spotifyGreen}/>}
                    </Grid>
                </div>
            </div>
        </div>
    )
}

export default TopArtists;