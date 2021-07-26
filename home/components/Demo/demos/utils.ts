export const debounce = <T extends (...args: any[]) => any>(func: T, delay: number): T => {
  let timer = null;

  // @ts-ignore TS doesn't deal with types properly
  return function (...args: Parameters<T>): ReturnType<T> {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.call(this, ...args);
      timer = null;
    }, delay);
  };
};
