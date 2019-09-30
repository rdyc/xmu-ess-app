import { FormMode } from '@generic/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { Card, CardContent, CardHeader, TextField, WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import * as ReactMarkdown from 'react-markdown';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { ICornerPageFormValue } from './HrCornerPageForm';

interface IOwnOption {
  formMode: FormMode; 
  formikBag: FormikProps<ICornerPageFormValue>;
  intl: InjectedIntl;
}

interface IOwnState {
  isMarkdown: boolean;
}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnMarkdown: () => void;
}

type AllProps
  = IOwnState
  & IOwnHandler
  & IOwnOption
  & IOwnStateHandler
  & WithStyles<typeof styles>;

const createProps: mapper<AllProps, IOwnState> = (): IOwnState => ({
  isMarkdown: true
});

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateHandler> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleOnMarkdown: (props: AllProps) => () => {
    props.stateUpdate({
      isMarkdown: !props.isMarkdown
    });
    console.log('markdown ganti', props.isMarkdown);
  }
};

const hrCornerPageContentForm: React.ComponentType<AllProps> = props => {

  const render = (
    <React.Fragment>
      <Card square>
        <CardHeader 
          title={props.intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Content'})}
        />
        <CardContent>
          {
            props.isMarkdown ?
            <div onClick={() => {
              if (!props.formikBag.isSubmitting) {
                props.handleOnMarkdown();
              }
            }}>
              <ReactMarkdown className={props.classes.globalFont} source={props.formikBag.values.content} escapeHtml={false} />
            </div>
            :
            <Field
              name="content"
              render={({ field, form }: FieldProps<ICornerPageFormValue>) => (
                <TextField
                  {...field}
                  fullWidth
                  required
                  multiline
                  disabled={form.isSubmitting}
                  margin="normal"
                  autoComplete="off"
                  label={props.intl.formatMessage(hrMessage.corner.fieldFor(field.name, 'fieldName'))}
                  placeholder={props.intl.formatMessage(hrMessage.corner.fieldFor(field.name, 'fieldPlaceholder'))}
                  helperText={form.touched.content && form.errors.content}
                  error={form.touched.content && Boolean(form.errors.content)}
                  autoFocus={!props.isMarkdown}
                  onBlur={() => props.handleOnMarkdown()}
                />
              )}
            />
          }
        </CardContent>
      </Card>
    </React.Fragment>
  );

  return render;
};

export const HrCornerPageContentForm = compose<AllProps, IOwnOption>(
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(hrCornerPageContentForm);