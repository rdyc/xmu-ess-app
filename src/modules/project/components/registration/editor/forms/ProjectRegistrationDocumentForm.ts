import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { ProjectDocumentFormData } from '@project/components/registration/editor/forms/ProjectRegistrationContainerForm';
import {
  ProjectRegistrationDocumentFormView,
} from '@project/components/registration/editor/forms/ProjectRegistrationDocumentFormView';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, withHandlers } from 'recompose';
import { WrappedFieldArrayProps } from 'redux-form';

interface OwnProps {
  category: 'project' | 'preSales';
  context: WrappedFieldArrayProps<ProjectDocumentFormData>;
}

interface OwnHandlers {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  isChecked: (type: string) => boolean;
}

export type ProjectDocumentFormProps
  = OwnProps
  & OwnHandlers
  & WithCommonSystem
  & InjectedIntlProps;

const handlerCreators: HandleCreators<ProjectDocumentFormProps, OwnHandlers> = {
  handleChange: (props: ProjectDocumentFormProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => { 
    // const { context } = props;
    // const el = event.currentTarget.value;

    // // all documents
    // const documents = context.fields.getAll();

    // // check exist
    // const document = documents.find(item => item.documentType === el);
    
    // // insert or update
    // if (isNullOrUndefined(document)) {
    //   context.fields.push({
    //     uid: '',
    //     documentType: el,
    //     isChecked: checked
    //   });
    // } else {
    //   document.isChecked = checked;
    // }
  },
  isChecked: (props: ProjectDocumentFormProps) => (type: string): boolean => { 
    // const { context } = props;

    const result: boolean = false;

    // // all documents
    // const documents = context.fields.getAll();

    // // check exist
    // const document = documents.find(item => item.documentType === type);

    // if (!isNullOrUndefined(document)) {
    //   result = document.isChecked;
    // }

    return result;
  }
};

const lifecycles: ReactLifeCycleFunctions<ProjectDocumentFormProps, {}> = {
  componentDidMount() {
    const { category, commonDocumentListState, commonDocumentPresalesListState, commonDispatch } = this.props;

    if (category === 'project') {
      if (!commonDocumentListState.isLoading && !commonDocumentListState.response) {
        commonDispatch.documentListRequest({
          category: 'document',
          filter: {
            orderBy: 'code',
            direction: 'ascending'
          }
        });
      }
    }

    if (category === 'preSales') {
      if (!commonDocumentPresalesListState.isLoading && !commonDocumentPresalesListState.response) {
        commonDispatch.documentPresalesListRequest({
          category: 'documentPreSales',
          filter: {
            orderBy: 'code',
            direction: 'ascending'
          }
        });
      }
    }
  }
};

export const ProjectRegistrationDocumentForm = compose<ProjectDocumentFormProps, OwnProps>(
  withCommonSystem,
  injectIntl,
  withHandlers<ProjectDocumentFormProps, OwnHandlers>(handlerCreators),
  lifecycle<ProjectDocumentFormProps, {}>(lifecycles),
)(ProjectRegistrationDocumentFormView);