import * as React from 'react';
import { AppUser, setNotification } from '../store/@layout';
import { RouteComponentProps } from 'react-router';
// tslint:disable-next-line:max-line-length
import { WithStyles, withStyles, List, ListSubheader, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Collapse } from '@material-ui/core';
import styles from '../styles';
import { ConnectedReduxProps, AppState } from '../store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { notificationFetchRequest } from '../store/notification/NotificationActions';
import { NotificationType } from '../store/notification/types/NotificationType';
import { ListResponseType } from '../store/@base/ListResponseType';
import { NotificationParameter } from '../store/notification/types/NotificationParameter';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import * as moment from 'moment';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: AppUser;
  notification: number;
  param: NotificationParameter;
  result?: ListResponseType<NotificationType>;
  errors?: string;
  loading: boolean;
}

interface PropsFromDispatch {
  fetchRequest: typeof notificationFetchRequest;
  setNotification: typeof setNotification;
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps;

class Notifications extends React.Component<AllProps> {
  public state = {
    active: '',
    isExpanded: false,
    count: 0
  };

  public handleVisibility = (type: string) => {
    this.setState(() => ({
      active: type,
      isExpanded: this.state.active === type ? !this.state.isExpanded : true
    }));
  };

  public componentDidMount() {
    this.props.fetchRequest({
      companyUid: this.props.user.company.uid,
      positionUid: this.props.user.position.uid
    });
  }

  public componentDidUpdate() {
    let count: number = 0;

    if (this.props.result) {
      this.props.result.data.forEach(element => 
        element.details.forEach(detail => {
          count = count + detail.total;
        })
      );
    }

    this.props.setNotification(count);
  }

  public render() {
    const { loading, result } = this.props;

    return (
      <List
        subheader={<ListSubheader color="primary">Notifications</ListSubheader>}>
        {loading && 
          <ListItem>
            <ListItemText primary="Loading..."/>
          </ListItem>
        }
        {!result && 
          <ListItem>
            <ListItemText primary="There is no notification at this time"/>
          </ListItem>
        }
        {result && result.data.map(category => 
          category.details.map(detail => 
            <div>
              <ListItem 
                key={category.name} 
                >
                <ListItemText 
                  key={category.name} 
                  primary={category.name + ' (' + detail.total + ')'}
                />
                <ListItemSecondaryAction 
                  key={category.name}>
                  <IconButton 
                    key={category.name} 
                    onClick={() => this.handleVisibility(category.name + '_' + detail.type)}>
                    {this.state.active === category.name + '_' + detail.type && this.state.isExpanded ? 
                    <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Collapse 
                key={detail.type}
                in={this.state.active === category.name + '_' + detail.type && this.state.isExpanded} 
                timeout="auto" 
                unmountOnExit>
                <List 
                  key={detail.type} dense>
                  {detail.items.map(item => 
                  <ListItem 
                    key={item.uid} 
                    button>
                    <ListItemText 
                      key={item.uid} 
                      primary={item.uid + ' - ' + item.name}
                      secondary={detail.type + ' ' + moment(item.date).fromNow()}
                    />
                  </ListItem>)}
                </List>
              </Collapse>
            </div>
        ))}
      </List>
    );
  }
}

const mapStateToProps = ({ layout, notification }: AppState) => ({
  user: layout.user,
  notification: layout.notification,
  param: notification.parameter,
  result: notification.result,
  errors: notification.errors,
  loading: notification.loading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRequest: (params: NotificationParameter) => dispatch(notificationFetchRequest(params)),
  setNotification: (count: number) => dispatch(setNotification(count))
});

const redux = connect(mapStateToProps, mapDispatchToProps)(Notifications);

export default withStyles(styles)<{}>(redux);