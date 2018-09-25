import { IAppState, IResponseList } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { IAppUser, INotification, INotificationQuery } from '@layout/interfaces';
import { notificationFetchRequest, layoutChangeNotif } from '@layout/store/actions';
import {
  Collapse,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  WithStyles,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import styles from '@styles';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { isArray } from 'util';

interface PropsFromState extends RouteComponentProps<void> {
  user: IAppUser;
  notification: number;
  result?: IResponseList<INotification>;
  errors?: string;
  loading: boolean;
}

interface PropsFromDispatch {
  fetchRequest: typeof notificationFetchRequest;
  setNotification: typeof layoutChangeNotif;
}

type AllProps = PropsFromState & 
                PropsFromDispatch & 
                ConnectedReduxProps & 
                WithStyles<typeof styles>;

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

  public componentWillReceiveProps(nextProps: AllProps) {
    let count: number = 0;
    
    if (this.props.result) {
      if (isArray(this.props.result.data)) {
        this.props.result.data.forEach(element =>
          element.details.forEach(detail => {
            count = count + detail.total;
          })
        );
      }
    }
      
    if (this.props.notification !== count) {
      this.props.setNotification(count);
    }
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
      <List subheader={elListSubHeader}>
        {loading && elNotifLoading}
        {!loading && !result && elNotifEmtpy}
        {!loading && result && isArray(result.data) && result.data
          // order by name asc
          .sort((a , b) => (a.name > b.name) ? 1 : 0)
          .map(category => category.details
            .map(detail =>
              <div key={detail.type}>
                <ListItem
                  key={category.name}
                  button
                  onClick={() => this.handleVisibility(category.name + '_' + detail.type)}
                >
                  <ListItemText
                    key={category.name}
                    primary={category.name + ' (' + detail.total + ')'}
                  />
                  <ListItemSecondaryAction key={category.name}>
                    {this.state.active === category.name + '_' + detail.type && this.state.isExpanded ?
                    <ExpandLess /> : <ExpandMore />}
                  </ListItemSecondaryAction>
                </ListItem>
                <Collapse
                  key={detail.type}
                  in={this.state.active === category.name + '_' + detail.type && this.state.isExpanded}
                  timeout="auto"
                  unmountOnExit
                >
                  <List key={detail.type} dense>
                    {detail.items
                      // order by date desc
                      .sort((a , b) => (a.date < b.date) ? 1 : 0)
                      .map(item =>
                      <ListItem
                        key={item.uid}
                        button
                      >
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
            )
          )
        }
      </List>
    );
  }
}

const mapStateToProps = ({ layout, notification }: IAppState) => ({
  user: layout.user,
  notification: layout.notifCount,
  result: notification.result,
  errors: notification.errors,
  loading: notification.loading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRequest: (params: INotificationQuery) => dispatch(notificationFetchRequest(params)),
  setNotification: (count: number) => dispatch(layoutChangeNotif(count))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);