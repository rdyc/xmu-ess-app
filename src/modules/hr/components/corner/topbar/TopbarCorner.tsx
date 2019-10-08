import { AppBar, Button, IconButton, Toolbar, Typography, WithStyles, withStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';

interface IOwnProps {
  parentTitle: string;
  parentUrl: string;
  childTitle?: string;
  childUrl?: string;
  appBarSearchComponent?: React.ReactNode;
  appBarCustomComponent?: React.ReactNode;
}

type AllProps = 
  IOwnProps 
  & InjectedIntlProps 
  & RouteComponentProps
  & WithStyles<typeof styles>;

const topbarCorner: React.SFC<AllProps> = props => {
  const { parentTitle, parentUrl, appBarSearchComponent, appBarCustomComponent, childTitle, childUrl } = props;

  const render = (
    <AppBar
      elevation={0}
      color="default"
      position="fixed"
      className={classNames(props.classes.cornerAppBar, props.classes.shift)}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={() => props.history.push(childUrl ? childUrl : parentUrl)}
        >
          <ArrowBackIcon />
        </IconButton>

        {
          childUrl ?
          <Button
            className={classNames(props.classes.titleTopBarCorner)}
            onClick={() => {
              if (childUrl) {
                props.history.push(parentUrl);
              }
            }}
          >
            <Typography 
              noWrap
              variant="h6"
              style={{textTransform: 'capitalize', color: '#fff'}}
            >
              {parentTitle}
            </Typography>
          </Button>
          :
          <Typography 
            noWrap
            color="inherit"
            variant="h6"
            className={props.classes.flex}
            style={{textTransform: 'capitalize', display: childTitle ? 'contents' : 'block'}}
          >
            {parentTitle}
          </Typography>
        }

        {
          childTitle &&
          <Typography 
            noWrap
            color="inherit"
            variant="h6"
            className={props.classes.flex}
            style={{textTransform: 'capitalize', paddingLeft: '8px'}}
          >
            > {childTitle}
          </Typography>
        }
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