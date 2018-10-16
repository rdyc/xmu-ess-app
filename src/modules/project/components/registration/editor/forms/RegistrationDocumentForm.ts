import { ISystemList } from '@common/classes/response';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { DocumentFormView } from '@project/components/registration/editor/forms/RegistrationDocumentFormView';
import { ProjectDocumentFormData } from '@project/components/registration/editor/forms/RegistrationForm';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, withHandlers } from 'recompose';
import { WrappedFieldArrayProps } from 'redux-form';
import { isNullOrUndefined } from 'util';

interface OwnProps {
  category: 'project' | 'preSales';
  context: WrappedFieldArrayProps<ProjectDocumentFormData>;
}

interface OwnHandlers {
  handleChange: (system: ISystemList) => void;
}

export type DocumentFormProps
  = OwnProps
  & OwnHandlers
  & WithCommonSystem;

const handlerCreators: HandleCreators<DocumentFormProps, OwnHandlers> = {
  handleChange: (props: DocumentFormProps) => (system: ISystemList): void => { 
    const { context } = props;

    // all documents
    const documents = context.fields.getAll();

    // check exist
    const document = documents.find(item => item.documentType === system.type);
    
    // insert or update
    if (isNullOrUndefined(document)) {
      context.fields.push({
        uid: '',
        documentType: system.type,
        isChecked: true
      });
    } else {
      document.isChecked = false;
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<DocumentFormProps, {}> = {
  componentDidMount() {
    const { category, commonDocumentListState, commonDocumentPresalesListState, commonDispatch } = this.props;

    if (category === 'project') {
      if (!commonDocumentListState.isLoading && !commonDocumentListState.response) {
        commonDispatch.documentListRequest({category: 'document'});
      }
    }

    if (category === 'preSales') {
      if (!commonDocumentPresalesListState.isLoading && !commonDocumentPresalesListState.response) {
        commonDispatch.documentPresalesListRequest({category: 'documentPreSales'});
      }
    }
  }
};

export const RegistrationDocumentForm = compose<DocumentFormProps, OwnProps>(
  withCommonSystem,
  withHandlers<DocumentFormProps, OwnHandlers>(handlerCreators),
  lifecycle<DocumentFormProps, {}>(lifecycles),
)(DocumentFormView);