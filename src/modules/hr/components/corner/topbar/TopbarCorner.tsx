import { AppBar, IconButton, Toolbar, Typography, WithStyles, withStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';

interface IOwnProps {
  title: string;
  parentUrl?: string;
  appBarSearchComponent?: React.ReactNode;
  appBarCustomComponent?: React.ReactNode;
}

type AllProps = 
  IOwnProps 
  & InjectedIntlProps 
  & RouteComponentProps
  & WithStyles<typeof styles>;

const topbarCorner: React.SFC<AllProps> = props => {
  const { title, parentUrl, appBarSearchComponent, appBarCustomComponent } = props;

  const render = (
    <AppBar
      elevation={0}
      color="default"
      position="fixed"
      className={classNames(props.classes.cornerAppBar, props.classes.shift)}
    >
      <Toolbar>
        {
          parentUrl &&
          <IconButton
            color="inherit"
            onClick={() => props.history.push(parentUrl)}
          >
            <ArrowBackIcon />
          </IconButton>
        }

        <Typography 
          noWrap
          color="inherit"
          variant="h6"
          className={props.classes.flex}
        >
          {title}
        </Typography>
        {
          appBarSearchComponent
        }
        {
          appBarCustomComponent
        }
      </Toolbar>
    </AppBar>
  );

  return render;
};

export const TopbarCorner = compose<AllProps, IOwnProps>(
  injectIntl,
  withRouter,
  withStyles(styles)
)(topbarCorner);