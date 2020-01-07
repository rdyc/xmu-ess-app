import { FormMode } from '@generic/types';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { withUser, WithUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { FormikActions } from 'formik';
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
  withStateHandlers
} from 'recompose';
import { isNullOrUndefined } from 'util';
import * as Yup from 'yup';
import { IMarkdownCategoryGetListFilter } from '../../../classes/filters/category/IMarkdownCategoryGetListFilter';
import { IMarkdownPostPayload, IMarkdownPutPayload } from '../../../classes/request';
import { WithMarkdown, withMarkdown } from '../../../hoc/withMarkdown';
import { WithMarkdownCategory, withMarkdownCategory } from '../../../hoc/withMarkdownCategory';
import { MarkdownFormView } from './MarkdownFormView';

import { IMarkdown } from '../../../classes/response';

export interface IMarkdownFormValue {
  title: string;
  categoryUid: string;
  content: string;
  description?: string;
}

interface IOwnOption {

}

interface IOwnRouteParams {
  categoryUid: string;
  title: string;
}

interface IOwnState {
  formMode: FormMode;
  demo: string;

  initialValues?: IMarkdownFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IMarkdownFormValue>>>;

  filterCategory?: IMarkdownCategoryGetListFilter;

  moreOpen: boolean;
  isCategoryOpen: boolean;
  anchor: any;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnLoadCategory: () => void;
  handleOnSubmit: (values: IMarkdownFormValue, actions: FormikActions<IMarkdownFormValue>) => void;
  handleMoreOption: (event: any) => void;
  handleCategoryVisibility: (event: React.MouseEvent<HTMLElement>) => void;
}

export type MarkdownFormProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & InjectedIntlProps
  & WithUser
  & WithMasterPage
  & WithMarkdown
  & WithMarkdownCategory
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>;

const createProps: mapper<MarkdownFormProps, IOwnState> = (props: MarkdownFormProps): IOwnState => ({
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,

  // form values
  initialValues: {
    title: '',
    categoryUid: '',
    content: '',
    description: ''
  },

  validationSchema: Yup.object().shape<Partial<IMarkdownFormValue>>({
    title: Yup.string()
      .required(),
    categoryUid: Yup.string()
      .required(),
    content: Yup.string()
      .required()
  }),

  // tslint:disable-next-line:max-line-length
  demo: '# Live demo\n\nChanges are automatically rendered as you type.\n\n* List can be implemented by * or -\n* hash(#) for header, from 1# to 5#(#####)\n\n## HTML block below\n\n<blockquote>\n  This blockquote will change based on the HTML settings above.\n</blockquote>\n\n```\ncan even doing this kind of stuff\n```\n\nPretty neat, eh?\n\n## Tables?\n\n| Feature   | Support |\n| - | - |\n| tables    | ✔ |\n| alignment | ✔ |\n| wewt      | ✔ |\n\n---------------\n\nA component by [Tessa Team](https://put-some-link-here/)\n\n![alternate image if the image doesnt show](https://mdx-logo.now.sh)',

  filterCategory: {
    orderBy: 'name',
    direction: 'ascending',
    isActive: true
  },

  moreOpen: false,
  isCategoryOpen: false,
  anchor: ''
});

const stateUpdaters: StateUpdaters<MarkdownFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<MarkdownFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: MarkdownFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const markdownUid = props.history.location.state.uid;
      const { isLoading } = props.markdownState.detail;
      const user = props.userState.user;

      if (user && markdownUid && !isLoading) {
        props.markdownDispatch.loadDetailRequest({
          markdownUid
        });
      }
    }
  },
  handleOnLoadCategory: (props: MarkdownFormProps) => () => {
    const { isExpired, isLoading } = props.markdownCategoryState.list;
    const { loadListRequest } = props.markdownCategoryDispatch;

    if (isExpired || !isLoading) {
      loadListRequest({ 
        filter: props.filterCategory 
      });
    }
  },
  handleMoreOption: (props: MarkdownFormProps) => (event: any) => {
    props.stateUpdate({
      moreOpen: !props.moreOpen,
    });
    if (event) {
      props.stateUpdate({
        anchor: event.currentTarget
      });
    } else {
      props.stateUpdate({
        anchor: undefined
      });
    }
  },
  handleCategoryVisibility: (props: MarkdownFormProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.stateUpdate({
      isCategoryOpen: !props.isCategoryOpen
    });
  },
  handleOnSubmit: (props: MarkdownFormProps) => (values: IMarkdownFormValue, actions: FormikActions<IMarkdownFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {

      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        
        const payload: IMarkdownPostPayload = {
          title: values.title,
          categoryUid: values.categoryUid,
          content: values.content,
          description: values.description
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.markdownDispatch.createRequest({
            resolve,
            reject,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const markdownUid = props.history.location.state.uid;

        // must have markdownUid
        if (markdownUid) {
          const payload: IMarkdownPutPayload = {
            title: values.title,
            categoryUid: values.categoryUid,
            content: values.content,
            description: values.description
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.markdownDispatch.updateRequest({
              markdownUid,
              resolve,
              reject,
              data: payload
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: IMarkdown) => {

        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: (props.formMode === FormMode.New ? 'SUCCESS CREATE' : 'SUCCESS UPDATE')
        });

        // redirect to detail
        props.history.push(`/playground/markdown/${response.categoryUid}/${response.uid}`, { markdownUid: response.uid, categoryUid: response.categoryUid });
      })
      .catch((error: any) => {
        let err: IValidationErrorResponse | undefined = undefined;
        
        if (error.id) {
          err = error;
        }
        // set submitting status
        actions.setSubmitting(false);
        
        // set form status
        actions.setStatus(error);
        
        // error on form fields
        if (err && err.errors) {
          err.errors.forEach(item => 
            actions.setFieldError(item.field, props.intl.formatMessage({id: item.message}))
          );
        }

        // console.log(error.errors);

        // show flash message
        props.masterPage.flashMessage({
          message: (props.formMode === FormMode.New ? 'CREATE FAILURE' : 'UPDATE FAILURE')
        });
      });
  }
};

const lifeCycles: ReactLifeCycleFunctions<MarkdownFormProps, IOwnState> = {
  componentDidMount() {
    const { request } = this.props.markdownCategoryState.list;

    // 1st load only when request are empty
    if (!request) {
      this.props.handleOnLoadCategory();
    }
  },
  componentWillUpdate() {
    console.log('component will update');
  },
  componentDidUpdate() {
    console.log('component did update');
  }
};

export const MarkdownForm = compose<MarkdownFormProps, IOwnOption>(
  setDisplayName('MarkdownForm'),
  injectIntl,
  withRouter,
  withUser,
  withMasterPage,
  withMarkdown,
  withMarkdownCategory,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycles),
  withStyles(styles)
)(MarkdownFormView);