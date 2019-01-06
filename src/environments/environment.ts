// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://api.kz-api.test',
  s3UrlBase: 'https://s3.amazonaws.com/kz-kendozone-v2',
  sentryDns: '',
  fbAppId: '797477373695958',
  googleAppId: '636695559094-i4qkfanfl406fuh2cikn89km0ljsq30b.apps.googleusercontent.com'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
import 'zone.js/dist/zone-error'; // Included with Angular CLI.
