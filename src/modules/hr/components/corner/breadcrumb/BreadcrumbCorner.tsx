import { hrMessage } from '@hr/locales/messages/hrMessage';
import { Button, Typography, WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';

interface IOwnProps {
  child: () => JSX.Element[];
}

type AllProps = 
  IOwnProps 
  & InjectedIntlProps 
  & RouteComponentProps
  & WithStyles<typeof styles>;

const breadcrumbCorner: React.SFC<AllProps> = props => {
  const { child } = props;

  const render = (
    <React.Fragment>
      <Button
        className={classNames(props.classes.titleTopBarCorner)}
        onClick={() => {
          props.history.push('/corner/blog');
        }}
      >
        <Typography 
          noWrap
          style={{textTransform: 'capitalize'}}
        >
          {props.intl.formatMessage(hrMessage.corner.field.parentTitle)}                
        </Typography>
      </Button>
      {
        child &&
        child().map((children) => 
          children
        )
      }
    </React.Fragment>
  );

  return render;
};

export const BreadcrumbCorner = compose<AllProps, IOwnProps>(
  injectIntl,
  withRouter,
  withStyles(styles)
)(breadcrumbCorner);