// import AppMenu from '@constants/AppMenu';
// import { IHrCompetencyCluster } from '@hr/classes/response';
import { IHrCompetencyPart } from '@hr/classes/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
// import { CollectionPage } from '@layout/components/pages';
// import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardActions, CardContent, CardHeader, Tooltip } from '@material-ui/core';
import { AddCircle, Info } from '@material-ui/icons';
import * as React from 'react';
import { HrCompetencyCategoryOption } from '../options/HrCompetencyCategoryOption';
import { HrCompetencyClusterOption } from '../options/HrCompetencyClusterOption';
import { HrCompetencyLevelOption } from '../options/HrCompetencyLevelOption';
import { HrCompetencyListProps } from './HrCompetencyList';
// import { HrCompetencyIndicatorOption } from '../options/HrCompetencyIndicatorOption';

export const HrCompetencyListView: React.SFC<HrCompetencyListProps> = props => (
  <React.Fragment>
    <div className={props.classes.flexRow}>
      <div className={props.classes.flexColumn}>
        <div className={props.classes.flexContent}>
          <Card square>
            <CardHeader title={'Competency List'} />
            <CardContent>
              <HrCompetencyClusterOption >
                <SelectField
                  isSearchable
                  menuPlacement="auto"
                  menuPosition="fixed"
                  valueString={props.clusterUid}
                  isClearable={props.clusterUid !== ''}
                  escapeClearsValue={true}
                  textFieldProps={{
                    label: props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Cluster'})
                  }}
                  onChange={(selected: ISelectFieldOption) => {
                    props.handleChangeUid(IHrCompetencyPart.Cluster, selected && selected.value || '');
                    props.handleChangeUid(IHrCompetencyPart.Category, '');
                    props.handleChangeUid(IHrCompetencyPart.Level, '');
                  }}
                />
              </HrCompetencyClusterOption>

              <HrCompetencyCategoryOption clusterUid={props.clusterUid} >
                <SelectField
                  isSearchable
                  menuPlacement="auto"
                  menuPosition="fixed"
                  isDisabled={props.clusterUid === ''}
                  valueString={props.categoryUid}
                  isClearable={props.categoryUid !== ''}
                  escapeClearsValue={true}
                  textFieldProps={{
                    label: props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Category'})
                  }}
                  onChange={(selected: ISelectFieldOption) => {
                    props.handleChangeUid(IHrCompetencyPart.Category, selected && selected.value || '');
                    props.handleChangeUid(IHrCompetencyPart.Level, '');
                  }}
                />
              </HrCompetencyCategoryOption>

              <HrCompetencyLevelOption clusterUid={props.clusterUid} categoryUid={props.categoryUid} >
                <SelectField
                  isSearchable
                  menuPlacement="auto"
                  menuPosition="fixed"
                  isDisabled={props.categoryUid === ''}
                  valueString={props.levelUid}
                  isClearable={props.levelUid !== ''}
                  escapeClearsValue={true}
                  textFieldProps={{
                    label: props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Level'})
                  }}
                  onChange={(selected: ISelectFieldOption) => {
                    props.handleChangeUid(IHrCompetencyPart.Level, selected && selected.value || '');
                  }}
                />
              </HrCompetencyLevelOption>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className={props.classes.flexColumn}>
        <div className={props.classes.flexContent}>
          <Card square>
            <CardHeader title={'Cluster'}/>
            <CardActions>
              <Button fullWidth>List</Button>
              <Button fullWidth onClick={() => props.history.push('/lookup/competencycluster/cluster/form')}> <AddCircle color="primary" /> </Button>
            </CardActions>
          </Card>
        </div>
        <div className={props.classes.flexContent}>
          <Card square>
            <CardHeader title={'Category'}/>
            <CardActions>
              <Button fullWidth>List</Button>
              <Button fullWidth onClick={() => props.history.push('/lookup/competencycluster/category/form')}> <AddCircle color="primary" /> </Button>
            </CardActions>
          </Card>
        </div>
        <div className={props.classes.flexContent}>
          <Card square>
            <CardHeader title={'Level'}/>
            <CardActions>
              {
                !props.categoryUid &&
                <Tooltip title="Category is required">
                  <Button fullWidth>
                    <Info color="secondary"/>
                  </Button>
                </Tooltip>
              }
              {
                props.categoryUid &&
                (
                  <React.Fragment>
                    <Button fullWidth>List</Button>
                    <Button fullWidth onClick={() => props.history.push('/lookup/competencycluster/level/form')}> <AddCircle color="primary" /> </Button>
                  </React.Fragment>
                )
              }
            </CardActions>
          </Card>
        </div>
        <div className={props.classes.flexContent}>
          <Card square>
            <CardHeader title={'Indicator'}/>
            <CardActions>
              {
                !props.levelUid &&
                <Tooltip title="Level is required">
                  <Button fullWidth>
                    <Info color="secondary"/>
                  </Button>
                </Tooltip>
              }
              {
                props.levelUid &&
                (
                  <React.Fragment>
                    <Button fullWidth>List</Button>
                    <Button fullWidth onClick={() => props.history.push('/lookup/competencycluster/indicator/form')}> <AddCircle color="primary" /> </Button>
                  </React.Fragment>
                )
              }
            </CardActions>
          </Card>
        </div>
      </div>

      <div className={props.classes.flexColumn}>
        <div className={props.classes.flexContent}>
          <Card square>
            <CardHeader title={'Mapped'}/>
            <CardActions>
              <Button fullWidth>List</Button>
              <Button fullWidth onClick={() => props.history.push('/lookup/competencycluster/mapped/form')}> <AddCircle color="primary" /> </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
    
    {/* <Grid container spacing={8}>
      <Grid item xs={3}>
        <Card square>
          <CardContent>
            <HrCompetencyClusterOption >
              <SelectField
                isSearchable
                menuPlacement="auto"
                menuPosition="fixed"
                valueString={props.clusterUid}
                isClearable={props.clusterUid !== ''}
                escapeClearsValue={true}
                textFieldProps={{
                  label: props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Cluster'})
                }}
                onChange={(selected: ISelectFieldOption) => {
                  props.handleChangeUid(IHrCompetencyPart.Cluster, selected && selected.value || '');
                  props.handleChangeUid(IHrCompetencyPart.Category, '');
                  props.handleChangeUid(IHrCompetencyPart.Level, '');
                }}
              />
            </HrCompetencyClusterOption>
          </CardContent>
          <CardActions>
            <Button fullWidth>List</Button>
            <Button fullWidth> <AddCircle color="primary" /> </Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={3}>
        <Card square>
          <CardContent>
            <HrCompetencyCategoryOption clusterUid={props.clusterUid} >
              <SelectField
                isSearchable
                menuPlacement="auto"
                menuPosition="fixed"
                isDisabled={props.clusterUid === ''}
                valueString={props.categoryUid}
                isClearable={props.categoryUid !== ''}
                escapeClearsValue={true}
                textFieldProps={{
                  label: props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Category'})
                }}
                onChange={(selected: ISelectFieldOption) => {
                  props.handleChangeUid(IHrCompetencyPart.Category, selected && selected.value || '');
                  props.handleChangeUid(IHrCompetencyPart.Level, '');
                }}
              />
            </HrCompetencyCategoryOption>
          </CardContent>
          <CardActions>
            {
              !props.clusterUid &&
              <Tooltip title="Cluster is required">
                <Button fullWidth>
                  <Info color="secondary"/>
                </Button>
              </Tooltip>
            }
            {
              props.clusterUid &&
              (
                <React.Fragment>
                  <Button fullWidth>List</Button>
                  <Button fullWidth> <AddCircle color="primary" /> </Button>
                </React.Fragment>
              )
            }
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={3}>
        <Card square>
          <CardContent>
            <HrCompetencyLevelOption clusterUid={props.clusterUid} categoryUid={props.categoryUid} >
              <SelectField
                isSearchable
                menuPlacement="auto"
                menuPosition="fixed"
                isDisabled={props.categoryUid === ''}
                valueString={props.levelUid}
                isClearable={props.levelUid !== ''}
                escapeClearsValue={true}
                textFieldProps={{
                  label: props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Level'})
                }}
                onChange={(selected: ISelectFieldOption) => {
                  props.handleChangeUid(IHrCompetencyPart.Level, selected && selected.value || '');
                }}
              />
            </HrCompetencyLevelOption>
          </CardContent>
          <CardActions>
            {
              !props.categoryUid &&
              <Tooltip title="Category is required">
                <Button fullWidth>
                  <Info color="secondary"/>
                </Button>
              </Tooltip>
            }
            {
              props.categoryUid &&
              (
                <React.Fragment>
                  <Button fullWidth>List</Button>
                  <Button fullWidth> <AddCircle color="primary" /> </Button>
                </React.Fragment>
              )
            }
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={3}>
        <Card square>
          <CardHeader title="Indicator"/>
          <CardActions>
            {
              !props.levelUid &&
              <Tooltip title="Level is required">
                <Button fullWidth>
                  <Info color="secondary"/>
                </Button>
              </Tooltip>
            }
            {
              props.levelUid &&
              (
                <React.Fragment>
                  <Button fullWidth>List</Button>
                  <Button fullWidth> <AddCircle color="primary" /> </Button>
                </React.Fragment>
              )
            }
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={3}>
        <Card square>
          <CardHeader title="Mapped"/>
          <CardActions>
            <Button fullWidth>List</Button>
            <Button fullWidth> <AddCircle color="primary" /> </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid> */}
    {/* <CollectionPage
      // page info
      info={{
        uid: AppMenu.LookupCompetency,
        parentUid: AppMenu.Lookup,
        parentUrl: '/lookup/competency',
        title: props.intl.formatMessage(hrMessage.shared.page.listTitle, { state: 'Competency'}),
        description: props.intl.formatMessage(hrMessage.shared.page.listSubHeader),
      }}

      // state & fields
      state={props.hrCompetencyClusterState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleLoadCluster}
      onBind={props.handleOnBindCluster}
      
      // row components
      summaryComponent={(item: IHrCompetencyCluster) => ( 
        <HrCompetencyClusterSummary data={item}/>
      )}
      actionComponent={(item: IHrCompetencyCluster) => (
        <React.Fragment>
          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/lookup/competency/cluster/form`, { uid: item.uid })}
          >
            {props.intl.formatMessage(layoutMessage.action.modify)}
          </IconButton>

          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/lookup/competency/cluster/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}
    /> */}
  </React.Fragment>
);