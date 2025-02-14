import { createEffect, onCleanup } from 'solid-js';

const ClickAwayListener = (props) => {
  let _ref;

  const handleClickOutside = (event) => {
    if (_ref && !_ref.contains(event.target)) {
      props.onClickAway && props.onClickAway(event);
    }
  };

  createEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    onCleanup(() => {
      document.removeEventListener('mousedown', handleClickOutside);
    });
  });

  return (
    <div ref={el => (_ref = el)}>
      {props.children}
    </div>
  );
};

export default ClickAwayListener;
