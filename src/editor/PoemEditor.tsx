import classNames from 'classnames';
import { EventHandler, SyntheticEvent, useEffect, useRef, VFC } from 'react';
import hyphenateText from '../finnish/hyphenateText';
import isInvalidVerse from '../verses/isInvalidVerse';
import isTooLongVerse from '../verses/isTooLongVerse';
import isTooShortVerse from '../verses/isTooShortVerse';
import parseVerse from '../verses/parseVerse';
import styles from './PoemEditor.module.css';

interface PoemEditorProps {
  content: string;
  onChange: (content: string) => void;
}

function getOffset(element: HTMLElement, range: Range, node: Node, offset: number): number {
  const rangeClone = range.cloneRange();
  rangeClone.selectNodeContents(element);
  rangeClone.setEnd(node, offset);
  return rangeClone.toString().length;
}

function getSelectionOffsets(element: HTMLElement, selection: Selection | null): [number | null, number | null] {
  const rangeCount = selection?.rangeCount;
  const range = rangeCount ? selection.getRangeAt(0) : null;
  if (!selection || !range) {
    return [null, null];
  }
  const { anchorNode, anchorOffset, focusNode, focusOffset } = selection;
  const startOffset = anchorNode && getOffset(element, range, anchorNode, anchorOffset);
  const endOffset = focusNode && getOffset(element, range, focusNode, focusOffset);
  return [startOffset ?? endOffset, endOffset ?? startOffset];
}

function setSelection(selection: Selection, startNode: Node, startOffset: number, endNode: Node, endOffset: number) {
  const range = document.createRange();
  range.setStart(startNode, startOffset);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
  selection.extend?.(endNode, endOffset);
}

function createElement(name: string, className: string, children: Node[]) {
  const element = document.createElement(name.toUpperCase());
  element.className = className;
  appendChildren(element, children);
  return element;
}

function appendChildren(element: HTMLElement, nodes: Node[]) {
  nodes.forEach((node) => {
    element.appendChild(node);
  });
}

function rebuildContents(element: HTMLElement, content: string) {
  const selection = document.getSelection();
  const [startOffset, endOffset] = getSelectionOffsets(element, selection);
  // Rebuild contents
  const hyphenation = hyphenateText(content);
  const verses = hyphenation.map(parseVerse);
  element.innerHTML = '';
  let newStartNode: Node | null = null;
  let newStartOffset: number = 0;
  let newEndNode: Node | null = null;
  let newEndOffset: number = 0;
  appendChildren(
    element,
    verses.map((verse, row) => {
      const isTooShort = isTooShortVerse(verse);
      const isTooLong = isTooLongVerse(verse);
      const isInvalid = isInvalidVerse(verse);
      return createElement(
        'span',
        classNames(styles.verse, row % 2 ? styles.odd : styles.even, {
          [styles.short]: isTooShort,
          [styles.long]: isTooLong,
          [styles.error]: !isTooShort && !isTooLong && isInvalid,
        }),
        verse.trokees.map((trokee, trokeeIdx) =>
          createElement(
            'span',
            classNames(styles.trokee, trokeeIdx % 2 ? styles.odd : styles.even),
            trokee.tokens.map((token) => {
              const { text, offset } = token;
              const textNode = document.createTextNode(text);
              if (startOffset != null && offset <= startOffset && startOffset <= offset + text.length) {
                newStartNode = textNode;
                newStartOffset = startOffset - offset;
              }
              if (endOffset != null && offset <= endOffset && endOffset <= offset + text.length) {
                newEndNode = textNode;
                newEndOffset = endOffset - offset;
              }
              return token.type === 'fill'
                ? textNode
                : createElement(
                    'span',
                    classNames(
                      styles.syllableToken,
                      token.index % 2 ? styles.odd : styles.even,
                      token.errors.length > 0 && styles.errorToken,
                      !token.endsWord && styles.hyphened,
                    ),
                    [textNode],
                  );
            }),
          ),
        ),
      );
    }),
  );
  // Restore selection
  if (selection && newStartNode && newEndNode) {
    setSelection(selection, newStartNode, newStartOffset, newEndNode, newEndOffset);
  }
}

const PoemEditor: VFC<PoemEditorProps> = ({ content, onChange }) => {
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const onContentChange: EventHandler<SyntheticEvent<HTMLDivElement>> = (event) => {
    const element = contentEditableRef.current!;
    const newContent = element.innerText;
    rebuildContents(element, newContent);
    onChange(newContent);
  };

  useEffect(() => {
    const element = contentEditableRef.current!;
    rebuildContents(element, content);
  }, [content]);

  return (
    <div
      contentEditable
      spellCheck={false}
      onInput={onContentChange}
      onBlur={onContentChange}
      ref={contentEditableRef}
      className={styles.editor}
    />
  );
};

export default PoemEditor;
