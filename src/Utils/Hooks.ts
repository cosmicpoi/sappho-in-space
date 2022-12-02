import { useEffect, useLayoutEffect, useState } from "react";
import { useGameManager } from "..";
import { InputManager } from "../Engine/InputManager";
import { Subscription } from "./Monomitter";
import { ActorData, ActorProps } from "../Engine/Actor";

type Extractor = (
  iM: InputManager
) => (key: string, cb: (k: string) => void) => Subscription;
const exKeyDown: Extractor = (iM: InputManager) => iM.bindKeyDown;
const exKeyUp: Extractor = (iM: InputManager) => iM.bindKeyUp;

function useKey(extract: Extractor, key: string, cb: (k: string) => void) {
  const gM = useGameManager();
  useEffect(
    () => extract(gM.inputManager)(key, cb).unsubscribe,
    [key, cb, gM, extract]
  );
}

export function useKeyDown(key: string, cb: (k: string) => void) {
  useKey(exKeyDown, key, cb);
}
export function useKeyUp(key: string, cb: (k: string) => void) {
  useKey(exKeyUp, key, cb);
}

export function useManyKeys(
  extract: Extractor,
  keys: string[],
  cb: (k: string) => void
) {
  const gM = useGameManager();
  useEffect(() => {
    const subscriptions: Subscription[] = [];
    for (const key of keys)
      subscriptions.push(extract(gM.inputManager)(key, cb));

    return () => {
      for (const sub of subscriptions) sub.unsubscribe();
    };
  }, [keys, cb, gM, extract]);
}

export function useManyKeysDown(keys: string[], cb: (k: string) => void) {
  useManyKeys(exKeyDown, keys, cb);
}
export function useManyKeysUp(keys: string[], cb: (k: string) => void) {
  useManyKeys(exKeyUp, keys, cb);
}

export function useFrame(cb: (fc: number, lifetime?: number) => void) {
  const gM = useGameManager();

  useLayoutEffect(() => {
    let lifetime = 0;
    const sub = gM.frame$.subscribe((fc: number) => {
      cb(fc, lifetime++);
    });

    return sub.unsubscribe;
  }, [cb, gM]);
}

export function useActor(props: ActorProps): ActorData {
  const gM = useGameManager();
  const [motion] = useState<ActorData>(new ActorData(gM, props));
  return motion;
}