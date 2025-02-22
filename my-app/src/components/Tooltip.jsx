import { createSignal, onCleanup, onMount } from 'solid-js';
import { Portal } from 'solid-js/web';

const Tooltip = (props) => {
  const [visible, setVisible] = createSignal(false);
  let targetRef, tooltipRef;

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);
  const positionTooltip = () => {
    if (targetRef && tooltipRef) {
      const targetRect = targetRef.getBoundingClientRect();
      tooltipRef.style.top = `${targetRect.bottom + 8}px`;
      tooltipRef.style.left = `${targetRect.left + targetRect.width / 2}px`;
    }
  };

  onMount(() => {
    console.log('mount');
    window.addEventListener('scroll', positionTooltip);
    window.addEventListener('resize', positionTooltip);
  });

  onCleanup(() => {
    console.log('cleanup');
    window.removeEventListener('scroll', positionTooltip);
    window.removeEventListener('resize', positionTooltip);
  });

  return (
    <>
      <div
        ref={targetRef}
        onMouseEnter={() => {
            console.log('enter');
          showTooltip();
          positionTooltip();
        }}
        onMouseLeave={hideTooltip}
        style={{ display: 'inline-block' }}
      >
        {props.children}
      </div>

      {visible() && (
        <Portal mount={document.getElementById('tooltip-root')}>
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            color: 'white',
            transform: 'translateX(-50%)',
            opacity: 1,
          }}
        >
            {props.text}
          </div>
        </Portal>
      )}
    </>
  );
};

export default Tooltip;
