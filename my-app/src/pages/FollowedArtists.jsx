import { createSignal } from "solid-js";
import { For, onMount } from "solid-js";
import { getFollowedArtists, isFollowingArtists, unfollowArtists } from "../clients/SpotifyClient";
import ArtistCard from "../components/ArtistCard";
import { assignArtistId } from "../common";

const FollowedArtists = () => {
    const [artists, setArtists] = createSignal([]);

    const fetchFollowedArtists = async () => {
        const response = await getFollowedArtists();
        return response.artists.items;
    };

    onMount(() => {
        const fetchArtistsWrapper = async () => {
            const followedArtists = await fetchFollowedArtists();
            const artistIds = followedArtists.map((artist) => artist.id);
            const followed = await isFollowingArtists(artistIds);
            const newArtists = followedArtists.map((artist, index) => {
                return {
                    ...artist,
                    isFollowing: followed[index],
                };
            });
            setArtists(newArtists);
        };

        fetchArtistsWrapper();
    })

    const handleClickFollowBtnParent = async (artist) => {
      await unfollowArtists([artist.id]);
      setArtists(prevArtists => prevArtists.filter(a => a.id !== artist.id));
    };
    
    return (
        <div class='display-outer-container'>
          <div class='display-inner-container'>
            <div class='grid-container'>
              <For each={artists()}>
                  {(artist, index) => 
                      <div class='grid-item'>
                          <div class='card-wrapper'>
                              <div class='card-index'>{index() + 1}</div>
                              <ArtistCard
                                  className={assignArtistId(artists(), index())}
                                  artistInfo={artist}
                                  handleClickFollowBtnParent={handleClickFollowBtnParent}
                              />
                          </div>
                      </div>
                  }
              </For>
            </div>
          </div>
        </div>
      );
};

export default FollowedArtists;