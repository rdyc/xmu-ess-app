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
import { FormattedMessage } from 'react-intl';

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

    const elListSubHeader = (
      <ListSubheader color="primary">
        <FormattedMessage id="global.notification.title"/>
      </ListSubheader>
    );

    const elNotifLoading = (
      <ListItem>
        <ListItemText primary={<FormattedMessage id="global.loading"/>} />
      </ListItem>
    );

    const elNotifEmtpy = (
      <ListItem>
        <ListItemText primary={<FormattedMessage id="global.notification.emptySubTitle"/>}/>
      </ListItem>
    );

    return (
      <List
        subheader={elListSubHeader}>
        {loading && elNotifLoading}
        
        {!result && elNotifEmtpy}
        
        {result && result.data
          // order by name asc
          .sort((a , b) => (a.name > b.name) ? 1 : 0)
          .map(category => 
          category.details
            .map(detail => 
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
                <List key={detail.type} dense
                >
                  {detail.items
                    // order by date desc
                    .sort((a , b) => (a.date < b.date) ? 1 : 0)
                    .map(item => 
                    <ListItem 
                      key={item.uid} 
                      button>
                      <ListItemText 
                        key={item.uid} 
                        primary={item.uid + ' - ' + item.name}
                        secondary={detail.type + ' ' + moment(item.date).fromNow()}
                      />
                    </ListItem>
                  )}
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