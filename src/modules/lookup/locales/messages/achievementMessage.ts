import { defineMessages } from 'react-intl';

const prefix = 'lookup.achievement';

// page
export const achievementPage = defineMessages({
  newTitle: { id: `${prefix}.page.new.title`},
  newSubHeader: { id: `${prefix}.page.new.subHeader`},
});

// messages
export const achievementMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
});

// field
export const achievementField = defineMessages({
  file: { id: `${prefix}.field.file`}
});

// section
export const achievementSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title`},
  infoSubHeader: { id: `${prefix}.section.info.subHeader`},
});