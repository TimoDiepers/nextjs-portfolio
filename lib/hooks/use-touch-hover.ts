import { useCallback, useMemo, useState } from 'react';

export const useTouchHover = () => {
  const [isTouchActive, setIsTouchActive] = useState(false);

  const activate = useCallback(() => {
    setIsTouchActive(true);
  }, []);

  const deactivate = useCallback(() => {
    setIsTouchActive(false);
  }, []);

  const touchHandlers = useMemo(
    () => ({
      onTouchStart: activate,
      onTouchEnd: deactivate,
      onTouchCancel: deactivate,
    }),
    [activate, deactivate]
  );

  return { isTouchActive, touchHandlers };
};

export type TouchHoverHandlers<T extends HTMLElement = HTMLElement> = {
  onTouchStart: React.TouchEventHandler<T>;
  onTouchEnd: React.TouchEventHandler<T>;
  onTouchCancel: React.TouchEventHandler<T>;
};
