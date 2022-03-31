import { useEffect, useRef } from 'react';

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

function Textarea({ value, onChange, ...props }: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
}

export default Textarea;
