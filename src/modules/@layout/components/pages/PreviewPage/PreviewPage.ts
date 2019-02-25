import { IPageInfo, IQuerySingleState } from '@generic/interfaces';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
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
  info: IPageInfo;
  primary: (data: any) => JSX.Element;
  secondary?: (data: any) => JSX.Element[];
  customComponent?: React.ReactNode;
  onLoadApi: () => void;
  onLoadedApi?: () => void;
}

interface IOwnState {

}

export type PreviewPageProps
  = IOwnOption
  & WithStyles<typeof styles>
  & WithWidth
  & WithMasterPage
  & InjectedIntlProps;

const lifecycles: ReactLifeCycleFunctions<PreviewPageProps, IOwnState> = {
  componentDidMount() {
    // configure view
    this.props.masterPage.changePage({
      ...this.props.info
    });

    if (this.props.customComponent) {
      this.props.masterPage.changeCustomComponent(this.props.customComponent);
    }

    // loading data event from config
    this.props.onLoadApi();
  },
  componentDidUpdate(prevProps: PreviewPageProps) {
    // handling updated custom component
    if (this.props.customComponent && this.props.customComponent !== prevProps.customComponent) {
      this.props.masterPage.changeCustomComponent(this.props.customComponent);
    }
    
    // handling updated response state
    if (this.props.state.response !== prevProps.state.response) {
      if (this.props.onLoadedApi) {
        this.props.onLoadedApi();
      }
    }
  }
};

export const PreviewPage = compose<PreviewPageProps, IOwnOption>(
  setDisplayName('PreviewPage'),
  withMasterPage,
  lifecycle(lifecycles),
  withStyles(styles),
  withWidth(),
  injectIntl
)(PreviewPageView);