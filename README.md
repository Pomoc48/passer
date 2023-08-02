# Passer

Free, open-source and self-hosted password manager.

Passer is a [React](https://react.dev/) website with the design inspired by the [Material Design](https://m3.material.io/), and a backend fully managed by [Firebase](https://firebase.google.com/), that can be comfortably hosted with a free account.

## Security

Every password with its site data is serialized and client-side encrypted before being stored in the database, using the [SubtleCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto) interface with the AES-GCM algorithm.

The [CryptoKey](https://developer.mozilla.org/en-US/docs/Web/API/CryptoKey) used for encryption and decryption is generated using a salted hash from the user's password and e-mail, that never leaves your device.

Authentication with its state persistance is entirely done through Firebase, but in order to decrypt the downloaded data, the generated hash is later stored locally to create the key.
As the hash is not used for the Firebase account creation, it is not possible to get into someone else's account, if the locally stored hash was compromised.

```mermaid
---
title: The login process
---
flowchart TD
	A{"Key token
		found in local
		storage?"}
	A -->|No| B[/"Get login credentials
		from the user"/]
	A -->|Yes| C{"Currently
		signed in
		user found?"}
	C -->|No| B
	C -->|Yes| J["Create a key
		using the data
		from local storage"]
	J --> K{"Can the data
		be decrypted?"}
	K -->|No| L["Remove the token
		from local storage"]
	L --> B
	K -->|Yes| H
	B --> E{"Sign in
		with Firebase
		successful?"}
	
	E -->|Yes| F["Generate a token
		and save it locally"]
	E -->|No| G["Show a notification
		with the error message"]
	G --> B
	F --> M["Create a key
		using the token"]
	M --> H(["Decrypt the
		downloaded data"])
```

## License

This project is licensed under the GNU General Public License.
\
Please see the [license file](LICENSE) for more information.
