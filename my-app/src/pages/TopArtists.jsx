import { createSignal, createEffect } from 'solid-js';
import { getTopArtists, isFollowingArtists, followArtists, unfollowArtists } from '../clients/SpotifyClient';
import { createStore } from 'solid-js/store';
import ArtistCard from '../components/ArtistCard';
import { assignArtistId } from '../common';


const TopArtists = ({ artistTerm }) => {
    const [artists, setArtists] = createStore([]);
   //const [artists, setArtists] = createSignal([]);

    const fetchTopArtists = async () => {
        const response = await getTopArtists(artistTerm());
        return response.items;
    };

    createEffect(() => {
        const fetchArtistsWrapper = async () => {
            const topArtists = await fetchTopArtists();
            const artistIds = topArtists.map(artist => artist.id);
            const followed = await isFollowingArtists(artistIds);
            const newArtists = topArtists.map((artist, index) => {
                return {
                    ...artist,
                    isFollowing: followed[index],
                };
            })
            setArtists(newArtists);
        }

        fetchArtistsWrapper();
    })

    const handleClickFollowBtnParent = async (artist) => {
        if (!artist.isFollowing) {
            await followArtists([artist.id]);
        } else {
            await unfollowArtists([artist.id]);
        }
        //const index = artists.findIndex(a => a.id === artist.id);
        setArtists((a) => a.id === artist.id, 'isFollowing', !artist.isFollowing);
        //setArtists(artists().map(a => a.id === artist.id ? { ...a, isFollowing: !artist.isFollowing } : a));
    };
    
    return (
        <div class='display-outer-container'>
            <div class='display-inner-container'>
                <div class='grid-container'>
                    <For each={artists}>
                        {(artist, index) => {
                            return (
                        <div 
                            class='grid-item' 
                        >
                            <div class='card-wrapper'>
                                <div class='card-index'>{index() + 1}</div>
                                <ArtistCard
                                    className={assignArtistId(artists, index())}
                                    artistInfo={artist}
                                    handleClickFollowBtnParent={handleClickFollowBtnParent}
                                />
                            </div>  
                        </div>)
                        }}
                    </For>
                    {/* <Index each={artists}>
                        {(artist, index) => {
                            return (
                        <div 
                            class='grid-item' 
                        >
                            <div class='card-wrapper'>
                                <div class='card-index'>{index + 1}</div>
                                <ArtistCard
                                    className={assignArtistId(artists, index)}
                                    artistInfo={artist()}
                                    handleClickFollowBtnParent={handleClickFollowBtnParent}
                                />
                            </div>  
                        </div>)
                        }}
                    </Index> */}
                </div>
            </div>
        </div>
    );
}

export default TopArtists;