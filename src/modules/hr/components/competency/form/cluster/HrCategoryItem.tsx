import { FormMode } from '@generic/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardActions, CardHeader, Collapse, Divider, List, ListItem, ListItemSecondaryAction, ListItemText, TextField, WithStyles, withStyles } from '@material-ui/core';
import { DeleteForever, ExpandLess, ExpandMore, PlaylistAdd } from '@material-ui/icons';
import styles from '@styles';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { compose, mapper, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';
import { IClusterFormValue } from './HrCompetencyClusterForm';

interface IOwnOption {
  formMode: FormMode; 
  formikBag: FormikProps<IClusterFormValue>;
  intl: InjectedIntl;
}

interface IOwnState {
  active: number | undefined;
  isExpanded: boolean;
}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
  handleToggle: (uid?: number) => IOwnState;
}

type AllProps
  = IOwnState
  & IOwnOption
  & IOwnStateHandler
  & WithStyles<typeof styles>;

const createProps: mapper<AllProps, IOwnState> = (): IOwnState => ({
  active: undefined,
  isExpanded: false
});

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateHandler> = {
  handleToggle: (state: IOwnState) => (uid?: number) => ({
    active: uid,
    isExpanded: state.active === uid ? !state.isExpanded : true
  })
};

const hrCategoryItem: React.ComponentType<AllProps> = props => {
  const { active, isExpanded, handleToggle } = props;

  const render = (
  <FieldArray 
    name="categories"
    render={(fields: FieldArrayRenderProps) => (
      <React.Fragment>
        <Card square>
          <CardHeader 
            title={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Competency Category'})}
            subheader={
              props.formikBag.submitCount > 0 &&
              typeof props.formikBag.errors.categories === 'string' &&
              props.formikBag.errors.categories
            }
            subheaderTypographyProps={{
              color: 'error',
              variant: 'body1'
            }}
          />
          <List>            
            {
              props.formikBag.values.categories.length > 0 &&
              props.formikBag.values.categories.map((item, index) =>
                <React.Fragment key={index}>
                  <Divider />
                  <ListItem
                    button
                    selected={index === active && isExpanded}
                    onClick={() => handleToggle(index)}
                  >
                    <ListItemText
                      primary={`Category ${index + 1} - ${item.name}`}
                    />
                    <ListItemSecondaryAction>
                      {active === index && isExpanded ? <ExpandLess /> : <ExpandMore />}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Collapse
                    className={props.classes.marginFar}
                    in={active === index && isExpanded}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Field 
                      name={`categories.${index}.name`}
                      render={({field, form}: FieldProps<IClusterFormValue>) => {
                        const error = getIn(form.errors, `categories.${index}.name`);
                        const touch = getIn(form.touched, `categories.${index}.name`);
    
                        return (
                          <TextField
                            {...field}
                            fullWidth
                            required
                            disabled={form.isSubmitting}
                            margin="normal"
                            autoComplete="off"
                            label={props.intl.formatMessage(hrMessage.competency.field.name)}
                            placeholder={props.intl.formatMessage(hrMessage.competency.field.namePlaceholder)}
                            helperText={error && touch}
                            error={touch && Boolean(error)}
                          />
                        );
                      }}
                    />
    
                    <Field 
                      name={`categories.${index}.description`}
                      render={({field, form}: FieldProps<IClusterFormValue>) => {
                        const error = getIn(form.errors, `categories.${index}.description`);
                        const touch = getIn(form.touched, `categories.${index}.description`);
    
                        return (
                          <TextField
                            {...field}
                            fullWidth
                            required
                            multiline
                            disabled={form.isSubmitting}
                            margin="normal"
                            autoComplete="off"
                            label={props.intl.formatMessage(hrMessage.competency.field.description)}
                            placeholder={props.intl.formatMessage(hrMessage.competency.field.descriptionPlaceholder)}
                            helperText={error && touch}
                            error={touch && Boolean(error)}
                          />
                        );
                      }}
                    />
                    <CardActions>
                      <Button
                        fullWidth
                        color="secondary" 
                        disabled={props.formikBag.isSubmitting}
                        onClick={() => {
                          fields.remove(index);
                          handleToggle(undefined);
                        }}
                      >
                        <DeleteForever className={props.classes.marginFarRight} />
                        {props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Category'})}
                      </Button>
                    </CardActions>
                  </Collapse>
                  {/* <Card square>
                    <CardHeader 
                      title={`#${index + 1} - Category`}
                      titleTypographyProps={{variant: 'body2'}}
                      action={
                        <IconButton disabled={Boolean(item.uid)} onClick={() => fields.remove(index)}>
                          <DeleteForever />
                        </IconButton>
                      }
                    />
                    <CardContent>
                      
                    </CardContent>
                  </Card> */}
                </React.Fragment>
              )
            }
          </List>
        </Card>
  
        <div className={props.classes.flexContent}>
          <Card square>
            {/* <CardHeader 
              title={props.intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Category'})}
              subheader={
                props.formikBag.submitCount > 0 &&
                typeof props.formikBag.errors.categories === 'string' &&
                props.formikBag.errors.categories
              }
              subheaderTypographyProps={{
                color: 'error',
                variant: 'body1'
              }}
            /> */}
            <CardActions>
              <Button
                fullWidth
                color="primary"
                disabled={props.formikBag.isSubmitting}
                onClick={() => {
                  fields.push({
                    name: '',
                    description: ''
                  });
                  handleToggle(props.formikBag.values.categories.length);
                }}
              >
                <PlaylistAdd className={props.classes.marginFarRight} />
                {props.intl.formatMessage(layoutMessage.action.add)}
              </Button>
            </CardActions>
          </Card>
        </div>
      </React.Fragment>
    )}
  />
  );

  return render;
};

export const HrCategoryItem = compose<AllProps, IOwnOption>(
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters)
)(hrCategoryItem);