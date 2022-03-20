import { QuerySnapshot } from '@firebase/firestore-types';
import firebase from 'firebase/app';

import app from '../../../common/firebaseApp';

const db = firebase.firestore(app);

const GetFlatsList = (): Promise<QuerySnapshot> => db.collection('flats').get();

export default GetFlatsList;
