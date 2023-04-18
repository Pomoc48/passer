import { DocumentReference, setDoc } from "firebase/firestore";
import { SiteData } from "../types/SiteData";
import { v4 as uuidv4 } from 'uuid';

export async function insertWebsite(reference: DocumentReference, website: SiteData) {
  await setDoc(reference, {
    passwords: {
      [uuidv4()]: {
        name: website.name,
        password: website.password,
        note: website.note,
        username: website.username,
        url: website.url,
      }
    },
  }, { merge: true });
}
