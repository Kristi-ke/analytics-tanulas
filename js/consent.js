function initConsentBanner() {

  const banner = document.getElementById('cookie-consent-banner');

  const btnAcceptAll = document.getElementById('btn-accept-all');
  const btnAcceptSome = document.getElementById('btn-accept-some');
  const btnRejectAll = document.getElementById('btn-reject-all');

  const analyticsCheckbox =
    document.getElementById('consent-analytics');

  const preferencesCheckbox =
    document.getElementById('consent-preferences');

  const marketingCheckbox =
    document.getElementById('consent-marketing');


  if (!banner) {
    console.error('Consent banner nem található.');
    return;
  }


  function hideBanner() {
    banner.style.display = 'none';
  }


  function setConsent(consent) {

    const consentMode = {

      // szükséges működés
      functionality_storage: 'granted',
      security_storage: 'granted',

      // analytics
      analytics_storage:
        consent.analytics ? 'granted' : 'denied',

      // marketing
      ad_storage:
        consent.marketing ? 'granted' : 'denied',

      ad_user_data:
        consent.marketing ? 'granted' : 'denied',

      ad_personalization:
        consent.marketing ? 'granted' : 'denied',

      // preferenciák
      personalization_storage:
        consent.preferences ? 'granted' : 'denied'
    };


    /*
     * Consent Mode frissítése
     */
    if (typeof window.gtag === 'function') {

      window.gtag(
        'consent',
        'update',
        consentMode
      );

      console.log(
        'Consent Mode frissítve:',
        consentMode
      );

    } else {

      console.error(
        'gtag() nem érhető el.'
      );
    }


    /*
     * Consent mentése következő oldalbetöltéshez
     */
    localStorage.setItem(
      'consentMode',
      JSON.stringify(consentMode)
    );


    /*
     * Banner elrejtése
     */
    hideBanner();
  }



  /*
   * Ha már van elmentett consent,
   * nem kérdezzük meg újra.
   */
  const savedConsent =
    localStorage.getItem('consentMode');

  if (savedConsent) {

    hideBanner();

    return;
  }



  /*
   * ÖSSZES ELFOGADÁSA
   */
  btnAcceptAll.addEventListener(
    'click',
    function () {

      setConsent({
        analytics: true,
        preferences: true,
        marketing: true
      });

    }
  );



  /*
   * KIVÁLASZTOTTAK ELFOGADÁSA
   */
  btnAcceptSome.addEventListener(
    'click',
    function () {

      setConsent({

        analytics:
          analyticsCheckbox.checked,

        preferences:
          preferencesCheckbox.checked,

        marketing:
          marketingCheckbox.checked

      });

    }
  );



  /*
   * ÖSSZES ELUTASÍTÁSA
   */
  btnRejectAll.addEventListener(
    'click',
    function () {

      setConsent({
        analytics: false,
        preferences: false,
        marketing: false
      });

    }
  );

}
