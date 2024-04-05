import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyA_3hH93KQvC-4CkDQrM-HKHpGamVoG5o4',
	authDomain: 'sveltekit-fireship-420.firebaseapp.com',
	projectId: 'sveltekit-fireship-420',
	storageBucket: 'sveltekit-fireship-420.appspot.com',
	messagingSenderId: '556361996726',
	appId: '1:556361996726:web:ac4547ba9aa85352908917',
	measurementId: 'G-0JM9PPL3D5'
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
