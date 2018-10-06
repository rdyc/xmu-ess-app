import { IAppState, IQueryCollectionState, IResponseCollection } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { ILookupCustomer } from '@lookup/classes';
import { ICustomerListRequest } from '@lookup/classes/queries';
import { ICustomerList } from '@lookup/classes/response';
import { customerGetListRequest } from '@lookup/store/actions';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import withWidth, { isWidthDown, WithWidth } from '@material-ui/core/withWidth';
import BusinessIcon from '@material-ui/icons/Business';
import SearchIcon from '@material-ui/icons/Search';
import styles from '@styles';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { List as VirtualizedList, ListRowProps } from 'react-virtualized';
import { Dispatch } from 'redux';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

interface PropsFromState {
  customerState: IQueryCollectionState<ICustomerListRequest, ICustomerList>;
}

interface PropsFromDispatch {
  customerDispatch: {
    listRequest: typeof customerGetListRequest;
  };
}

interface OwnProps extends WrappedFieldProps, BaseFieldProps {
  type?: string; 
  label: string; 
  disabled: boolean;
  onChangeValue: (customer: ICustomerList) => void;
}

type AllProps = PropsFromState & 
                PropsFromDispatch &
                OwnProps &
                ConnectedReduxProps & 
                InjectedIntlProps & 
                WithWidth &
                WithStyles<typeof styles>;

const initialState = {
  open: false,
  search: '',
  selected: {}
};

type State = Readonly<typeof initialState>;          

class CustomerLookup extends React.Component<AllProps, State> {
  public state: State = initialState;

  public componentDidMount() {
    // skipp fetch while current state is being loaded
    if (this.props.customerState.isLoading || this.props.customerState.response) {
      return;
    }

    this.setState({ selected: this.props.input.value });

    // don't load while control has set as disabled
    if (!this.props.disabled) {
      this.loadData();
    }
  }

  public render() {
    const { width, intl, input, label, disabled, meta } = this.props;
    const { response } = this.props.customerState;
    
    const isMobile = isWidthDown('sm', width);
    const customers = this.filter(response);

    const rowRenderer = (row: ListRowProps) => {
      if (customers.length > 0) {
        const cust = customers[row.index];

        if (!cust) {
          return;
        }

        return (
          <ListItem 
            button 
            key={row.index}
            style={{...row.style}}
            onClick={() => this.handleSelected(cust)}
          >
            <ListItemAvatar>
              <Avatar>
                <BusinessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              color="primary"
              primary={cust.name}
              secondary={cust.address}
              primaryTypographyProps={{
                noWrap: true
              }}
              secondaryTypographyProps={{
                noWrap: true
              }}
            />
          </ListItem>
        );
      }

      return null;
    };

    const renderDialog = (
      <Dialog 
        fullScreen={isMobile}
        open={this.state.open}
        aria-labelledby="lookup-customer-dialog-title" 
        onClose={this.handleDialogClose}
      >
        <DialogTitle 
          id="lookup-customer-dialog-title"
          disableTypography
        >
          <Typography variant="title" color="primary">
            <FormattedMessage id="lookup.customer.lookupTitle" />
          </Typography>

          <Typography variant="subheading">
            <FormattedMessage id="lookup.customer.lookupDescription" />
          </Typography>
          
          <TextField
            id="lookup-customer-selector-text"
            fullWidth
            margin="normal"
            value={this.state.search}
            disabled={!response}
            label={<FormattedMessage id="global.search" />}
            placeholder={intl.formatMessage({ id: 'lookup.placeholder.customerSearch' })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleChange(event)}
            onKeyUp={(event: React.KeyboardEvent<HTMLDivElement>) => this.handleKeyUp(event)}
          />
        </DialogTitle>
        <DialogContent 
          style={{ 
            padding: 0 
          }}
        >
          <List>
            <VirtualizedList
              width={600}
              height={550}
              // autoWidth
              // autoHeight
              rowCount={customers.length}
              rowHeight={60}
              rowRenderer={rowRenderer}
            />
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleDialogClose} color="secondary">
            <FormattedMessage id="global.action.discard" />
          </Button>
        </DialogActions>
      </Dialog>
    );

    return (
      <div>
        <TextField
          fullWidth
          margin="normal"
          name={input.name}
          label={label}
          value={input.value.name}
          disabled={disabled || meta.submitting}
          error={meta.touched && meta.error}
          helperText={meta.touched && meta.error}
          onClick={this.handleDialogOpen}
          InputLabelProps={{ shrink: true }}
        />
          {renderDialog}
      </div>
    );
  }

  private loadData = () => {
    const customer = this.props.input.value as ILookupCustomer;

    this.props.customerDispatch.listRequest({
      filter: {
        companyUid: customer.companyUid,
        find: this.state.search,
        findBy: undefined,
        direction: 'ascending',
        orderBy: 'name',
        size: undefined
      }
    });
  };

  private filter = (response: IResponseCollection<ICustomerList> | undefined) => {
    let result: any = [];

    if (response && response.data) {
      if (this.state.search !== '') {
        result = response.data.filter(item => 
          item.name.toLowerCase().indexOf(this.state.search) !== -1
        );
      } else {
        result = response.data;
      }
    }

    return result;
  };

  private handleDialogOpen = () => {
    if (!this.props.disabled) {
      this.setState({ open: true });
    }
  };

  private handleDialogClose = () => {
    this.setState({ open: false });
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    this.setState({ search: value });
  };

  private handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // delete pressed
    if (event.keyCode === 46) {
      this.setState({ search: '' });
    }
  };

  private handleDiscard = () => {
    this.setState({ selected: {} });
  };

  private handleSelected = (customer: ICustomerList) => {
    this.setState({ open: false, selected: customer });

    this.props.onChangeValue(customer);
  };
}

const mapStateToProps = ({ customerGetList }: IAppState) => ({
  customerState: customerGetList
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  customerDispatch: {
    listRequest: (request: ICustomerListRequest) => dispatch(customerGetListRequest(request)),
  }
});

export const CustomerLookupComponent = connect(
  mapStateToProps, 
  mapDispatchToProps
)(
  withStyles(styles)(
    withWidth()(
      injectIntl(CustomerLookup)
    )
  )
);