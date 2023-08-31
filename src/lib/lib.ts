import { Routine } from './dateMethods';

export function capitalize(str: string) {
   return str.charAt(0).toUpperCase() + str.slice(1);
}

export const MODAL_BUTTON_TEXT = ['Cancel', 'Ok'];

export const vibrantColors7 = [
   '#FF9800', // Orange
   '#FF4081', // Pink
   '#8866FF', //
   '#00E676', // Green
   '#03A9F4', // Blue
   '#78caf9', // Purple
   '#FF5252', // Red
];
const charSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function randomString(n: number) {
   let str = '';
   for (let i = 0; i < n; i++) str += charSet[Math.floor(Math.random() * charSet.length)];
   return str;
}

export function debounce<T extends any[]>(func: (...args: T) => void, delay: number = 500): (...args: T) => void {
   let timeoutId: ReturnType<typeof setTimeout> | null;
   return function debouncedFn(this: any, ...args: T): void {
      if (timeoutId) {
         clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
         func.apply(this, args);
         timeoutId = null;
      }, delay);
   };
}

export function throttle<T extends (...args: any[]) => void>(
   func: T,
   delay: number = 500,
): (...args: Parameters<T>) => void {
   let timeoutId: ReturnType<typeof setTimeout> | null;
   let isThrottled = false;
   let savedArgs: Parameters<T> | null;

   function executeFunc(this: any): void {
      if (savedArgs) {
         func.apply(this, savedArgs);
         savedArgs = null;
         timeoutId = setTimeout(executeFunc, delay);
      } else {
         isThrottled = false;
      }
   }

   return function throttledFn(this: any, ...args: Parameters<T>): void {
      if (isThrottled) {
         savedArgs = args;
      } else {
         func.apply(this, args);
         isThrottled = true;
         timeoutId = setTimeout(executeFunc, delay);
      }
   };
}

export const BLANK_CALLBACK_ARR_2 = [() => {}, () => {}];
// export blank_callback

export function parseEmoji(emoji: string) {
   if (!emoji) return [''];
   let emojis = [...new Intl.Segmenter().segment(emoji)].map((x) => x.segment);
   return emojis;
}

export function searchRoutine(routines: Routine[], query: string) {
   // Return filtered routines
   if (!query) return routines;
   return routines.filter((routine: Routine) => {
      return routine.name.toLowerCase().includes(query) || routine.description?.toLowerCase().includes(query);
      // || routine.sub?.toLowerCase().includes(query)
      // || routine.type.toLowerCase().includes(query)
      // || routine.emoji.toLowerCase().includes(query)
   });
   // return typedList
}

export function useDark() {
   // If the HTML tag has the .dark class...
   return document.documentElement.classList.contains('dark');
}
