import { hrMessage } from '@hr/locales/messages/hrMessage';
import { Typography, WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
// import * as classNames from 'classnames';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
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
      <Link to={`/corner/blog/`} className={props.classes.breadcrumbLink}>
        <Typography 
          noWrap
          className={props.classes.breadcrumb}
        >
          {props.intl.formatMessage(hrMessage.corner.field.parentTitle)}                
        </Typography>
      </Link>
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