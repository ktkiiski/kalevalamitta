import { forwardRef, useEffect, useRef } from 'react';
import useImperativeFocusHandle, { Focusable } from '../utils/useImperativeFocusHandle';

export interface Selection {
  start: number;
  end: number;
}

interface TextareaProps {
  value: string;
  onChange: (value: string, selection: Selection | null) => void;
  placeholder?: string;
  className?: string;
}

function getSelection(element: HTMLTextAreaElement): Selection | null {
  if (document.activeElement !== element) {
    return null;
  }
  const { selectionDirection, selectionEnd, selectionStart } = element;
  if (selectionDirection === 'backward') {
    return { start: selectionEnd, end: selectionStart };
  }
  return { start: selectionStart, end: selectionEnd };
}

const Textarea = forwardRef<Focusable | undefined, TextareaProps>(({ value, onChange, ...props }, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeFocusHandle(ref, textareaRef);

  useEffect(() => {
    function onSelectionChange() {
      const element = textareaRef.current!;
      onChange(element.value, getSelection(element));
    }

    document.addEventListener('selectionchange', onSelectionChange);
    return () => document.removeEventListener('selectionchange', onSelectionChange);
  }, [onChange]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(event) => {
        const element = event.currentTarget;
        onChange(element.value, getSelection(element));
      }}
      spellCheck={false}
      {...props}
    />
  );
});

export default Textarea;
