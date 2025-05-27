import { createEffect } from "solid-js";
import { For } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { getFollowedArtists, isFollowingArtists, unfollowArtists } from "../clients/SpotifyClient";
import ArtistCard from "../components/ArtistCard";
import { assignArtistId } from "../common";


const FollowedArtists = () => {
    const [artists, setArtists] = createStore([]);

    const fetchFollowedArtists = async () => {
        const response = await getFollowedArtists();
        return response.artists.items;
    };

    createEffect(() => {
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

    // const handleClickFollowBtnParent = useCallback(async (artist) => {
    //   await unfollowArtists([artist.id]);
    //   setArtists(prevArtists => 
    //     prevArtists.filter(tempArtist => tempArtist.id !== artist.id)
    //   )
    // }, [])

    const handleClickFollowBtnParent = async (artist) => {
      await unfollowArtists([artist.id]);
      setArtists(
        produce(prevArtists => {
          const index = prevArtists.findIndex(a => a.id === artist.id);
          if (index !== -1) {
            prevArtists.splice(index, 1); // MUTACJA DOZWOLONA wewnątrz produce
          }
        })
      );
    };
    // useCallback does not limit the renders in this case if passed to ArtistCard
    // const handleClickFollowBtnParent = useCallback(
    //     async (index) => {
    //       await unfollowArtists([artists[index].id]);
    //       const newArtists = artists.filter((_, i) => i !== index);
    //       setArtists(newArtists);
    //     }, [artists]);

    // const createFollowHandler = useCallback(
    //         (index) => () => handleClickFollowBtnParent(index), [handleClickFollowBtnParent]);

    return (
        <div>
          <div class='display-outer-container'>
            <div class='display-inner-container'>
              <div class='grid-container'>
                <For each={artists}>
                    {(artist, index) => (
                        <div class='grid-item'>
                            <div class='card-wrapper'>
                                <div class='card-index'>{index() + 1}</div>
                                <ArtistCard
                                    class={assignArtistId(artists, index())}
                                    artistInfo={artist}
                                    handleClickFollowBtnParent={handleClickFollowBtnParent}
                                />
                            </div>
                        </div>
                    )}
                </For>
              </div>
            </div>
          </div>
        </div>
      );
};

export default FollowedArtists;