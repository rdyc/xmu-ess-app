import { withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import withRoot from '../withRoot';
import styles from '../styles';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { RouteComponentProps, withRouter } from 'react-router';
import { ThemeAnchors, setMenuDrawer, setTitle } from '../store/@layout';
import { ConnectedReduxProps } from '../store';
import { TopAppBar, MenuDrawer, AdditionalDrawer } from '../components';
import { Dispatch } from 'redux';
import { LookupRoleMenuListType } from '../store/lookup/types/LookupRoleMenuListType';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  anchor: ThemeAnchors;
  menuDrawer: boolean;
  menuItems: LookupRoleMenuListType[];
  title: string;
}

interface PropsFromDispatch {
  setMenuDrawer: typeof setMenuDrawer;
  setTitle: typeof setTitle;
}

type AllProps = PropsFromState &
  PropsFromDispatch &
  ConnectedReduxProps;

class BasePage extends React.Component<AllProps> {
  public render() {
    return (
      <div className={this.props.classes.root}>
        <TopAppBar {...this.props}/>
        <MenuDrawer {...this.props}/>
        <AdditionalDrawer {...this.props}/>
        <main className={this.props.classes.content}>
          {this.props.children}
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ layout }: AppState) => ({
  anchor: layout.anchor,
  menuDrawer: layout.menuDrawer,
  menuItems: layout.menuItems,
  title: layout.title
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setMenuDrawer: (open: boolean) => dispatch(setMenuDrawer(open)),
  setTitle: (title: string) => dispatch(setTitle(title))
});

const redux = connect(mapStateToProps, mapDispatchToProps)(BasePage);

export default withRouter(withRoot(withStyles(styles)<{}>(redux)));