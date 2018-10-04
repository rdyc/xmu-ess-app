import Enlang from './entries/en-US';
import { addLocaleData } from 'react-intl';

const AppLocale = {
  en: Enlang
};

addLocaleData(AppLocale.en.data);

export default AppLocale;