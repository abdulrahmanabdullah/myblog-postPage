import React from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  header: {
    position: 'fixed',
    color: 'yellow',
  },
}));

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];
// Customize text styles
const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

// Block style control component
export const BlockStyleControl = (props) => {
  const styles = useStyles();
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div>
      <Grid container spacing={3} alignItems='center'>
        {BLOCK_TYPES.map((type, key) => (
          <Grid item key={key} className='RichEditor-controls'>
            <ButtonStyle
              label={type.label}
              style={type.style}
              active={type.style === blockType}
              onToggle={props.onToggle}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
// Block style control component
export const InlineStyleControl = (props) => {
  const { editorState } = props;

  const currentStyle = editorState.getCurrentInlineStyle();
  return (
    <div>
      <Grid container spacing={3} alignItems='center'>
        {INLINE_STYLES.map((type, key) => (
          <Grid item key={key} className='RichEditor-controls'>
            <ButtonStyle
              label={type.label}
              style={type.style}
              active={currentStyle.has(type.style)}
              onToggle={props.onToggle}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

// Style buttons on toolbar
const ButtonStyle = (props) => {
  const onToggle = (e) => {
    e.preventDefault();
    props.onToggle(props.style);
  };
  let activeButton = 'RichEditor-styleButton';
  if (props.active) {
    activeButton += 'RichEditor-activeButton';
  }
  return (
    <span className={activeButton} onMouseDown={onToggle}>
      {props.label}
    </span>
  );
};
