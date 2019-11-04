import { FormMode } from '@generic/types';
import { IHrCategoryItem, IHrCompetencyClusterList } from '@hr/classes/response';
import { WithHrCompetencyCluster, withHrCompetencyCluster } from '@hr/hoc/withHrCompetencyCluster';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { LoadingCircular } from '@layout/components/loading/LoadingCircular';
import { Card, CardHeader, Checkbox, Collapse, Divider, List, ListItem, ListItemSecondaryAction, ListItemText,  MenuItem, Select, withStyles, WithStyles } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import styles from '@styles';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { IMappedFormValue } from './HrCompetencyMappedForm';

interface IOwnProps {
  formikBag: FormikProps<IMappedFormValue>;
  intl: InjectedIntl;
  formMode: FormMode;
  isLoading: boolean;
}

interface ChildList {
  uid: string;
  parentUid?: string;
}

interface IOwnState {
  active?: string;
  isExpanded: boolean;
  activeCategory?: string;
  isExpandedCategory: boolean;
  childList: ChildList[];
  firstHitEdit: boolean;
}

interface IOwnHandler {
  handleCheckChild: (uid?: string, parentUid?: string) => void;
}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
  handleToggle: (uid?: string) => IOwnState;
  handleToggleCategory: (uid?: string) => IOwnState;
  stateUpdate: StateHandler<IOwnState>;
}

type AllProps
  = IOwnProps
  & IOwnHandler
  & IOwnState
  & IOwnStateHandler
  & WithHrCompetencyCluster
  & WithStyles<typeof styles>;

const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => ({
  active: undefined,
  isExpanded: false,
  activeCategory: undefined,
  isExpandedCategory: false,
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
  handleToggleCategory: (state: IOwnState) => (uid: string) => ({
    activeCategory: uid,
    isExpandedCategory: state.activeCategory === uid ? !state.isExpandedCategory : true
  }),
  stateUpdate: (prevState: IOwnState) => (newState: IOwnState) => ({
    ...prevState,
    ...newState
  })
};

const hrCompetencyMappedCategoriesForm: React.ComponentType<AllProps> = props => {
  const { active, isExpanded, formikBag, activeCategory, isExpandedCategory } = props;
  const { response } = props.hrCompetencyClusterState.list;

  const handleLevel = (clusterUid?: string, categoryUid?: string) => {
    if (response && response.data) {
      const cluster: IHrCompetencyClusterList | undefined = response.data.find(data => data.uid === clusterUid);
      if (cluster) {
        const category: IHrCategoryItem | undefined = cluster.categories.find(cat => cat.uid === categoryUid);
        if (category) {
          return category.levels;
        }
      }
    }
    return [];
  };

  // const handleCategoryError = (index: number) => {
  //   if (formikBag.errors && formikBag.errors.categories) {
  //     const category: any[] = [];
  //     formikBag.errors.categories.map(item => 
  //       item !== undefined &&
  //       category.push(item)
  //     );

  //     if (category.length > 0) {
  //       // console.log(category);
  //       category.map(item => {
  //         if (item.mappedLevel) {
  //           const findNotNull: any = item.mappedLevel.find((mp: any) => mp !== undefined);
  //           // console.log(findNotNull);
  //           const splitFoundData: any = findNotNull.categoryLevelUid.split('.');
  //           if (splitFoundData.length > 0 && splitFoundData[0] === `categories[${index}]`) {
  //             // console.log(splitFoundData);
  //             return true;
  //           }
  //         }
  //         return false;
  //       });
  //     }
  //   }

  //   return false;
  // };

  const render = (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Categories'})}
      />
        {
          props.isLoading &&
          <LoadingCircular />          
        }
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
                          onClick={() => {
                            props.handleToggle(parent.uid);
                            props.handleToggleCategory('');
                            formikBag.setFieldValue('activeCluster', parent.uid);
                            formikBag.setFieldValue('activeCategory', undefined);
                          }}
                          selected={parent.uid === active && isExpanded}
                        >
                          {/* cluster */}
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
                          {/* CATEGORIES */}
                          {
                            formikBag.values.categories.map((child, idxChild) => 
                              child.parentUid === parent.uid &&
                                <React.Fragment key={idxChild}>
                                  <ListItem
                                    button
                                    onClick={() => {
                                      props.handleToggleCategory(child.uid);
                                      formikBag.setFieldValue('activeCategory', child.uid);
                                    }}
                                    selected={child.uid === activeCategory && isExpandedCategory}
                                    key={idxChild}
                                    color="inherit"
                                    style={{marginLeft: '54px'}}
                                  >
                                    <ListItemText 
                                      primary={child.name} 
                                      // className={handleCategoryError(idxChild) ? props.classes.textError : ''}
                                      primaryTypographyProps={{
                                        noWrap: true,
                                        color: 'inherit'
                                      }} 
                                    />
                                    <ListItemSecondaryAction>
                                      {activeCategory === child.uid && isExpandedCategory ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemSecondaryAction>
                                  </ListItem>
                                  <Collapse
                                    in={activeCategory === child.uid && isExpandedCategory}
                                    timeout="auto"
                                    unmountOnExit
                                    style={{padding: '10px 0'}}
                                  >
                                    {/* Mapped level */}
                                    <FieldArray
                                      name={`categories.${idxChild}.mappedLevel`}
                                      render={(fieldsIndicator: FieldArrayRenderProps) => (
                                        <React.Fragment>
                                          {
                                            props.formikBag.values.categories[idxChild].mappedLevel.length > 0 &&
                                            props.formikBag.values.categories[idxChild].mappedLevel.map((lv, lvIdx) =>
                                              <Field 
                                                key={lvIdx}
                                                name={`categories.${idxChild}.mappedLevel.${lvIdx}.categoryLevelUid`}
                                                render={({field, form}: FieldProps<IMappedFormValue>) => {

                                                  const error = getIn(form.errors, `${field.name}`);
                                                  const touch = getIn(form.touched, `${field.name}`);
                                                  return (
                                                    <ListItem
                                                      key={lvIdx}
                                                      style={{marginLeft: '70px'}}
                                                    >
                                                      <ListItemText 
                                                        className={error && touch ? props.classes.textError : ''}
                                                        primary={lv.employeeLevelName}
                                                      />
                                                      <ListItemSecondaryAction className={props.classes.mappedItem}>
                                                        <Select
                                                          {...field}
                                                          disabled={form.isSubmitting}
                                                        >
                                                          {
                                                            handleLevel(parent.uid, child.uid).length > 0 &&
                                                            handleLevel(parent.uid, child.uid).map((lvCat, idx) =>
                                                              <MenuItem
                                                                key={idx}
                                                                value={lvCat.uid}
                                                              >
                                                                {lvCat.level}
                                                              </MenuItem>
                                                            )
                                                          }
                                                        </Select>
                                                      </ListItemSecondaryAction>
                                                    </ListItem>
                                                  );
                                                }}
                                              />
                                            )
                                          }
                                        </React.Fragment>
                                      )}
                                    />
                                  </Collapse>
                                </React.Fragment>
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
            uid: item.uid || '',
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
  withHrCompetencyCluster,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
)(hrCompetencyMappedCategoriesForm);