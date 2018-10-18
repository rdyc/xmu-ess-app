import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { DocumentFormView } from '@project/components/registration/editor/forms/RegistrationDocumentFormView';
import { ProjectDocumentFormData } from '@project/components/registration/editor/forms/RegistrationForm';
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

export type DocumentFormProps
  = OwnProps
  & OwnHandlers
  & WithCommonSystem;

const handlerCreators: HandleCreators<DocumentFormProps, OwnHandlers> = {
  handleChange: (props: DocumentFormProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => { 
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
  isChecked: (props: DocumentFormProps) => (type: string): boolean => { 
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

const lifecycles: ReactLifeCycleFunctions<DocumentFormProps, {}> = {
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

export const RegistrationDocumentForm = compose<DocumentFormProps, OwnProps>(
  withCommonSystem,
  withHandlers<DocumentFormProps, OwnHandlers>(handlerCreators),
  lifecycle<DocumentFormProps, {}>(lifecycles),
)(DocumentFormView);