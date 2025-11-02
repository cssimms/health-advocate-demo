// Looked up some help on this one, the abstract types are pretty cool
// https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940

// In practice I would probably advocate for a well-tested and widely used module like
// https://www.npmjs.com/package/use-debounce
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
