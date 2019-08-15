import { FormMode } from '@generic/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { Card, CardHeader, Checkbox, Collapse, Divider, List, ListItem, ListItemSecondaryAction, ListItemText, withStyles, WithStyles } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import styles from '@styles';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { IMappedFormValue } from './HrCompetencyMappedForm';

interface IOwnProps {
  formikBag: FormikProps<IMappedFormValue>;
  intl: InjectedIntl;
  formMode: FormMode;
}

interface ChildList {
  uid: string;
  parentUid?: string;
}

interface IOwnState {
  active?: string;
  isExpanded: boolean;
  childList: ChildList[];
  firstHitEdit: boolean;
}

interface IOwnHandler {
  handleCheckChild: (uid: string, parentUid: string) => void;
}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
  handleToggle: (uid: string) => IOwnState;
  stateUpdate: StateHandler<IOwnState>;
}

type AllProps
  = IOwnProps
  & IOwnHandler
  & IOwnState
  & IOwnStateHandler
  & WithStyles<typeof styles>;

const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => ({
  active: undefined,
  isExpanded: false,
  childList: [],
  firstHitEdit: false
});

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleCheckChild: (props: AllProps) => (uid: string, parentUid: string) => {
    const { childList } = props;
    let findChild: number = 0;

    // find child on the list
    findChild = childList.findIndex(item => item.uid === uid);
    // if not found
    if (findChild === -1) {
      childList.push({uid, parentUid});
    } else {
      // if found
      childList.splice(childList.findIndex(item => item.uid === uid), 1);
    }
  }
};

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateHandler> = {
  handleToggle: (state: IOwnState) => (uid: string) => ({
    active: uid,
    isExpanded: state.active === uid ? !state.isExpanded : true
  }),
  stateUpdate: (prevState: IOwnState) => (newState: IOwnState) => ({
    ...prevState,
    ...newState
  })
};

const hrCompetencyMappedCategoriesForm: React.ComponentType<AllProps> = props => {
  const { active, isExpanded, formikBag} = props;

  const render = (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Categories'})}
      />
        {
          formikBag.values.categories.length > 0 && (
            <List>
              <FieldArray 
                name="categories"
                render={(fields: FieldArrayRenderProps) => 
                  formikBag.values.categories.map((parent, idxParent) => (
                    !parent.parentUid &&
                    (
                      <React.Fragment key ={idxParent}>
                        <Divider />
                        <ListItem
                          button
                          disableGutters
                          onClick={() => props.handleToggle(parent.uid)}
                          selected={parent.uid === active && isExpanded}
                        >
                          <Field 
                            name={`categories.${idxParent}.isAccess`}
                            className={props.classes.marginFarLeft}
                            render={({ field }: FieldProps<IMappedFormValue>) => (
                              <Checkbox 
                                {...field}
                                value={parent.uid}
                                checked={parent.isAccess}
                                disabled={props.formikBag.isSubmitting}
                                onChange={() => {
                                  // set check
                                  formikBag.setFieldValue(`categories.${idxParent}.isAccess`, !parent.isAccess);
                                  formikBag.values.categories.map((item, index) => {
                                    // check value for his child
                                    if (item.parentUid && item.parentUid === parent.uid) {
                                      // if parent is true and child is false, then make the child is true
                                      if (!parent.isAccess && !item.isAccess) {
                                        props.handleCheckChild(item.uid, parent.uid);
                                        formikBag.setFieldValue(`categories.${index}.isAccess`, true);
                                        // if parent is false and child is true, then make the child is false
                                      } else if (parent.isAccess && item.isAccess) {
                                        props.handleCheckChild(item.uid, parent.uid);
                                        formikBag.setFieldValue(`categories.${index}.isAccess`, false);
                                      }
                                    }
                                  });
                                }}
                                style={{
                                  height: 10,
                                  width: 10,
                                  marginRight: 5,
                                  marginLeft: 30,
                                }}
                              />
                            )}
                          />
                          <ListItemText primary={parent.name}/>
                          <ListItemSecondaryAction>
                            {active === parent.uid && isExpanded ? <ExpandLess /> : <ExpandMore />}
                          </ListItemSecondaryAction>
                        </ListItem>        
                        <Collapse
                          in={active === parent.uid && isExpanded}
                          timeout="auto"
                          unmountOnExit
                        >
                          {
                            formikBag.values.categories.map((child, idxChild) => 
                              child.parentUid === parent.uid &&
                                <ListItem
                                  key={idxChild}
                                  color="inherit"
                                  button
                                >
                                  <Field 
                                    name={`categories.${idxChild}.isAccess`}
                                    render={({ field }: FieldProps<IMappedFormValue>) => (
                                      <Checkbox 
                                        {...field}
                                        value={child.uid}
                                        checked={child.isAccess}
                                        disabled={props.formikBag.isSubmitting} 
                                        onChange={() => {
                                          props.handleCheckChild(child.uid, parent.uid);
                                          formikBag.setFieldValue(`categories.${idxChild}.isAccess`, !child.isAccess);
                                          if (!child.isAccess && !parent.isAccess) {
                                            formikBag.setFieldValue(`categories.${idxParent}.isAccess`, true);
                                          }
                                          // to find the child of parent is still on the list or no
                                          const parentIsFound: number = props.childList.findIndex(item => item.parentUid === child.parentUid);
                                          // if no then uncheck it's parent
                                          if (parentIsFound === -1) {
                                            formikBag.setFieldValue(`categories.${idxParent}.isAccess`, !child.isAccess);
                                          }
                                        }}
                                        style={{
                                          height: 10,
                                          width: 10,
                                          marginLeft: 25,
                                          marginRight: 5
                                        }}
                                      />
                                    )}
                                  />
                                  <ListItemText primary={child.name}/>
                                </ListItem>
                            )
                          }
                        </Collapse>
                      </React.Fragment>
                    )
                  ))
                }
              />
              
            </List>
          )
        }        
    </Card>
  );

  return render;
};

const lifeCycleFunctions: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidUpdate(prevProps: AllProps) {
    const { formikBag: thisFormik, formMode, childList, stateUpdate, firstHitEdit } = this.props;
    const { formikBag: prevFormik } = prevProps;

    if (thisFormik.values.categories !== prevFormik.values.categories && !firstHitEdit) {
      if (formMode === FormMode.Edit) {
        thisFormik.values.categories.map(item => 
          item.isAccess &&
          item.parentUid &&
          childList.push({
            uid: item.uid,
            parentUid: item.parentUid
          })  
        );
        stateUpdate({
          childList,
          firstHitEdit: true
        });
      }
    }
  }
};

export const HrCompetencyMappedCategoriesForm = compose<AllProps, IOwnProps>(
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
)(hrCompetencyMappedCategoriesForm);