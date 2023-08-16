# Passer

Free, open-source and self-hosted password manager.

Passer is a [React](https://react.dev/) website with the design inspired by the [Material Design](https://m3.material.io/), and a backend fully managed by [Firebase](https://firebase.google.com/), that can be comfortably hosted with a free account.

## Security

Every password with its site data is serialized and client-side encrypted before being stored in the database, using the [SubtleCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto) interface with the AES-GCM algorithm.

The [CryptoKey](https://developer.mozilla.org/en-US/docs/Web/API/CryptoKey) used for encryption and decryption is generated using a salted hash from the user's password and e-mail, that never leaves your device.

Authentication with its state persistance is entirely done through Firebase, but in order to decrypt the downloaded data, the generated hash is later stored locally to create the key.
As the hash is not used for the Firebase account creation, it is not possible to get into someone else's account, if the locally stored hash was compromised.

## Firebase setup

You can easily create your own free Firebase project and use it with Passer to ensure that no one can modify or delete your encrypted data with the following steps:

1. [Create a new Firebase project](https://console.firebase.google.com/?authuser=0)

1. [Create a new Firestore Database](https://console.firebase.google.com/project/_/firestore?authuser=0) and update the [Security Rules](https://console.firebase.google.com/project/_/firestore/rules?authuser=0) with the following:

	```js
	rules_version = '2';

	service cloud.firestore {
	  match /databases/{database}/documents {

	    function isUserValid(uid) {
	      let authenticated = request.auth != null && request.auth.uid == uid;
	      let verified = request.auth.token.email_verified;

	      return authenticated && verified;
	    }

	    match /users/{uid} {
	      match /websites/{pass} {
	        allow read, write: if isUserValid(uid);
	      }
	    }
	  }
	}
	```

1. [Enable Authentication](https://console.firebase.google.com/project/_/authentication?authuser=0) and add the Email/Password sign-in provider

Copy the `Project ID` and the `Web API key` from your [project settings](https://console.firebase.google.com/project/_/settings/general?authuser=0) and paste them into the Passer configuration dialog.
The page should now be displaying a message about your custom instance.

## Self-hosting

In order to self-host the app, update environment variables in the [.env](.env) file with your values from the [previous section](#firebase-setup).

With this done, you can create and run a docker container:

```console
docker build -t passer:latest .
docker run -p 3000:3000 passer:latest
```

Or just use npm to build or run the app:

```console
npm run build
npm start
```

## License

This project is licensed under the GNU General Public License.
\
Please see the [license file](LICENSE) for more information.
