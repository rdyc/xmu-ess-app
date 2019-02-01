import { defineMessages } from 'react-intl';

const prefix = 'lookup.gallery';

// page
export const galleryPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title`},
  listSubHeader: { id: `${prefix}.page.list.subHeader`},
  detailTitle: { id: `${prefix}.page.detail.title`},
  detailSubHeader: { id: `${prefix}.page.detail.subHeader`},
  newTitle: { id: `${prefix}.page.new.title`},
  newSubHeader: { id: `${prefix}.page.new.subHeader`},
  modifyTitle: { id: `${prefix}.page.modify.title`},
  modifySubHeader: { id: `${prefix}.page.modify.subHeader`},
  modifyAnnouncementTitle: { id: `${prefix}.page.modifyAnnouncement.title`},
  modifyAnnouncementSubHeader: { id: `${prefix}.page.modifyAnnouncement.subHeader`},
});

// messages
export const galleryMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
  updateAnnouncementSuccess: { id: `${prefix}.message.updateAnnouncement.success` },
  updateAnnouncementFailure: { id: `${prefix}.message.updateAnnouncement.failure` },
});

// field
export const galleryField = defineMessages({
  file: { id: `${prefix}.field.file`},
  filePlaceholder: { id: `${prefix}.field.file.placeholder`},
  fileRequired: { id: `${prefix}.field.file.required`},
  
});

// action
export const galleryAction = defineMessages({
  moveUp : {id: `${prefix}.action.moveUp`},
  moveDown : {id: `${prefix}.action.moveDown`},
  remove : {id: `${prefix}.action.remove`},
});

// section
export const gallerySection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title`},
  infoSubHeader: { id: `${prefix}.section.info.subHeader`},
  submitTitle: { id: `${prefix}.section.submit.title`},
  submitSubHeader: { id: `${prefix}.section.submit.subHeader`},
  addTitle: { id: `${prefix}.section.add.title`},
  addSubHeader: { id: `${prefix}.section.add.subHeader`},
});

// helper
export const galleryFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'file': return galleryField.file;

      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'file': return galleryField.fileRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'file': return galleryField.filePlaceholder;

      default: return {id: field};
    }
  }

  return {id: field};
};
