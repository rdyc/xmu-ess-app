import { FormMode } from '@generic/types';
import { DemoContentMarkdown } from '@hr/classes/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography, withStyles, WithStyles } from '@material-ui/core';
import { HelpOutline } from '@material-ui/icons';
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
  isDemoOpen: boolean;
}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnMarkdown: () => void;
  handleDemoVisbility: (isDemoOpen: boolean) => void;
}

type AllProps
  = IOwnState
  & IOwnHandler
  & IOwnOption
  & IOwnStateHandler
  & WithStyles<typeof styles>;

const createProps: mapper<AllProps, IOwnState> = (): IOwnState => ({
  isMarkdown: true,
  isDemoOpen: false,
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
  },
  handleDemoVisbility: (props: AllProps) => (isDemoOpen: boolean) => {
    props.stateUpdate({
      isDemoOpen
    });
  }
};

const hrCornerPageContentForm: React.ComponentType<AllProps> = props => {

  const render = (
    <React.Fragment>
      <Card square>
        <CardHeader 
          title={props.intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Content'})}
          action={
            <IconButton 
              onClick={() => {
                props.handleDemoVisbility(true);
              }}
            >
              <HelpOutline />
            </IconButton>
          }
        />
        <CardContent>
          {
            props.isMarkdown ?
            <div 
              onClick={() => {
                if (!props.formikBag.isSubmitting) {
                  props.handleOnMarkdown();
                }
              }}
              className={props.classes.contentHover}
            >
              {
                !props.formikBag.values.content &&
                <Typography variant="title">
                  Click here to edit
                </Typography>
              }
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
                  variant="outlined"
                  disabled={form.isSubmitting}
                  margin="normal"
                  autoComplete="off"
                  label={props.intl.formatMessage(hrMessage.corner.fieldFor(field.name, 'fieldName'))}
                  placeholder={props.intl.formatMessage(hrMessage.corner.fieldFor(field.name, 'fieldPlaceholder'))}
                  helperText={form.touched.content && form.errors.content}
                  error={form.touched.content && Boolean(form.errors.content)}
                  autoFocus={!props.isMarkdown}
                  onBlur={() => props.handleOnMarkdown()}
                  rows="10"
                  rowsMax="99"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    props.formikBag.setFieldValue(field.name, e.target.value);                    
                  }}
                />
              )}
            />
          }
        </CardContent>
      </Card>
      <Dialog
        fullWidth
        scroll="paper"
        maxWidth="lg"
        open={props.isDemoOpen}
        onClose={() => props.handleDemoVisbility(false)}
      >
        <DialogTitle>Guide Markdown</DialogTitle>
        <DialogContent>
          <Grid container spacing={24}>
            <Grid item xs={6} md={6} xl={6}>
              <TextField
                fullWidth
                multiline
                {...GlobalStyle.TextField.ReadOnly}
                value={DemoContentMarkdown.Demo}
              />
            </Grid>
            <Grid item xs={6} md={6} xl={6}>
              <ReactMarkdown className={props.classes.globalFont} source={DemoContentMarkdown.Demo} escapeHtml={false} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );

  return render;
};

export const HrCornerPageContentForm = compose<AllProps, IOwnOption>(
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(hrCornerPageContentForm);