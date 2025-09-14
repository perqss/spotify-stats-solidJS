import { createSignal, createEffect, Index } from 'solid-js';
import TopBar from './TopBar';
import { useNavigate } from '@solidjs/router';
import styles from './Menu.module.css'

const Menu = ({ componentIndex, setTerm, closeSubMenu }) => {
  const [selectedMenu, setSelectedMenu] = createSignal(componentIndex);
  const [selectedSubMenu, setSelectedSubMenu] = createSignal('All Time');
  const menuItems = ['Top Artists', 'Top Songs', 'Top Albums', 'Recently Played', 'Followed Artists', 'Saved Songs'];
  const subMenuItems = ['All Time', 'Last 6 Months', 'Last 4 Weeks'];
  const menuIcons = ['mic', 'music_note', 'album', 'history', 'query_stats', 'favorite_border', 'bookmarks'];
  const navigate = useNavigate();

  const handleClickMenuItem = (index) => {
    setSelectedMenu(index);
  };

  const openSubMenu = (index) => {
    return [0, 1, 2].includes(index) && selectedMenu() === index && !closeSubMenu;
  };

  createEffect(() => {
    switch(selectedMenu()) {
      case 0:
          navigate('/top-artists');
          break;
      case 1:
          navigate('/top-songs');
          break;
      case 2:
          navigate('/top-albums');
          break;
      case 3:
          navigate('/recently-played');
          break;
      case 4:
          navigate('/music-taste');
          break;
      case 5:
          navigate('/followed-artists');
          break;
      case 6:
          navigate('/saved-songs');
          break;
      }
  });

  const handleClickSubMenuItem = (subMenuItem) => {
    switch(subMenuItem) {
        case subMenuItems[0]:
            setTerm('long_term')
            setSelectedSubMenu(subMenuItems[0]);
            break;
        case subMenuItems[1]:
            setTerm('medium_term')
            setSelectedSubMenu(subMenuItems[1]);
            break;
        case subMenuItems[2]:
            setTerm('short_term')
            setSelectedSubMenu(subMenuItems[2]);
            break;
    }
  };

  return (
    <div>
      <TopBar />
      <aside class={styles["sidebar"]}>
        <Index each={menuItems}>
          {(item, index) => (
            <>
              <div
                class={`${styles["menu-item"]} ${selectedMenu() === index ? styles["selected-menu"] : ""}`}
                onClick={() => handleClickMenuItem(index)}
              >
                <span class={`material-icons ${styles["icon"]}`}>{menuIcons[index]}</span>
                <span class={styles["label"]}>{item()}</span>
              </div>
              {openSubMenu(index) && (
                <Index each={subMenuItems}>
                  {(subItem) => (
                    <div
                      class={`${styles["submenu-item"]} ${selectedSubMenu() === subItem() ? styles["selected-submenu"] : ""}`}
                      onClick={() => handleClickSubMenuItem(subItem())}
                    >
                    {subItem()}
                  </div>
                  )}
                </Index>
              )}
            </>
          )}
        </Index>
      </aside>
    </div>
  )
};

export default Menu;
