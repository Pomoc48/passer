# Passer

Free, open-source and self-hosted password manager.

Passer is a [React](https://react.dev/) website with the design inspired by the [Material Design](https://m3.material.io/), and a backend fully managed by [Firebase](https://firebase.google.com/), that can be comfortably hosted with a free account.

![Passer v1.3.0](/screenshots/manager-v1.3.0.png)

More screenshots available in the [screenshots directory](/screenshots/).

## Security

Every password with its site data is serialized and client-side encrypted before being stored in the database, using the [SubtleCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto) interface with the AES-GCM algorithm.

The [CryptoKey](https://developer.mozilla.org/en-US/docs/Web/API/CryptoKey) used for encryption and decryption is generated using a salted hash from the user's password and e-mail, that never leaves your device.

Authentication with its state persistance is entirely done through Firebase, but in order to decrypt the downloaded data, the generated hash is later stored locally to create the key.
As the hash is not used for the Firebase account creation, it is not possible to get into someone else's account, if the locally stored hash was compromised.

## Firebase setup

You can easily create your own free Firebase project and use it with Passer to ensure that no one can modify or delete your encrypted data with the following steps:

1. [Create a new Firebase project](https://console.firebase.google.com/?authuser=0).

1. [Create a new Firestore Database](https://console.firebase.google.com/project/_/firestore?authuser=0) and update the [Security Rules](https://console.firebase.google.com/project/_/firestore/rules?authuser=0) with the contents of the [security-rules file](security-rules).

1. [Enable Authentication](https://console.firebase.google.com/project/_/authentication?authuser=0) and add the Email/Password sign-in provider.

Copy the `Project ID` and the `Web API key` from your [project settings](https://console.firebase.google.com/project/_/settings/general?authuser=0) and paste them into the Passer configuration dialog.
The page should now be displaying a message about your custom instance.

## Self-hosting

Using [Docker](https://www.docker.com/):

```console
docker pull pomoc48/passer
docker run -p 3000:80 -d pomoc48/passer
```

Using NPM:

```console
npm run build
npm start
```

To finish configuring the app, see to the [previous section](#firebase-setup).

## License

This project is licensed under the GNU General Public License.
\
Please see the [license file](LICENSE) for more information.
