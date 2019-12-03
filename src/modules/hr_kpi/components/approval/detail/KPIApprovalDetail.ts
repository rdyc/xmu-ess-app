import { AppRole } from '@constants/AppRole';
import { KPIEmployeeUserAction } from '@kpi/classes/types';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import * as Yup from 'yup';

import { IKPIApprovalPostPayload } from '@kpi/classes/request';
import { withKPIApproval, WithKPIApproval } from '@kpi/hoc/withKPIApproval';
import { withMasterPage, WithMasterPage } from '@layout/hoc/withMasterPage';
import { IValidationErrorResponse } from '@layout/interfaces';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { FormikActions } from 'formik';
import { KPIApprovalDetailView } from './KPIApprovalDetailView';

interface IKPIApprovalItemFormValue {
  uid: string;
  categoryName: string;
  categoryGroup: string;
  measurementType: string;
  measurementDescription: string;
  target: string;
  weight: number;
  threshold?: number;
  amount: number;
  achieved: number;
  progress: number;
  score: number;
}

export interface IKPIApprovalFormValue {
  uid: string;
  statusType: string;
  // isApproved?: boolean;
  isFinal: boolean;
  isFirst: boolean;
  // revision?: string;
  totalScore: number;
  notes: string;
  items: IKPIApprovalItemFormValue[];
}
interface IOwnRouteParams {
  kpiUid: string;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  isAdmin: boolean;
  shouldLoad: boolean;
  isDialogOpen: boolean;
  action?: KPIEmployeeUserAction;

  initialValues: IKPIApprovalFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IKPIApprovalFormValue>>>;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  setShouldLoad: StateHandler<IOwnState>;
  setOptions: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSubmit: (values: IKPIApprovalFormValue, action: FormikActions<IKPIApprovalFormValue>) => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleSetDialogOpen: () => void;
}

export type KPIApprovalDetailProps
  = WithUser
  & WithOidc
  & WithKPIApproval
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<KPIApprovalDetailProps, IOwnState> = (props: KPIApprovalDetailProps): IOwnState => {
  // checking admin status
  const { user } = props.oidcState;
  let isAdmin: boolean = false;

  if (user) {
    const role: string | string[] | undefined = user.profile.role;

    if (role) {
      if (Array.isArray(role)) {
        isAdmin = role.indexOf(AppRole.Admin) !== -1;
      } else {
        isAdmin = role === AppRole.Admin;
      }
    }
  }
  return {
    isAdmin,
    shouldLoad: false,
    isDialogOpen: false,

    initialValues: {
      uid: props.match.params.kpiUid,
      statusType: '',
      isFinal: false,
      isFirst: true,
      notes: '',
      totalScore: 0,
      items: []
    },
    validationSchema: Yup.object().shape<Partial<IKPIApprovalFormValue>>({
      uid: Yup.string(),
  
      isFinal: Yup.boolean()
        .required(),
  
      isFirst: Yup.boolean(),
  
      totalScore: Yup.number(),
  
      items: Yup.array()
        .of(
          Yup.object().shape({
            uid: Yup.string(),

            categoryUid: Yup.string(),
              
            categoryName: Yup.string(),
              
            categoryGroup: Yup.string(),
  
            measurementType: Yup.string(),
              
            measurementDescription: Yup.string(),
  
            target: Yup.string(),
  
            weight: Yup.number(),
  
            threshold: Yup.number(),
  
            amount: Yup.number(),
  
            achieved: Yup.number()
              .label(props.intl.formatMessage(kpiMessage.employee.field.achieved))
              .min(0)
              .required(),

            notes: Yup.string(),
            
            progress: Yup.number(),
            
            score: Yup.number(),
          })
        )
    }),
  };
};

