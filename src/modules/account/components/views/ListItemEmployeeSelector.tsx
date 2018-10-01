import { ListItemEmployee } from '@account/components/views/ListItemEmployee';
import { IEmployeeListRequest } from '@account/interfaces/queries';
import { IEmployee } from '@account/interfaces/response';
import { employeeGetListRequest } from '@account/store/actions';
import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  WithStyles,
  withStyles,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import styles from '@styles';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  employeeState: IQueryCollectionState<IEmployeeListRequest, IEmployee>;
}

interface PropsFromDispatch {
  employeeDispatch: {
    allRequest: typeof employeeGetListRequest;
  };
}

interface OwnProps {
  onSelected: (employee: IEmployee) => boolean;
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

class ListItemEmployeeSelector extends React.Component<AllProps, State> {
  state: State = initialState;

  componentDidMount() {
    // skipp fetch while current state is being loaded
    if (this.props.employeeState.isLoading || this.props.employeeState.response) {
      return;
    }

    this.loadData();
  }

  loadData = () => {
    this.props.employeeDispatch.allRequest({
      filter: {
        companyUids: undefined,
        roleUids: undefined,
        positionUids: undefined,
        find: this.state.search,
        findBy: undefined,
        direction: undefined,
        orderBy: undefined,
        size: undefined
      }
    });
  };

  fnFilterEmployee = (employees: IEmployee[]) => {
    if (this.state.search !== '') {
      return employees.filter(item => 
        item.fullName.toLowerCase().indexOf(this.state.search) !== -1 || 
        item.email.toLowerCase().indexOf(this.state.search) !== -1
      );
    } 

    return employees;
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

  handleSelected = (employee: IEmployee) => {
    if (this.props.onSelected(employee)) {
      this.setState({ selected: {} });
    }
  };

  handleDiscard = () => {
    this.setState({ selected: {} });
  };

  handleListItemClick = (employee: IEmployee) => {
    this.setState({ open: false, selected: employee });
  };

  render() {
    const { intl } = this.props;
    const { isLoading, response } = this.props.employeeState;

    const renderDialog = (
      <Dialog 
        fullScreen={false}
        open={this.state.open}
        aria-labelledby="account-employee-dialog-title" 
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
          id="account-employee-dialog-title"
        >
          <Typography variant="title" color="primary">
            <FormattedMessage id="account.employee.lookupTitle" />
          </Typography>

          <Typography variant="subheading">
            <FormattedMessage id="account.employee.lookupDescription" />
          </Typography>
          
          <TextField
            id="account-employee-selector-text"
            fullWidth
            margin="normal"
            disabled={!response}
            label={<FormattedMessage id="global.search" />}
            placeholder={intl.formatMessage({ id: 'account.placeholder.lookupSearch' })}
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
              this.fnFilterEmployee(response.data)
                .map(item => 
                <ListItem 
                  button 
                  key={item.uid} 
                  onClick={() => this.handleListItemClick(item)}
                >
                  <ListItemAvatar key={item.uid}>
                    <Avatar key={item.uid}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    key={item.uid}
                    primary={item.fullName}
                    secondary={item.email} 
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

    const employee = this.state.selected as IEmployee;

    return (
      <div>
        <ListItemEmployee
          data={employee}
          classes={this.props.classes}
          action={
            employee.uid ?
              <div>
                <IconButton 
                  onClick={this.handleDiscard}
                >
                  <CloseIcon/>
                </IconButton>
                <IconButton 
                  onClick={() => this.handleSelected(employee)}
                >
                  <DoneIcon/>
                </IconButton>
              </div>
              :
              <IconButton onClick={this.handleDialogOpen}>
                <AddIcon/>
              </IconButton>
          }
          />
        {renderDialog} 
      </div>
    );
  }
}

const mapStateToProps = ({ employeeGetList }: IAppState) => ({
  employeeState: employeeGetList
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  employeeDispatch: {
    allRequest: (request: IEmployeeListRequest) => dispatch(employeeGetListRequest(request)),
  }
});

const redux = connect(mapStateToProps, mapDispatchToProps)(ListItemEmployeeSelector);

export default injectIntl(withStyles(styles)(redux));