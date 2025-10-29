import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

const companiesCol = (uid: string) => collection(db, `users/${uid}/companies`);

export async function createCompany(uid: string, data: any) {
  const companyData = {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: uid,
  };
  return await addDoc(companiesCol(uid), companyData);
}

export async function listCompanies(uid: string) {
  const q = query(companiesCol(uid), orderBy('updatedAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt,
      updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toISOString() : data.updatedAt,
    };
  });
}
