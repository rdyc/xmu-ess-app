import { IBaseChanges, IQueryCollectionState } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { Divider, Grid, List, ListItem, ListSubheader, Typography, WithStyles } from '@material-ui/core';
import { ICurrencyAllRequest } from '@lookup/classes/queries';
import { ICurrency } from '@lookup/classes/response';
import styles from '@styles';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedNumber, FormattedPlural } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { isArray } from 'util';

interface PropsFromState extends RouteComponentProps<void> {
  currencyState: IQueryCollectionState<ICurrencyAllRequest, ICurrency>;
}

type AllProps = PropsFromState & 
                ConnectedReduxProps & 
                WithStyles<typeof styles>;
                
export const CurrencyList: React.ComponentType<AllProps> = props => {
  const { history  } = props;
  const { response, isLoading  } = props.currencyState;

  const handleClick = (currencyUid: string) => {
    if (!isLoading) {
      history.push(`/currency/details/${currencyUid}`);
    } 
  };

  const parseChanges = (changes: IBaseChanges | null) => {
    let result = 'Unknown';
    
    if (!changes) {
      return result;
    }

    if (changes.updatedBy !== null) {
      result = changes.updated ? (changes.updated ? changes.updated.fullName : changes.updatedBy) : changes.updatedBy;
    } else {
      result = changes.created ? changes.created.fullName : changes.createdBy;
    }

    return result;
  };

  const renderCurrencyList = (currencys: ICurrency[]) => {
    const len = currencys.length - 1;

    return (
      currencys.map((currency, i) => 
        <div key={currency.uid}>
          <ListItem 
            button={!isLoading} 
            key={currency.uid} 
            onClick={() => handleClick(currency.uid)}
          >
            <Grid container spacing={24}>
              <Grid item xs={8} sm={8}>
                <Typography 
                  noWrap 
                  color="primary" 
                  variant="body2"
                >
                  {currency.name}
                </Typography>
                <Typography 
                  noWrap
                  variant="body1"
                >
                  {currency.symbol}
                </Typography>
                <Typography 
                  noWrap
                  color="textSecondary" 
                  variant="caption"
                >
                  {currency.rate} &bull;
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Typography 
                  noWrap 
                  variant="body1" 
                  align="right"
                >
                  {currency.symbol}
                </Typography>
                <Typography 
                  noWrap 
                  color="secondary"
                  variant="caption" 
                  align="right"
                >
                  {parseChanges(currency.changes)}
                </Typography>
                <Typography 
                  noWrap
                  variant="caption" 
                  align="right"
                >
                  {currency.changes && moment(currency.changes.updatedAt ? currency.changes.updatedAt : currency.changes.createdAt).fromNow()}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
          {len !== i && <Divider />}
        </div>
      )
    );
  };

  return (
    <List
      component="nav"
      subheader={
        <ListSubheader
          component="div"
        >
          {
            response &&
            response.metadata && 
            <Grid container spacing={24}>
              <Grid item xs={6} sm={6}>
                <Typography variant="caption" color="primary">
                  <FormattedNumber value={response.metadata.total} /> &nbsp;
                  <FormattedPlural one="currency" other="currencys" value={response.metadata.total} />
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Typography variant="caption" align="right" color="primary">
                  <FormattedNumber value={response.metadata.paginate.current} /> of <FormattedNumber value={response.metadata.paginate.total} />
                </Typography>
              </Grid>
            </Grid>
          }
        </ListSubheader>
      }
    >
      {
        response &&
        isArray(response.data) && 
        renderCurrencyList(response.data)
      }
    </List>
  );
};