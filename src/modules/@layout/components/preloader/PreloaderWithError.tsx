import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { layoutMessage } from '@layout/locales/messages';
import {
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography';
import { Report, TurnedInNot } from '@material-ui/icons';
import styles from '@styles';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, setDisplayName } from 'recompose';

const getHeaderKey = (headers: ICollectionValue[], name: string): string => {
  let result = '';

  const header = headers.find(item => item.name === name);

  if (header) {
    result = header.value;
  }
  
  return result;
};

interface IOwnOption {
  state: IQueryCollectionState<any, any> | IQuerySingleState<any, any>;
  waitingText: string;
  waitingTextProps?: TypographyProps;
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
          <CircularProgress 
            style={{margin: 'auto'}} 
            color="secondary"
          />

          <Typography
            {...props.waitingTextProps}
            className={props.classes.marginFarTop}
          >
            {props.waitingText}
          </Typography>
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
            <ListItemIcon>
              <Report color="action"/>
            </ListItemIcon>

            {
              typeof props.state.errors === 'string' &&
              <ListItemText 
                primary={props.state.errors} 
                primaryTypographyProps={{ variant: 'body2' }}
              />
            }

            {
              typeof props.state.errors === 'object' &&
              <ListItemText 
                primary={props.state.errors.statusText}
                secondary={
                  props.state.errors.body && 
                  <FormattedMessage id={props.state.errors.body.message} /> || props.state.errors.status
                }
                primaryTypographyProps={{ variant: 'body1' }}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
            }
            
            <ListItemSecondaryAction>
              <Button 
                size="small"
                color="secondary" 
                onClick={props.onRetry}
              >
                {props.intl.formatMessage(layoutMessage.text.retry)}
              </Button>
            </ListItemSecondaryAction>
          </ListItem>

          {
            typeof props.state.errors === 'object' &&
            <React.Fragment>
              <Divider/>
              <ListItem>
                <ListItemIcon>
                  <TurnedInNot color="action"/>
                </ListItemIcon>
                <ListItemText 
                  primary={getHeaderKey(props.state.errors.headers, 'x-correlation-id')}
                  secondary={getHeaderKey(props.state.errors.headers, 'date')}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            </React.Fragment>
          }
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