import { IPageInfo, IQuerySingleState } from '@generic/interfaces';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { IAppBarMenu } from '@layout/interfaces';
import { WithStyles, withStyles, withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, lifecycle, ReactLifeCycleFunctions, setDisplayName } from 'recompose';

import { FormPageView } from './FormPageView';

interface IOwnOption {
  state: IQuerySingleState<any, any>;
  options?: IAppBarMenu[];
  info: IPageInfo;
  appBarComponent?: React.ReactNode;
  onLoadApi: () => void;
  onLoadedApi?: () => void;
}

interface IOwnState {

}

export type FormPageProps
  = IOwnOption
  & WithStyles<typeof styles>
  & WithWidth
  & WithMasterPage
  & InjectedIntlProps;

const lifecycles: ReactLifeCycleFunctions<FormPageProps, IOwnState> = {
  componentDidMount() {
    // configure view
    this.props.masterPage.changePage({
      ...this.props.info
    });

    if (this.props.appBarComponent) {
      this.props.masterPage.changeCustomComponent(this.props.appBarComponent);
    }

    // loading data event from config
    this.props.onLoadApi();
  },
  componentDidUpdate(prevProps: FormPageProps) {
    // handling updated custom component
    if (this.props.appBarComponent && this.props.appBarComponent !== prevProps.appBarComponent) {
      this.props.masterPage.changeCustomComponent(this.props.appBarComponent);
    }
    
    // handling updated response state
    if (this.props.state.response !== prevProps.state.response) {
      if (this.props.onLoadedApi) {
        this.props.onLoadedApi();
      }
    }
  },
  componentWillUnmount() {
    // reset page
    this.props.masterPage.resetPage();
  }
};

export const FormPage = compose<FormPageProps, IOwnOption>(
  setDisplayName('FormPage'),
  withMasterPage,
  lifecycle(lifecycles),
  withStyles(styles),
  withWidth(),
  injectIntl
)(FormPageView);