import { Button, Grid, TextField } from '@material-ui/core';
import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import './MarkdownStyle.css';
import { PlayMarkdownProps } from './PlayMarkdown';

export const PlayMarkdownView: React.SFC<PlayMarkdownProps> = props => (
  <React.Fragment>
    <Grid container spacing={8}>
      <Grid item xs={6}>
        <TextField 
          value={props.value}
          onChange={e => props.handleValue(e.target.value)}
          multiline
          fullWidth
        />
      </Grid>
      <Grid item xs={6} style={{border: '2px solid gray'}}>
        <ReactMarkdown source={props.value} escapeHtml={false} />
      </Grid>
      <Button variant="contained" color="primary" onClick={() => props.handleSubmit()}>
        Submit
      </Button>
    </Grid>
  </React.Fragment>
);