import { CircularProgress, Typography, WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { compose, setDisplayName } from 'recompose';

interface IOwnOption {
  show: boolean;
  label: string;
}

type AllProps 
  = IOwnOption
  & WithStyles<typeof styles>;

const LoaderView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {props.show &&
      <div className={props.classes.preloader}>
        <div className={props.classes.preloaderContent}>
          <CircularProgress style={{margin: 'auto'}} color="primary" />

          <Typography className={props.classes.marginFarTop}>{props.label}</Typography>
        </div>    
      </div>
    }

    {props.children}
  </React.Fragment>
);

export const Preloader = compose<AllProps, IOwnOption>(
  setDisplayName('Preloader'),
  withStyles(styles)
)(LoaderView);