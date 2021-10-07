import { useCallback, useState } from "react";

/**
 * React hook which allows async errors to be passed to the an ErrorBoundary correctly
 * @returns a function that can wrap an async function
 */
export const useAsyncError = () => {
  const [, setState] = useState();
  return useCallback(async <T>(fn: Promise<T>): Promise<T | undefined> => {
    try {
      return await fn;
    } catch (err) {
      setState(() => {
        throw err;
      });
    }
  }, []);
};
