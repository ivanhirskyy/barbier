import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

export default defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig = {
    apiKey: 'AIzaSyBM4P0k0L51wgHLU9rhPtuT4aqEdYazfBA',
    authDomain: 'barbier-85807.firebaseapp.com',
    projectId: 'barbier-85807',
    storageBucket: 'barbier-85807.appspot.com',
    messagingSenderId: '658859567605',
    appId: '1:658859567605:web:3b429e9f69d8dd2c7f98bc',
    measurementId: 'G-KZLVNZDCY1',
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  nuxtApp.vueApp.provide('auth', auth);
  nuxtApp.provide('auth', auth);
  /* const analytics = getAnalytics(app); */
});
