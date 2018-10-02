import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { ICustomerListRequest } from '@lookup/interfaces/queries';
import { ICustomerList } from '@lookup/interfaces/response';
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
import BusinessIcon from '@material-ui/icons/Business';
import SearchIcon from '@material-ui/icons/Search';
import styles from '@styles';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ILookupCustomer } from '@lookup/interfaces';

interface PropsFromState {
  customerState: IQueryCollectionState<ICustomerListRequest, ICustomerList>;
}

interface PropsFromDispatch {
  customerDispatch: {
    listRequest: typeof customerGetListRequest;
  };
}

interface OwnProps {
  input: any; 
  label: string; 
  onSelected: (customer: ICustomerList) => void;
}

type AllProps = PropsFromState & 
                PropsFromDispatch &
                OwnProps &
                ConnectedReduxProps & 
                InjectedIntlProps & 
                WithStyles<typeof styles>;

const initialState = {
  open: false,
  search: '',
  selected: {}
};

type State = Readonly<typeof initialState>;          

class CustomerLookup extends React.Component<AllProps, State> {
  state: State = initialState;

  componentDidMount() {
    // skipp fetch while current state is being loaded
    if (this.props.customerState.isLoading || this.props.customerState.response) {
      return;
    }

    this.setState({ selected: this.props.input.value });

    this.loadData();
  }

  loadData = () => {
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

  fnFilterCustomer = (customers: ICustomerList[]) => {
    if (this.state.search !== '') {
      return customers.filter(item => 
        item.uid.toLowerCase().indexOf(this.state.search) !== -1 || 
        item.name.toLowerCase().indexOf(this.state.search) !== -1
      );
    } 

    return customers;
  };

  handleDialogOpen = () => {
    this.setState({ open: true });
  };

  handleDialogClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    this.setState({ search: value });
  };

  handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // console.log(event.keyCode); // 13 = enter
    // console.log(event.currentTarget);

    // delete pressed
    if (event.keyCode === 46) {
      this.setState({ search: '' });

      // todo: clear input value
    }
  };

  handleDiscard = () => {
    this.setState({ selected: {} });
  };

  handleSelected = (customer: ICustomerList) => {
    this.setState({ open: false, selected: customer });
    this.props.onSelected(customer);
  };

  render() {
    const { intl } = this.props;
    const { isLoading, response } = this.props.customerState;

    const renderDialog = (
      <Dialog 
        fullScreen={false}
        open={this.state.open}
        aria-labelledby="lookup-customer-dialog-title" 
        scroll="paper" 
        PaperProps={{
          style: {
            width: 500,
            height: 600
          }
        }}
        onClose={this.handleDialogClose}
      >
        <DialogTitle 
          id="lookup-customer-dialog-title"
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
        <DialogContent>
          <List>
            {
              !isLoading &&
              response &&
              response.data &&
              this.fnFilterCustomer(response.data)
                .map(item => 
                <ListItem 
                  button 
                  key={item.uid}
                  onClick={() => this.handleSelected(item)}
                >
                  <ListItemAvatar key={item.uid}>
                    <Avatar key={item.uid}>
                      <BusinessIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText color="primary"
                    key={item.uid}
                    primary={item.name}
                    secondary={item.address}
                    secondaryTypographyProps={{
                      noWrap: true
                    }}
                  />
                </ListItem>
              )
            }
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleDialogClose} color="secondary">
            <FormattedMessage id="global.action.discard" />
          </Button>
        </DialogActions>
      </Dialog>
    );

    const customer = this.state.selected as ICustomerList;

    return (
      <div>
        <TextField
          fullWidth
          margin="normal"
          value={customer.name}
          label={this.props.label}
          // disabled={this.props.disabled || submitting}
          // error={this.props.touched && this.props.error}
          // helperText={this.props.touched && this.props.error}
          onClick={this.handleDialogOpen}
          InputLabelProps={{ shrink: true }}
        />
          {renderDialog}
      </div>
    );
  }
}

const mapStateToProps = ({ customerGetList }: IAppState) => ({
  customerState: customerGetList
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  customerDispatch: {
    listRequest: (request: ICustomerListRequest) => dispatch(customerGetListRequest(request)),
  }
});

const redux = connect(mapStateToProps, mapDispatchToProps)(CustomerLookup);

export default injectIntl(withStyles(styles)(redux));