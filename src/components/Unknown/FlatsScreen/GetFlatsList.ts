import { QuerySnapshot } from '@firebase/firestore-types';
import firebase from 'firebase/app';

import app from '../../../common/firebaseApp';

const db = firebase.firestore(app);

export const GetFlatsList = (): Promise<QuerySnapshot> =>
  db.collection('flats').orderBy('publishedAt').limitToLast(20).get();
export const GetFlatsListByCity = (city: string): Promise<QuerySnapshot> =>
  db
    .collection('flats')
    .where('cityName', '==', `${city}`)
    .orderBy('publishedAt')
    .limitToLast(20)
    .get();
