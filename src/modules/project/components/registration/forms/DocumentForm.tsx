import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel } from '@material-ui/core';
import * as React from 'react';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import { Field, WrappedFieldArrayProps } from 'redux-form';

interface OwnProps {
  title: string;
  subHeader: string;
  context:  WrappedFieldArrayProps<any>;
}

type AllProps
  = OwnProps
  & WithCommonSystem;
  
const documentForm: React.SFC<AllProps> = props => {
  const { title, subHeader } = props;
  const { response } = props.commonDocumentListState;
  
  return (
    <Card square>
      <CardHeader 
        title={title}
        subheader={subHeader}
      />
      <CardContent>
        {
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
                    name={`documents[${index}].isChecked`}
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
};

const lifecycles: ReactLifeCycleFunctions<AllProps, {}> = {
  componentDidMount() {
    const { commonDocumentListState, commonDispatch } = this.props;

    if (!commonDocumentListState.isLoading && !commonDocumentListState.response) {
      commonDispatch.documentListRequest({category: 'document'});
    }
  }
};

export default compose<AllProps, OwnProps>(
  withCommonSystem,
  lifecycle<AllProps, {}>(lifecycles),
)(documentForm);