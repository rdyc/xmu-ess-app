import { IAppState, IQueryCollectionState, IResponseCollection } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { IUserState } from '@layout/interfaces';
import { ILeaveGetListRequest } from '@lookup/classes/queries/';
import { ILeaveList } from '@lookup/classes/response';
import { leaveGetListRequest } from '@lookup/store/actions';
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
import { isNullOrUndefined } from 'util';

export interface WithUser {
  userState: IUserState;
}

interface PropsFromState {
  leaveState: IQueryCollectionState<ILeaveGetListRequest, ILeaveList>;
}

interface PropsFromDispatch {
  leaveDispatch: {
    listRequest: typeof leaveGetListRequest;
  };
}

interface OwnProps extends WrappedFieldProps, BaseFieldProps {
  type?: string; 
  label: string; 
  disabled: boolean;
  onChangeValue: (leaveUid: string) => void;
}

type AllProps = PropsFromState & 
                PropsFromDispatch &
                OwnProps &
                ConnectedReduxProps & 
                InjectedIntlProps & 
                WithUser &
                WithWidth &
                WithStyles<typeof styles>;

type initialState = {
  open: boolean,
  search?: string | undefined,
  selected?: ILeaveList | undefined
};

type State = Readonly<initialState>; 

class LeaveLookup extends React.Component<AllProps, State> {
  public state: State = {
     open: false,
  };

  public componentDidMount() {
    // skipp fetch while current state is being loaded
    if (this.props.leaveState.isLoading || this.props.leaveState.response) {
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
    const { response } = this.props.leaveState;
    
    const isMobile = isWidthDown('sm', width);
    const leaves = this.filter(response);

    const rowRenderer = (row: ListRowProps) => {
      if (leaves.length > 0) {
        const leav = leaves[row.index];

        if (!leav) {
          return;
        }

        return (
          <ListItem 
            button 
            key={row.index}
            style={{...row.style}}
            onClick={() => this.handleSelected(leav)}
          >
            <ListItemAvatar>
              <Avatar>
                <BusinessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              color="primary"
              primary={leav.name}
              // secondary={leav.allocation}
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
        aria-labelledby="lookup-leave-dialog-title" 
        onClose={this.handleDialogClose}
      >
        <DialogTitle 
          id="lookup-leave-dialog-title"
          disableTypography
        >
          <Typography variant="title" color="primary">
            <FormattedMessage id="lookup.leave.title" />
          </Typography>

          <Typography variant="subheading">
            <FormattedMessage id="lookup.leave.subTitle" />
          </Typography>
          
          <TextField
            id="lookup-leave-selector-text"
            fullWidth
            margin="normal"
            value={this.state.search}
            disabled={!response}
            label={<FormattedMessage id="global.search" />}
            placeholder={intl.formatMessage({ id: 'lookup.placeholder.leaveSearch' })}
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
              rowCount={leaves.length}
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
          name={`${input.name}`}
          label={label}
          value={this.state.selected && this.state.selected.name || ''}
          disabled={disabled || meta.submitting}
          error={meta.touched && !isNullOrUndefined(meta.error) ? true : false}
          helperText={meta.touched && meta.error}
          onClick={this.handleDialogOpen}
          // InputLabelProps={{ shrink: true }}
        />
          {renderDialog}
      </div>
    );
  }

  private loadData = () => {

    const { user } = this.props.userState;

    if (user) { 
      this.props.leaveDispatch.listRequest({
      filter: {
        companyUid: user.company.uid,
        categoryType: 'LVC02',
        direction: 'ascending',
        orderBy: 'name',
      }
    });
  }};

  private filter = (response: IResponseCollection<ILeaveList> | undefined) => {
    let result: any = [];

    if (response && response.data) {
      if (this.state.search !== '') {
        result = response.data.filter(item => 
          item.name.toLowerCase().indexOf(this.state.search || '') !== -1
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

  // private handleDiscard = (leave: ILeaveList) => {
  //   this.setState({ selected: leave });
  // };

  private handleSelected = (leave: ILeaveList) => {
    this.setState({ open: false, selected: leave });

    this.props.onChangeValue(leave.uid);
  };
}

const mapStateToProps = ({ leaveGetList, user }: IAppState) => ({
  leaveState: leaveGetList,
  userState: user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  leaveDispatch: {
    listRequest: (request: ILeaveGetListRequest) => dispatch(leaveGetListRequest(request)),
  }
});

export const LeaveLookupComponent = connect(
  mapStateToProps, 
  mapDispatchToProps
)(
  withStyles(styles)(
    withWidth()(
      injectIntl(LeaveLookup)
    )
  )
);