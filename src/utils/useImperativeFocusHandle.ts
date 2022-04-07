import { Ref, RefObject, useImperativeHandle } from 'react';

export interface Focusable {
  focus(): void;
}

export default function useImperativeFocusHandle(
  ref: Ref<Focusable | undefined>,
  textareaRef: RefObject<HTMLTextAreaElement>,
) {
  useImperativeHandle(
    ref,
    (): Focusable => ({
      focus() {
        textareaRef.current!.focus();
      },
    }),
  );
}
