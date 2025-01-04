import { createSignal, createContext } from "solid-js";
import { Router, Routes, Route } from "@solidjs/router";
import "./App.css";
import Login from "./pages/Login";
import TopArtists from "./pages/TopArtists";
import TopSongs from "./pages/TopSongs";
import RecentlyPlayed from "./pages/RecentlyPlayed";
import BottomBar from "./components/BottomBar";
import Menu from "./components/Menu";
import ArtistProfile from "./pages/ArtistProfile";
import SongInfo from "./pages/SongInfo";
import MusicTaste from "./pages/MusicTaste";
import TopAlbums from "./pages/TopAlbums";
import AlbumInfo from "./pages/AlbumInfo";

export const AppContext = createContext();

function App() {
  const [songId, setSongId] = createSignal();
  const [artistId, setArtistId] = createSignal();
  const [albumId, setAlbumId] = createSignal();
  const [openBottomBar, setOpenBottomBar] = createSignal(false);
  const [artistTerm, setArtistTerm] = createSignal("long_term");
  const [songTerm, setSongTerm] = createSignal("long_term");
  const [albumTerm, setAlbumTerm] = createSignal("long_term");

  return (
    <Router>
      <AppContext.Provider
        value={{
          setSongId,
          setArtistId,
          setAlbumId,
          setOpenBottomBar,
        }}
      >
        <Routes>
          <Route path="/" component={Login} />
          {/* <Route
            path="/top-artists"
            element={
              <div>
                <Menu
                  componentIndex={0}
                  setArtistTerm={setArtistTerm}
                  term={artistTerm()}
                />
                <TopArtists artistTerm={artistTerm()} />
              </div>
            }
          />
          <Route
            path="/top-songs"
            element={
              <div>
                <Menu
                  componentIndex={1}
                  setSongTerm={setSongTerm}
                  term={songTerm()}
                />
                <TopSongs songTerm={songTerm()} />
              </div>
            }
          />
          <Route
            path="/top-albums"
            element={
              <div>
                <Menu
                  componentIndex={2}
                  setAlbumTerm={setAlbumTerm}
                  term={albumTerm()}
                />
                <TopAlbums albumTerm={albumTerm()} />
              </div>
            }
          />
          <Route
            path="/recently-played"
            element={
              <div>
                <Menu componentIndex={3} />
                <RecentlyPlayed />
              </div>
            }
          />
          <Route
            path="/artist/:artistId"
            element={
              <div>
                <Menu setArtistTerm={setArtistTerm} />
                <ArtistProfile />
              </div>
            }
          />
          <Route
            path="/song/:songId"
            element={
              <div>
                <Menu setSongTerm={setSongTerm} />
                <SongInfo />
              </div>
            }
          />
          <Route
            path="/music-taste"
            element={
              <div>
                <Menu componentIndex={4} />
                <MusicTaste />
              </div>
            }
          />
          <Route
            path="/album/:albumId"
            element={
              <div>
                <Menu setAlbumTerm={setAlbumTerm} />
                <AlbumInfo />
              </div>
            }
          /> */}
        </Routes>
        {/* <BottomBar
          songId={songId()}
          artistId={artistId()}
          albumId={albumId()}
          open={openBottomBar()}
          setOpen={setOpenBottomBar}
        /> */}
      </AppContext.Provider>
    </Router>
  );
}

export default App;
