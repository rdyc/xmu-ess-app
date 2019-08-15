import { Grid } from '@material-ui/core';
import * as React from 'react';
import * as Markdown from 'react-markdown';
import { compose } from 'recompose';

const reactmarkdown: React.SFC<AmchartProps> = props => {
  const input: string = '# This is a header\n\nAnd this is a paragraph';

  return (
    <Grid container spacing={8}>
      <Grid item xs={6}>
        
      </Grid>
      <Grid item xs={6}>
        <Markdown source={input} />
      </Grid>
    </Grid>
  );
};

interface IOwnState {
  //
}

type AmchartProps = IOwnState;

export const ReactMarkdown = compose<AmchartProps, {}>()(reactmarkdown);