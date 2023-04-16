// import { useCallback, useRef } from 'react';

// export default function useLongPress(
//   callback: (id: number) => unknown,
//   // long press duration in milliseconds
//   ms = 1000
// ) {
//   const timerRef = useRef<number>(0);

//   const endTimer = () => {
//     clearTimeout(timerRef.current || 0);
//     timerRef.current = 0;
//   };

//   const onStartLongPress = useCallback(
//     (imageId: number) => {
//       endTimer();

//       timerRef.current = window.setTimeout(() => {
//         callback(imageId);
//         endTimer();
//       }, ms);
//     },
//     [callback, ms]
//   );

//   const onEndLongPress = useCallback(
//     (imageId: number) => {
//       if (timerRef.current) {
//         endTimer();
//         callback(imageId);
//       }
//     },
//     [callback]
//   );

//   return [onStartLongPress, onEndLongPress, endTimer];
// }

// export default function useLongPress() {
//   return function (callback) {
//     let timeout;
//     let preventClick = false;

//     function start() {
//       timeout = setTimeout(() => {
//         preventClick = true;
//         callback();
//       }, 300);
//     }

//     function clear() {
//       timeout && clearTimeout(timeout);
//       preventClick = false;
//     }

//     function clickCaptureHandler(e) {
//       if (preventClick) {
//         e.stopPropagation();
//         preventClick = false;
//       }
//     }

//     return {
//       onMouseDown: start,
//       onTouchStart: start,
//       onMouseUp: clear,
//       onMouseLeave: clear,
//       onTouchMove: clear,
//       onTouchEnd: clear,
//       onClickCapture: clickCaptureHandler,
//     };
//   };
// }
