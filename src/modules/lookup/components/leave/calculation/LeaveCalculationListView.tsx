import { LoadingCircular } from '@layout/components/loading/LoadingCircular';
import { Paper } from '@material-ui/core';
import * as React from 'react';
import { LeaveCalculationListProps } from './LeaveCalculationList';
import { LeaveCalculationTableView } from './LeaveCalculationTableView';
import { LeaveFilter } from './LeaveFilter';
import { AccountEmployeeAllOption } from '@account/components/options/AccountAllEmployeeOption';
import { SelectField, ISelectFieldOption } from '@layout/components/fields/SelectField';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';

export const LeaveCalculationListView: React.SFC<LeaveCalculationListProps> = props => {
  const { isLoading, response } = props.leaveCalculationState.all;
  const {
    size,
    orderBy,
    page,
    direction,
    handleChangePage,
    handleChangeSize,
    handleGoToNext,
    handleGoToPrevious,
    handleChangeSort
  } = props;

  const render = (
    <React.Fragment>
      <LeaveFilter
        isOpen={props.isFilterOpen}
        isLoading={isLoading}
        onClickSync={props.handleOnLoadApi}
        initialProps={{
          year: props.year,
          companyUid: props.companyUid
        }}
        onClose={props.handleFilterVisibility}
        onApply={props.handleFilterApplied}
      />
      {/* <Card square>
        <CardContent>
          <LeaveCalculationFilterForm onYearSelected={handleChangeFilter} />
        </CardContent>
      </Card> */}
      <Paper square elevation={1}>
        <AccountEmployeeAllOption filter={props.filterEmployee}>
          <SelectField
            isSearchable
            isClearable={props.find !== ''}
            isDisabled={!props.companyUid}
            escapeClearsValue={true}
            menuPlacement="auto"
            menuPosition="fixed"
            // valueString={item.employeeUid}
            textFieldProps={{
              label: props.intl.formatMessage(
                lookupMessage.calculation.filter.employee
              ),
              placeholder: props.intl.formatMessage(
                lookupMessage.calculation.filter.employee
              ),
            }}
            // onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
            onChange={(selected: ISelectFieldOption) => {
              const value = (selected && selected.value) || '';

              if (value !== '') {
                if (
                  props.formikBag.values.responder[index].assessorType !==
                    AssessorType.Self &&
                  value !== props.formikBag.values.employeeUid
                ) {
                  props.formikBag.setFieldValue(field.name, value || '');
                  props.formikBag.setFieldValue(
                    `responder.${index}.employeeName`,
                    (selected && selected.label) || ''
                  );
                }
              } else {
                props.formikBag.setFieldValue(field.name, value);
              }
            }}
          />
        </AccountEmployeeAllOption>
        {isLoading && <LoadingCircular />}
        {!isLoading && response && (
          <LeaveCalculationTableView
            // year={year}
            page={page}
            size={size}
            orderBy={orderBy}
            direction={direction}
            metadata={response.metadata}
            data={response.data}
            handleChangePage={handleChangePage}
            handleChangeSize={handleChangeSize}
            handleChangeSort={handleChangeSort}
            handleGoToNext={handleGoToNext}
            handleGoToPrevious={handleGoToPrevious}
          />
        )}
      </Paper>
    </React.Fragment>
  );

  return render;
};
