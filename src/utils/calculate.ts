import { UIStore } from '../stores/UIStore'

export function getRelativePositon(event: any) {
  const editorInfo = UIStore.editorInfo;
  return {
    x: event.clientX - editorInfo.left,
    y: event.clientY - editorInfo.top
  }
}