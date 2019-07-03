import { createStyles, Theme } from '@material-ui/core';

const chart = (theme: Theme) => createStyles({
  table: {
    width: '100%'
  },
  line: {
    height: '10px',
    width: '100px',
    backgroundColor: 'indianred',
    position: 'absolute'
  },
  name: {
    // backgroundColor: 'blue'
    width: '100px'
  },
  month: {
    // backgroundColor: 'green'
    width: '150px'
  }
});

export default chart;