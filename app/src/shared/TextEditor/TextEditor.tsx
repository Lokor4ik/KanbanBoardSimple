/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
/* eslint-disable no-nested-ternary */
import React, { Ref, forwardRef, useCallback, useMemo, PropsWithChildren } from 'react';

import isHotkey from 'is-hotkey';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import { Editor, Transforms, createEditor, Element as SlateElement } from 'slate';
import { withHistory } from 'slate-history';

import { cx, css } from '@emotion/css';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import CodeIcon from '@material-ui/icons/Code';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

import { initialStateKanban } from 'store/kanban/reducer';

import './TextEditor.scss';

interface BaseProps {
  className: string;
  [key: string]: unknown;
}
type OrNull<T> = T | null;

export const Button = forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean;
        reversed: boolean;
      } & BaseProps
    >,
    ref: Ref<OrNull<HTMLSpanElement>>
  ) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed ? (active ? 'white' : '#aaa') : active ? 'black' : '#ccc'};
        `
      )}
    />
  )
);

export const Menu = React.forwardRef(
  ({ className, ...props }: PropsWithChildren<BaseProps>, ref: Ref<OrNull<HTMLDivElement>>) => (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          & > * {
            display: inline-block;
          }

          & > * + * {
            margin-left: 15px;
          }
        `
      )}
    />
  )
);

export const Toolbar = forwardRef(
  ({ className, ...props }: PropsWithChildren<BaseProps>, ref: Ref<OrNull<HTMLDivElement>>) => (
    <Menu
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          position: relative;
          padding: 10px;
          border-bottom: 2px solid #eee;
        `
      )}
    />
  )
);

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const TextEditor = ({ editTextEditor, descrValue, handleChange }) => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const editor = useMemo(() => withHistory(withReact(createEditor())), [editTextEditor]);

  return (
    <div className="text-editor__wrapper">
      <Slate
        editor={editor}
        value={!descrValue ? initialStateKanban.ticketDescr : descrValue}
        onChange={handleChange}
      >
        {editTextEditor && (
          <Toolbar className="tool-bar">
            <MarkButton format="bold" icon={<FormatBoldIcon />} />
            <MarkButton format="italic" icon={<FormatItalicIcon />} />
            <MarkButton format="underline" icon={<FormatUnderlinedIcon />} />
            <MarkButton format="code" icon={<CodeIcon />} />
            <BlockButton format="heading-one" icon={<LooksOneIcon />} />
            <BlockButton format="heading-two" icon={<LooksTwoIcon />} />
            <BlockButton format="block-quote" icon={<FormatQuoteIcon />} />
            <BlockButton format="numbered-list" icon={<FormatListNumberedIcon />} />
            <BlockButton format="bulleted-list" icon={<FormatListBulletedIcon />} />
          </Toolbar>
        )}

        <Editable
          className={editTextEditor ? 'text-editor text-editor--edit' : 'text-editor'}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some text…"
          spellCheck
          autoFocus
          readOnly={!editTextEditor}
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
    </div>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(!Editor.isEditor(n) && SlateElement.isElement(n) && n.type),
    split: true,
  });
  const newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

export default TextEditor;
