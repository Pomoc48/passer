import { DocumentReference, setDoc } from "firebase/firestore";
import { SiteData } from "../types/SiteData";
import { v4 as uuidv4 } from 'uuid';

export async function insertWebsite(reference: DocumentReference, website: SiteData) {
  await setDoc(reference, {
    passwords: {
      [uuidv4()]: {
        name: website.name.iv+website.name.value,
        password: website.password.iv+website.password.value,
        note: website.note.iv+website.note.value,
        username: website.username.iv+website.username.value,
        url: website.url.iv+website.url.value,
      }
    },
  }, { merge: true });
}
