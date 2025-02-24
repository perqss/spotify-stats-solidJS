import { createResource } from "solid-js";
import { getTopSongs } from "../clients/SpotifyClient";
import { OFFSET } from "../common";
import { List } from "@suid/material";
import Song from "../components/Song";
import { LOAD_AT_ONCE_LIMIT } from "../common";
import styles from '../App.module.css'

const TopSongs = (props) => {

    const fetchTopSongs = async (term) => {
        const response = await getTopSongs(term);
        return response.items;
    }
    
    const [songsInfo] = createResource(props.songTerm, fetchTopSongs);

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
                    songInfo={songInfo}
                    index={index + 1}
                    length={songsInfo().length}
                  />) 
                }
              </List>
              {/* {songsInfo && loadAtOnce < LOAD_AT_ONCE_LIMIT && 
                <LoadMoreButton
                  onClick={handleClickLoadMore}
                />} */}
            </div>
          </div>
        </div>
      )
};
    
export default TopSongs;