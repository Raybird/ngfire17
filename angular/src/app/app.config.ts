import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck } from '@angular/fire/app-check';
import { connectFirestoreEmulator, enableMultiTabIndexedDbPersistence, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { connectFunctionsEmulator, getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { connectStorageEmulator, getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { environment } from '../environments/environment';

const firebase = environment.firbaseConfig;

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom([
      provideFirebaseApp(() =>
        initializeApp(firebase)
      ),
      provideAuth(() => {
        const auth = getAuth();
        if (environment.useEmulators) {
          connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
        }
        return auth;
      }),
      provideAnalytics(() => getAnalytics()),
      provideFirestore(() => {
        const firestore = getFirestore();
        if (environment.useEmulators) {
            connectFirestoreEmulator(firestore, 'localhost', 8080);
        }
        return firestore;
      }),
      provideFunctions(() => {
        const functions = getFunctions();
        if (environment.useEmulators) {
            connectFunctionsEmulator(functions, 'localhost', 5001);
        }
        return functions;
      }),
      provideStorage(() => {
        const storage = getStorage();
        if (environment.useEmulators) {
            connectStorageEmulator(storage, 'localhost', 9199);
        }
        return storage;
      }),
      provideRemoteConfig(() => getRemoteConfig())
    ]),
    // importProvidersFrom(provideAuth(() => getAuth())),
    // importProvidersFrom(provideAnalytics(() => getAnalytics())), ScreenTrackingService, UserTrackingService,
    // importProvidersFrom(provideAppCheck(() => {
    //   // TODO get a reCAPTCHA Enterprise here https://console.cloud.google.com/security/recaptcha?project=_
    //   const provider = new ReCaptchaEnterpriseProvider('');
    //   return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
    // })),
    // importProvidersFrom(provideFunctions(() => getFunctions())),
    // importProvidersFrom(provideMessaging(() => getMessaging())),
    // importProvidersFrom(providePerformance(() => getPerformance())),
    // importProvidersFrom(provideStorage(() => getStorage())),
    // importProvidersFrom(provideRemoteConfig(() => getRemoteConfig()))
  ]
};
function resolvePersistenceEnabled(arg0: boolean): any {
  throw new Error('Function not implemented.');
}

