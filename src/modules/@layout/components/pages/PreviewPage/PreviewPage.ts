import AppMenu from '@constants/AppMenu';
import { IQuerySingleState } from '@generic/interfaces';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { IAppBarMenu } from '@layout/interfaces';
import { WithStyles, withStyles, withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, lifecycle, ReactLifeCycleFunctions, setDisplayName } from 'recompose';

import { PreviewPageView } from './PreviewPageView';

interface IOwnOption {
  state: IQuerySingleState<any, any>;
  options?: IAppBarMenu[];
  info: {
    uid: AppMenu | string;
    parentUid?: AppMenu | string;
    parentUrl?: string;
    title: string;
    description: string;
  };
  onLoadApi: () => void;
  onLoadedApi?: () => void;
  primary: (data: any) => JSX.Element;
  secondary?: (data: any) => JSX.Element[];
}

interface IOwnState {

}

export type PreviewPageProps
  = IOwnOption
  & WithStyles<typeof styles>
  & WithWidth
  & WithLayout
  & WithAppBar
  & InjectedIntlProps;

const lifecycles: ReactLifeCycleFunctions<PreviewPageProps, IOwnState> = {
  componentDidMount() {
    // get page config
    const page = this.props.info;

    // configure view
    this.props.layoutDispatch.setupView({
      view: {
        uid: page.uid,
        parentUid: page.parentUid,
        title: page.title,
        subTitle: page.description,
      },
      parentUrl: page.parentUrl,
      status: {
        isNavBackVisible: true,
        isSearchVisible: false,
        isModeList: false,
        isModeSearch: false,
        isMoreVisible: false
      }
    });

    // loading data event from config
    this.props.onLoadApi();
  },
  componentDidUpdate(prevProps: PreviewPageProps) {
    // handling updated page options state
    if (this.props.options && this.props.options !== prevProps.options) {
      this.props.layoutDispatch.moreShow();
      this.props.appBarDispatch.assignMenus(this.props.options);
    }
    
    // handling updated response state
    if (this.props.state.response !== prevProps.state.response) {
      if (this.props.onLoadedApi) {
        this.props.onLoadedApi();
      }
    }
  },
  componentWillUnmount() {
    // reset top bar back to default 
    this.props.appBarDispatch.dispose();
  }
};

export const PreviewPage = compose<PreviewPageProps, IOwnOption>(
  setDisplayName('PreviewPage'),
  withLayout,
  withAppBar,
  lifecycle(lifecycles),
  withStyles(styles),
  withWidth(),
  injectIntl
)(PreviewPageView);