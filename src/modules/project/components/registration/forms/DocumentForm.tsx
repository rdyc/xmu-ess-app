import { ISystemList } from '@common/classes/response';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel } from '@material-ui/core';
import { ProjectDocumentFormData } from '@project/components/registration/forms/RegistrationFormContainer';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import { WrappedFieldArrayProps } from 'redux-form';
import { isNullOrUndefined } from 'util';

interface OwnProps {
  category: 'project' | 'preSales';
  context: WrappedFieldArrayProps<ProjectDocumentFormData>;
}

type AllProps
  = OwnProps
  & WithCommonSystem;
  
const documentForm: React.SFC<AllProps> = props => {
  const { category, context } = props;
  const { isLoading, response } = category === 'project' ? 
    props.commonDocumentListState : 
    props.commonDocumentPresalesListState;

  const handleChange = (system: ISystemList) => {
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
  };

  // const isChecked = (type: string): boolean => {
  //   let result: boolean = false;

  //   // all documents
  //   const documents = context.fields.getAll();

  //   // find existing
  //   const document = documents.find(item => item.documentType === type);

  //   if (!isNullOrUndefined(document)) {
  //     result = document.isChecked;
  //   }

  //   return result;
  // };

  const render = (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id={`project.document.${category}Title`}/>}
        subheader={<FormattedMessage id={`project.document.${category}SubTitle`}/>}
      />
      <CardContent>
        {
          !isLoading &&
          response &&
          response.data &&
          response.data.map((item, index) => {
            return (
              <div key={index}>
                <FormControlLabel
                  label={item.name}
                  control={
                    <Checkbox 
                      value={item.type}
                      // checked={isChecked(item.type)}
                      onChange={() => handleChange(item)}
                    />
                  } 
                />
              </div>
            );
          })
        }
      </CardContent>
    </Card>
  );

  return render;
};

const lifecycles: ReactLifeCycleFunctions<AllProps, {}> = {
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

export default compose<AllProps, OwnProps>(
  withCommonSystem,
  lifecycle<AllProps, {}>(lifecycles),
)(documentForm);