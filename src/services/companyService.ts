import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

const companiesCol = (uid: string) => collection(db, `users/${uid}/companies`);

export async function createCompany(uid: string, data: any) {
  return await addDoc(companiesCol(uid), data);
}

export async function listCompanies(uid: string) {
  const q = query(companiesCol(uid), orderBy('updatedAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
