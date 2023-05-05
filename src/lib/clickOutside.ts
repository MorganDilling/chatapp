interface HTMLEvent extends Event {
  target: HTMLElement & EventTarget;
}

export const clickOutside = (
  element: Element,
  callbackFunction: () => void
) => {
  const onClick = (event: HTMLEvent) => {
    console.log(event);

    if (!element.contains(event.target)) {
      callbackFunction();
    }
  };

  document.body.addEventListener('click', onClick);

  return {
    update(newCallbackFunction: () => void) {
      callbackFunction = newCallbackFunction;
    },
    destroy() {
      document.body.removeEventListener('click', onClick);
    },
  };
};
