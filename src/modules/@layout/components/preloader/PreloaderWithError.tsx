import { IQueryCollectionState } from '@generic/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import {
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { Warning } from '@material-ui/icons';
import styles from '@styles';
import { IApiHeaders } from '@utils/api';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, setDisplayName } from 'recompose';

const getHeaderKey = (headers: IApiHeaders[], key: string): string => {
  let result = '';

  const header = headers.find(item => item.key === key);

  if (header) {
    result = header.value;
  }
  
  return result;
};

interface IOwnOption {
  state: IQueryCollectionState<any, any>;
  waitingText: string;
  onRetry: (event: React.MouseEvent<HTMLElement>) => void;
}

type AllProps 
  = IOwnOption
  & InjectedIntlProps
  & WithStyles<typeof styles>;

const LoaderView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.state.isLoading &&
      <div className={props.classes.preloader}>
        <div className={props.classes.preloaderContent}>
          <CircularProgress style={{margin: 'auto'}} color="primary" />

          <Typography className={props.classes.marginFarTop}>{props.waitingText}</Typography>
        </div>    
      </div>
    }

    {
      !props.state.isLoading &&
      props.state.isError &&
      props.state.errors &&
      <Paper square>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Warning 
                color="error"
                className={props.classes.marginThinRight} 
              />
            </ListItemAvatar>

            {
              typeof props.state.errors === 'string' &&
              <ListItemText 
                primary={props.state.errors} 
                primaryTypographyProps={{
                  variant: 'body2'
                }}
              />
            }

            {
              typeof props.state.errors === 'object' &&
              <ListItemText 
                primary={props.state.errors.statusText}
                secondary={
                  <React.Fragment>
                    <FormattedMessage id={props.state.errors.body.message} /> <br/>
                    {getHeaderKey(props.state.errors.headers, 'x-correlation-id')} <br/>
                    {getHeaderKey(props.state.errors.headers, 'date')}
                  </React.Fragment>
                }
                primaryTypographyProps={{
                  variant: 'body2'
                }}
                secondaryTypographyProps={{
                  variant: 'body2'
                }}
              />
            }
            
            <ListItemSecondaryAction>
              <Button 
                size="small"
                color="primary" 
                onClick={props.onRetry}
              >
                {props.intl.formatMessage(layoutMessage.text.retry)}
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>
    }

    {
      !props.state.isLoading &&
      !props.state.isError &&
      props.children
    }
  </React.Fragment>
);

export const PreloaderWithError = compose<AllProps, IOwnOption>(
  setDisplayName('PreloaderWithError'),
  withStyles(styles),
  injectIntl
)(LoaderView);