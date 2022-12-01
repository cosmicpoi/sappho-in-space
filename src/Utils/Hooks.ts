import { useEffect } from "react";
import { useGameManager } from "..";

export function useKeyDown(key: string, cb: () => void) {
  const gM = useGameManager();
  useEffect(() => {
    const { unsubscribe } = gM.inputManager.bindKeyDown(key, cb);

    return unsubscribe
  }, [key, cb])
}

export function useFrame(cb: () => void ) {
  const gM = useGameManager();
  useEffect(() => {
    return gM.frame$.subscribe(cb).unsubscribe;
  }, [cb])
}