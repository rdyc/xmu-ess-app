import { addLocaleData } from 'react-intl';

import Enlang from './entries/en-US';

const AppLocale = {
  en: Enlang
};

addLocaleData(AppLocale.en.data);

export default AppLocale;