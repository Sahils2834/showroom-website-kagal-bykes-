import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
const resources = {
  en: {
    translation: {
      "nav": {
        "home": "Home",
        "bikes": "Bikes",
        "accessories": "Accessories",
        "compare": "Compare",
        "explore": "Explore",
        "services": "Services",
        "finance": "Finance",
        "login": "Login",
        "logout": "Logout",
        "language": "Language"
      },
      "hero": {
        "explore_bike": "Explore Bike",
        "book_test_ride": "Book Test Ride",
        "scroll": "Scroll"
      },
      "common": {
        "view_all": "View All",
        "view_offers": "View Offers",
        "exclusive_deal": "Exclusive Deal"
      }
    }
  },
  hi: {
    translation: {
      "nav": {
        "home": "होम",
        "bikes": "बाइक्स",
        "accessories": "एक्सेसरीज",
        "compare": "तुलना करें",
        "explore": "एक्सप्लोर",
        "services": "सेवाएं",
        "finance": "फाइनेंस",
        "login": "लॉग इन",
        "logout": "लॉग आउट",
        "language": "भाषा"
      },
      "hero": {
        "explore_bike": "बाइक एक्सप्लोर करें",
        "book_test_ride": "टेस्ट राइड बुक करें",
        "scroll": "स्क्रॉल करें"
      },
      "common": {
        "view_all": "सभी देखें",
        "view_offers": "ऑफ़र देखें",
        "exclusive_deal": "विशेष डील"
      }
    }
  },
  mr: {
    translation: {
      "nav": {
        "home": "मुख्यपृष्ठ",
        "bikes": "बाइक्स",
        "accessories": "अॅक्सेसरीज",
        "compare": "तुलना करा",
        "explore": "अन्वेषण करा",
        "services": "सेवा",
        "finance": "वित्त",
        "login": "लॉग इन",
        "logout": "लॉग आउट",
        "language": "भाषा"
      },
      "hero": {
        "explore_bike": "बाइक एक्सप्लोर करा",
        "book_test_ride": "टेस्ट राइड बुक करा",
        "scroll": "स्क्रोल करा"
      },
      "common": {
        "view_all": "सर्व पहा",
        "view_offers": "ऑफर पहा",
        "exclusive_deal": "विशेष डील"
      }
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
