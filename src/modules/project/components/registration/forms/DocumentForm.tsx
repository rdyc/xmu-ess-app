import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel } from '@material-ui/core';
import * as React from 'react';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import { Field, WrappedFieldArrayProps } from 'redux-form';

interface OwnProps {
  category: 'document' | 'documentPreSales';
  title: string;
  subHeader: string;
  context:  WrappedFieldArrayProps<any>;
}

type AllProps
  = OwnProps
  & WithCommonSystem;
  
const documentForm: React.SFC<AllProps> = props => {
  const { category, title, subHeader } = props;
  const { isLoading, response } = category === 'document' ? 
    props.commonDocumentListState : 
    props.commonDocumentPresalesListState;
  const fieldName = category === 'document' ? 'documents' : 'documentPreSales';
  
  const render = (
    <Card square>
      <CardHeader 
        title={title}
        subheader={subHeader}
      />
      <CardContent>
        {
          !isLoading &&
          response &&
          response.data &&
          response.data.map((item, index) => 
            <div key={index}>
              <FormControlLabel
                key={index}
                label={item.name}
                control={
                  <Field
                    key={index}
                    type="checkbox"
                    name={`${fieldName}[${index}].isChecked`}
                    component={({ input, meta }: any) => 
                      <Checkbox 
                        {...input} 
                        key={index} 
                        value={item.type}
                        disabled={meta.submitting}
                      />
                    }
                  />
                } 
              />
          </div>
          )
        }
      </CardContent>
    </Card>
  );

  return render;
};

const lifecycles: ReactLifeCycleFunctions<AllProps, {}> = {
  componentDidMount() {
    const { category, commonDocumentListState, commonDocumentPresalesListState, commonDispatch } = this.props;

    if (category === 'document') {
      if (!commonDocumentListState.isLoading && !commonDocumentListState.response) {
        commonDispatch.documentListRequest({category});
      }
    }

    if (category === 'documentPreSales') {
      if (!commonDocumentPresalesListState.isLoading && !commonDocumentPresalesListState.response) {
        commonDispatch.documentPresalesListRequest({category});
      }
    }
  }
};

export default compose<AllProps, OwnProps>(
  withCommonSystem,
  lifecycle<AllProps, {}>(lifecycles),
)(documentForm);