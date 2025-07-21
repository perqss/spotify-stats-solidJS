import { Router, Route } from "@solidjs/router"
import Login from "../pages/Login";
import TopArtists from "../pages/TopArtists";
import TopSongs from "../pages/TopSongs";
import TopAlbums from "../pages/TopAlbums";
import RecentlyPlayed from "../pages/RecentlyPlayed";
import Menu from "./Menu";
import ArtistProfile from "../pages/ArtistProfile";
import SongInfo from "../pages/SongInfo";
import AlbumInfo from "../pages/AlbumInfo";
import FollowedArtists from "../pages/FollowedArtists";
import SavedSongs from "../pages/SavedSongs";
import { createSignal } from "solid-js";

const CustomRoutes = () => {
    const [artistTerm, setArtistTerm] = createSignal('long_term');
    const [songTerm, setSongTerm] = createSignal('long_term');
    const [albumTerm, setAlbumTerm] = createSignal('long_term');

    return (
        <Router>
            <Route 
                path="/" 
                component={Login}
            />
            <Route 
                path='/top-artists' 
                component={() => 
                    <>
                        <Menu
                            componentIndex={0}
                            setTerm={setArtistTerm}
                        />
                        <TopArtists
                            artistTerm={artistTerm}
                        />
                    </>}
            />
            <Route 
                path='/artist/:artistId' 
                component={() =>
                    <>
                        <Menu
                            closeSubMenu
                        />
                        <ArtistProfile/>
                    </>}
            />
            <Route
                path='/top-songs'
                component={() => 
                    <>      
                        <Menu
                            componentIndex={1}
                            setTerm={setSongTerm}
                        />
                        <TopSongs 
                            songTerm={songTerm}
                        />
                    </>}
            />
            <Route 
                path='/song/:songId' 
                component={() => 
                    <>
                        <Menu
                            closeSubMenu
                        />
                        <SongInfo/>
                    </>}
            />
            <Route
                path='/recently-played'
                component={() => 
                    <>
                        <Menu
                            componentIndex={3}
                        />
                        <RecentlyPlayed/>
                    </>}
            />
            <Route
                path='/top-albums'
                component={() => 
                    <>         
                        <Menu
                            componentIndex={2}
                            setTerm={setAlbumTerm}
                        />
                        <TopAlbums
                            albumTerm={albumTerm}
                        />
                    </>}
            />
            <Route
                path='/album/:albumId'
                component={() => 
                    <>
                        <Menu
                            closeSubMenu
                        />
                        <AlbumInfo/>
                    </>}
            />
            <Route
                path='/followed-artists'
                component={() => 
                    <>
                        <Menu
                            componentIndex={5}
                        />
                        <FollowedArtists/>
                    </>}
            />
            <Route
                path='/saved-songs'
                component={() => 
                    <>
                        <Menu
                            componentIndex={6}
                        />
                        <SavedSongs/>
                    </>
                }
            />
      </Router>
    );
};

export default CustomRoutes;