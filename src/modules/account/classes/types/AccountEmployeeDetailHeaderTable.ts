export enum AccountEmployeeTrainingHeaderTable {
  no = 'No',
  name = 'Training Name',
  startDate = 'Start Date',
  endDate = 'End Date',
  organizer = 'Training Organizer',
  type = 'Training Type',
  certificationType = 'Certification Type',
  action = 'Action'
}

export enum AccountEmployeeHistoryHeaderTable {
  no = 'No',
  company = 'Company Name',
  businessUnit = 'Business Unit',
  department = 'Department',
  level = 'Level',
  position = 'Position',
  start = 'Start Date',
  end = 'End Date'
}

export enum AccountEmployeeEducationHeaderTable {
  no = 'No',
  degree = 'Education Degree',
  institute = 'Institute Name',
  major = 'Education Major',
  start = 'Start Year',
  finish = 'Finish Year',
  action = 'Action'
}

export enum AccountEmployeeFamilyHeaderTable {
  no = 'No',
  status = 'Family Status',
  name = 'Name',
  gender = 'Gender',
  birthPlace = 'Birth Place',
  birthDate = 'Birth Date',
  action = 'Action'
}

export enum AccountEmployeeExperienceHeaderTable {
  no = 'No',
  company = 'Company Name',
  position = 'Position Name',
  start = 'Start Year',
  finish = 'Finish year',
  action = 'Action'
}

export enum AccountEmployeeAccessHeaderTable {
  company = 'companyUid',
  bussiness = 'unitType',
  department = 'departmentType',
  level = 'levelType',
  role = 'roleUid',
  position = 'positionUid',
  start = 'start',
  end = 'end',
}

export enum AccountEmployeeRateHeaderTable {
  value = 'value',
  isActive = 'isActive',
  created = 'created',
}

export enum AccountEmployeeNoteHeaderTable {
  no = 'No',
  note = 'Note',
  created = 'Created',
  updated = 'Updated',
  action = 'Action'
}

export enum AccountEmployeeKPIHeaderTable {
  uid = 'ID',
  employeeUid = 'Employee',
  year = 'Year',
  period = 'Period'
}