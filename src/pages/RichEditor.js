import React, { useState, useEffect, useRef } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { draftToMarkdown } from 'markdown-draft-js';
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import createImagePlugin from 'draft-js-image-plugin';
import Editor from 'draft-js-plugins-editor';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {
  BlockStyleControl,
  InlineStyleControl,
} from '../components/editor/EditorHeader';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import 'draft-js-emoji-plugin/lib/plugin.css';
import 'draft-js-alignment-plugin/lib/plugin.css';
import 'draft-js-image-plugin/lib/plugin.css';

//Editor styles
import '../components/editor/rich-editor.css';

// Plugins
const alignmentPlugin = createAlignmentPlugin();
const imagePlugin = createImagePlugin();
const { AlignmentTool } = alignmentPlugin;
const focusPlugin = createFocusPlugin();
const emojiPlugin = createEmojiPlugin({
  useNativeArt: true,
});

const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const plugins = [focusPlugin, alignmentPlugin, emojiPlugin, imagePlugin];

// key name in local storage
const DRAFTCONTENT = 'post';
const DRAFT_TITLE = 'post_title';

function useRichEditorState() {
  //Editor state
  const [editorState, setEditorState] = useState(() => {
    // IF content save it in local storage fill content with it .
    const content = localStorage.getItem(DRAFTCONTENT);
    if (content.length > 0) {
      return EditorState.createWithContent(
        convertFromRaw(JSON.parse(content[0]))
      );
    } else {
      return EditorState.createEmpty();
    }
  });
  return { editorState, setEditorState };
}
export default function RichEditor({ title, imageCover, content }) {
  //Editor state
  const { editorState, setEditorState } = useRichEditorState();

  // When content change on editor state, update editorstate
  const onChange = (newState) => {
    setEditorState(newState);
  };

  //Handle keys command
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'no-handled';
  };

  // fire event for block type like h1, h2, .. etc when click
  const onToggle = (blockType) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  // fire event for inline style like bold, italic, .. etc when click
  const onToggleInlineStyle = (inlineStyle) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const onTab = (e) => {
    let maxDepth = 4;
    onChange(RichUtils.onTab(editorState, maxDepth));
  };
  const editor = useRef(null);

  const onEditorFocus = () => {
    editor.current.focus();
  };

  useEffect(() => {
    onEditorFocus();
  }, []);
  const onSubmit = () => {
    let content = convertToRaw(editorState.getCurrentContent());

    let markdownData = draftToMarkdown(content);

    // let rawObject = convertToRaw(c);
    // let data = draftToMarkdown(rawObject);
    fetch('https://abdulrahmanblog.herokuapp.com/addpost', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ title: title, content: markdownData }),
    });
  };
  //Send content
  // const [title, setTitle] = useState(() => {
  //   const postTitle = localStorage.getItem(DRAFT_TITLE);
  //   if (postTitle) {
  //     return postTitle;
  //   }
  //   return '';
  // });

  const handleTitle = (event) => {
    localStorage.setItem(DRAFT_TITLE, event.target.value);
    // setTitle(event.target.value);
  };

  // const [imageCover, setImageCover] = useState('');
  function handleImageCover(event) {
    // setImageCover(event.target.value);
  }

  // Save content in local storage .
  const draftHandler = () => {
    const content = convertToRaw(editorState.getCurrentContent());
    const draft = [];
    draft.push({ content });
    localStorage.setItem(DRAFTCONTENT, JSON.stringify(draft, null, 2));
  };
  return (
    <>
      <Grid container direction='column' spacing={3}>
        <Grid item xs={12} md={12}>
          <TextField
            variant='outlined'
            fullWidth
            label='title'
            onChange={handleTitle}
            value={title}
          />
          <TextField
            variant='outlined'
            fullWidth
            label='image'
            onChange={handleImageCover}
            value={imageCover}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <div className='RichEditor-root'>
            <BlockStyleControl editorState={editorState} onToggle={onToggle} />
            <InlineStyleControl
              editorState={editorState}
              onToggle={onToggleInlineStyle}
            />
            <div className='RichEditor-editor' onClick={onEditorFocus}>
              <Editor
                ref={editor}
                blockStyleFn={getBlockStyle}
                customStyleMap={styleMap}
                editorState={editorState}
                plugins={plugins}
                onChange={onChange}
                handleKeyCommand={handleKeyCommand}
                onTab={onTab}
              />
              <EmojiSuggestions />
              <div>
                <EmojiSelect />
              </div>
            </div>
          </div>
        </Grid>
        {/* submit post */}
        <Grid item>
          <Button
            type='click'
            color='primary'
            onClick={onSubmit}
            variant='contained'
          >
            Submit
          </Button>
        </Grid>
        {/* Draft button */}
        <Grid item>
          <Button
            type='click'
            color='primary'
            onClick={draftHandler}
            variant='contained'
          >
            Draft
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

// Customize editor toolbar
const styleMap = {
  backgroundColor: 'red',
  fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
  fontSize: '120px',
  padding: 2,
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockqoute':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}
