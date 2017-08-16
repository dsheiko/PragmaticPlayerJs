export const hasBrowserVideoElementSupport = (function() {
  const inputElem = document.createElement( "video" );
  return inputElem.play !== undefined;
}());