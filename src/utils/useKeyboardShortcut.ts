import { useCallback, useEffect, useReducer } from "react";
import {UIStore} from '../stores/UIStore'

const blacklistedTargets = ["INPUT", "TEXTAREA"];

const keysReducer = (state: any, action: any) => {
  switch(action.type) {
    case "key-down":
      const keyDownState = { ...state, [action.key]: true };
      return keyDownState

    case "key-up":
      const keyUpState = { ...state, [action.key]: false };
      return keyUpState

    case "reset-keys":
      const resetState = { ...action.data };
      return resetState;
    default:
      return state
  }
}

const useKeyboardShortcut = (command:string, callback: any) => {

  const shortcutKeys = command.split("+")

  const initKeysMapping = shortcutKeys.reduce((pre, cur) => {
    pre[cur.toLowerCase()] = false;
    return pre
  },{});

  const [keys, setKeys] = useReducer(keysReducer, initKeysMapping);

  const keydownListener = useCallback(
    assignedKey => (keydownEvent: any) => {
      const loweredKey = assignedKey.toLowerCase();

      keydownEvent.stopPropagation();
      keydownEvent.cancelBubble = true;
      if (keydownEvent.repeat) return
      if (blacklistedTargets.includes(keydownEvent.target.tagName)) return;
      if (loweredKey !== keydownEvent.key.toLowerCase()) return;
      if (keys[loweredKey] === undefined) return;
      if (UIStore.editingPathId === -1) return;
      setKeys({ type: "key-down", key: loweredKey });
      return false;
    },
    [keys]
  );

  const keyupListener = useCallback(
    assignedKey => (keyupEvent: any) => {
      const raisedKey = assignedKey.toLowerCase();

      keyupEvent.stopPropagation();
      keyupEvent.cancelBubble = true;
      if (blacklistedTargets.includes(keyupEvent.target.tagName)) return;
      if (keyupEvent.key.toLowerCase() !== raisedKey) return;
      if (keys[raisedKey] === undefined) return;
      if (UIStore.editingPathId === -1) return;
      setKeys({ type: "key-up", key: raisedKey });
      return false;
    },
    [keys]
  );

  useEffect(() => {

    if (!Object.values(keys).filter(value => !value).length) {
      callback(keys)
      setKeys({ type: "reset-keys", data: initKeysMapping });
    } else {
      setKeys({ type: null });
    }
  }, [callback, keys, initKeysMapping]);

  useEffect(() => {
    shortcutKeys.forEach(key => window.addEventListener("keydown", keydownListener(key)));
    return () => shortcutKeys.forEach(key => window.removeEventListener("keydown", keydownListener(key)))
  }, [])

  useEffect(() => {
    shortcutKeys.forEach(key => window.addEventListener("keyup", keyupListener(key)));
    return () => shortcutKeys.forEach(key => window.removeEventListener("keyup", keyupListener(key)))
  }, [])

}

export default useKeyboardShortcut