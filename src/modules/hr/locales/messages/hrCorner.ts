import { defineMessages } from 'react-intl';

const prefix = 'hr.corner';

// field
export const hrCornerField = defineMessages({
  uid: { id: `${prefix}.field.uid`},
  uidPlaceholder: { id: `${prefix}.field.uid.placeholder`},
  uidRequired: { id: `${prefix}.field.uid.required`},
  
  name: { id: `${prefix}.field.name`},
  namePlaceholder: { id: `${prefix}.field.name.placeholder`},
  nameRequired: { id: `${prefix}.field.name.required`},

  category: { id: `${prefix}.field.category`},
  categoryPlaceholder: { id: `${prefix}.field.category.placeholder`},
  categoryRequired: { id: `${prefix}.field.category.required`},

  title: { id: `${prefix}.field.title`},
  titlePlaceholder: { id: `${prefix}.field.title.placeholder`},
  titleRequired: { id: `${prefix}.field.title.required`},

  slug: { id: `${prefix}.field.slug`},
  slugPlaceholder: { id: `${prefix}.field.slug.placeholder`},
  slugRequired: { id: `${prefix}.field.slug.required`},

  headline: { id: `${prefix}.field.headline`},
  headlinePlaceholder: { id: `${prefix}.field.headline.placeholder`},
  headlineRequired: { id: `${prefix}.field.headline.required`},

  content: { id: `${prefix}.field.content`},
  contentPlaceholder: { id: `${prefix}.field.content.placeholder`},
  contentRequired: { id: `${prefix}.field.content.required`},

  description: { id: `${prefix}.field.description`},
  descriptionRequired: { id: `${prefix}.field.description.required`},
  descriptionPlaceholder: { id: `${prefix}.field.description.placeholder`},

  start: { id: `${prefix}.field.start`},
  startRequired: { id: `${prefix}.field.start.required`},
  startPlaceholder: { id: `${prefix}.field.start.placeholder`},

  end: { id: `${prefix}.field.end`},
  endRequired: { id: `${prefix}.field.end.required`},
  endPlaceholder: { id: `${prefix}.field.end.placeholder`},

  type: { id: `${prefix}.field.type`},
  select: { id: `${prefix}.field.select`},

  parentTitle: { id: `${prefix}.field.parent.title`},
});

// helper
export const hrCornerFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return hrCornerField.uid;
      case 'name': return hrCornerField.name;
      case 'category': return hrCornerField.category;
      case 'title': return hrCornerField.title;
      case 'slug': return hrCornerField.slug;
      case 'content': return hrCornerField.content;
      case 'headline': return hrCornerField.headline;
      case 'description': return hrCornerField.description;
      case 'start': return hrCornerField.start;
      case 'end': return hrCornerField.end;

      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'name': return hrCornerField.nameRequired;
      case 'category': return hrCornerField.categoryRequired;
      case 'title': return hrCornerField.titleRequired;
      case 'slug': return hrCornerField.slugRequired;
      case 'content': return hrCornerField.contentRequired;
      case 'headline': return hrCornerField.headlineRequired;
      case 'description': return hrCornerField.descriptionRequired;
      case 'start': return hrCornerField.startRequired;
      case 'end': return hrCornerField.endRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return hrCornerField.uidPlaceholder;
      case 'name': return hrCornerField.namePlaceholder;
      case 'category': return hrCornerField.categoryPlaceholder;
      case 'title': return hrCornerField.titlePlaceholder;
      case 'slug': return hrCornerField.slugPlaceholder;
      case 'content': return hrCornerField.contentPlaceholder;
      case 'headline': return hrCornerField.headlinePlaceholder;
      case 'description': return hrCornerField.descriptionPlaceholder;
      case 'start': return hrCornerField.startPlaceholder;
      case 'end': return hrCornerField.endPlaceholder;

      default: return {id: field};
    }
  }

  return {id: field};
};