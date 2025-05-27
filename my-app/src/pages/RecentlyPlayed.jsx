import { createEffect, createResource, createSignal } from "solid-js";
import { getRecentlyPlayed } from "../clients/SpotifyClient";
import Menu from "../components/Menu";
import Song from "../components/Song";

const RecentlyPlayed = () => {

    const fetchRecentlyPlayed = async () => {
        const response = await getRecentlyPlayed();
        return response.items;
    }

    const [songsInfo] = createResource(fetchRecentlyPlayed);

    return (
        <div>
            <div
                class={styles.displayOuterContainer}
            >
                <div
                    class={styles.displayInnerContainer}
                >
                    <List>
                    {songsInfo() && songsInfo().map((songInfo, index) => 
                        <Song
                            key={index}
                            songInfo={songInfo.track}
                            index={index + 1}
                            length={songsInfo().length}
                            //handleSongClick={handleSongClickRecentlyPlayed}
                        />
                    )}
                    </List>
                </div>
            </div>
        </div>
      )
};

export default RecentlyPlayed;
