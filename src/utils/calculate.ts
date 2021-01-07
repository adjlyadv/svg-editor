import { UIStore } from '../stores/UIStore'

export function getRelativePositon(event: any) {
  const editorInfo = UIStore.editorInfo;
  return {
    x: event.clientX - UIStore.editorInfo.left,
    y: event.clientY - UIStore.editorInfo.top
  }
}