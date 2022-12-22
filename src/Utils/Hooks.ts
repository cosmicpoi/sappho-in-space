import { useEffect, useMemo, useState } from "react";
import { useGameManager } from "..";
import { InputManager } from "../Engine/InputManager";
import { Monomitter, Subscription } from "./Monomitter";
import { ActorData, ActorProps } from "../Engine/Actor";
import { Position } from "./types";

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

// bind a callback to frames
export function useFrame(cb: (fc: number, lifetime?: number) => void) {
  const gM = useGameManager();

  useEffect(() => {
    let lifetime = 0;
    const sub = gM.frame$.subscribe((fc: number) => {
      cb(fc, lifetime++);
    });

    return sub.unsubscribe;
  }, [cb, gM]);
}

// register Actor data to a component
export function useActor(props: ActorProps): ActorData {
  const gM = useGameManager();
  const [motion] = useState<ActorData>(new ActorData(gM, props));
  return motion;
}

// trim leading and trailing newlines - so that we can use string literals ``
export function useCleanStr(text: string): string {
  const cleaned = useMemo(() => {
    let str = text;
    if (str.charAt(0) === "\n") str = str.substring(1, str.length);
    if (str.charAt(str.length - 1) === "\n")
      str = str.substring(0, str.length - 1);
    return str;
  }, [text]);
  return cleaned;
}

// return the center of the map
export function useCenter(): Position {
  const gM = useGameManager();
  const center = useMemo(() => gM.viewportManager.getCenter(), [gM]);
  return center;
}

// log a value
export function useLog<T>(val: T) {
  useEffect(() => {
    console.log(val);
  }, [val]);
}

// bind a value to a read-only function on every update
export function useUpdatedValue<T>(
  getter: () => T,
  update$: Monomitter<void>
): T {
  const [val, setVal] = useState<T>(getter());

  useEffect(() => {
    const sub = update$.subscribe(() => {
      setVal(getter());
    });

    return sub.unsubscribe;
  }, [setVal, getter, update$]);

  return val;
}
