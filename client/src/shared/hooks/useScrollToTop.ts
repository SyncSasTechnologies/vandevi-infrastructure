import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Ensures window scroll resets to top upon route change in single page navigation.
 */
export function useScrollToTop(): void {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);
}