const stateUpdaters: StateUpdaters<KPIApprovalDetailProps, IOwnState, IOwnStateUpdaters> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  setShouldLoad: (state: IOwnState) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: () => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<KPIApprovalDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: KPIApprovalDetailProps) => () => { 
    if (props.userState.user && props.match.params.kpiUid && props.match.params.kpiUid && !props.kpiApprovalState.detail.isLoading) {
      props.kpiApprovalDispatch.loadDetailRequest({
        kpiUid: props.match.params.kpiUid
      });
    }
  },
  handleOnSubmit: (props: KPIApprovalDetailProps) => (values: IKPIApprovalFormValue, actions: FormikActions<IKPIApprovalFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // create 
      const kpiUid = props.match.params.kpiUid;

      // must have kpiUid
      if (kpiUid) {

        // fill payload 
        const payload: IKPIApprovalPostPayload = {
          isFinal: values.isFinal,
          notes: values.notes,
          items: []
        };

        // fill payload items
        values.items.forEach(item => payload.items.push({
          uid: item.uid,
          achieved: item.achieved,
        }));

        promise = new Promise((resolve, reject) => {
          props.kpiApprovalDispatch.approvalRequest({
            kpiUid,
            resolve,
            reject,
            data: payload,
          });
        });
      }
    }

    // handling promise 
    promise
      .then(() => {
        // set submitting status 
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        props.stateUpdate({
          isDialogOpen: false,
        });

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(kpiMessage.employee.message.approvalSuccess)
        });

        props.setShouldLoad();
      })
      .catch((error: IValidationErrorResponse) => {
        // set submitting status
        actions.setSubmitting(false);

        // set form status
        actions.setStatus(error);

        props.stateUpdate({
          isDialogOpen: false,
        });

        // error on form fields
        if (error.errors) {
          error.errors.forEach(item =>
            actions.setFieldError(item.field, props.intl.formatMessage({ id: item.message }))
          );
        }

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(kpiMessage.employee.message.updateFailure)
        });
      });
  },
  handleOnSelectedMenu: (props: KPIApprovalDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case KPIEmployeeUserAction.Refresh:
        props.setShouldLoad();
        break;

      default:
        break;
    }
  },
  handleSetDialogOpen: (props: KPIApprovalDetailProps) => () => {
    props.stateUpdate({
      isDialogOpen: !props.isDialogOpen,
    });
  },
};

const lifecycles: ReactLifeCycleFunctions<KPIApprovalDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: KPIApprovalDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.kpiUid !== prevProps.match.params.kpiUid) {
      this.props.handleOnLoadApi();
    }

    // handle template detail response
    const { response: thisResponse } = this.props.kpiApprovalState.detail;
    const { response: prevResponse } = prevProps.kpiApprovalState.detail;

    // handle updated response state
    if (thisResponse !== prevResponse) {
      const { isLoading } = this.props.kpiApprovalState.detail;

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: KPIEmployeeUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
        },
      ];

      this.props.setOptions(options);

      if (thisResponse && thisResponse.data) {
        const initialValues: IKPIApprovalFormValue = {
          uid: thisResponse.data.uid,
          statusType: thisResponse.data.statusType,
          isFinal: thisResponse.data.isFinal,
          isFirst: thisResponse.data.isFirst,
          notes: thisResponse.data.notes || '',
          totalScore: thisResponse.data.totalScore,
          items: [],
        };

        if (thisResponse.data.items) {
          // fill template items
          thisResponse.data.items.forEach(item =>
            initialValues.items.push({
              uid: item.uid,
              categoryName: item.categoryName || '',
              categoryGroup: item.category && item.category.group || '',
              measurementType: item.measurement && item.measurement.measurementType || '',
              measurementDescription: item.measurement && item.measurement.description || '',
              target: item.target || '',
              weight: item.weight || 0,
              threshold: item.threshold || 0,
              amount: item.amount || 0,
              achieved: item.achieved,
              progress: item.progress,
              score: item.score,
            })
          );
        }

        // set initial values
        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const KPIApprovalDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withKPIApproval,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('KPIApprovalDetail'),
  withStyles(styles)
)(KPIApprovalDetailView);