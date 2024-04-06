import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { derived, writable, type Readable } from 'svelte/store';

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

function userStore() {
	let unsubscribe: () => void;

	if (!auth || !globalThis.window) {
		console.warn('Auth is not initialized or not in browser.');

		const { subscribe } = writable<User | null>(null);
		return { subscribe };
	}

	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return { subscribe };
}

export const user = userStore();

export function docStore<T>(path: string) {
	let unsubscribe: () => void;
	const docRef = doc(db, path);

	const { subscribe } = writable<T | null>(null, (set) => {
		unsubscribe = onSnapshot(docRef, (snapshot) => {
			set((snapshot.data() as T) ?? null);
		});

		return () => unsubscribe();
	});

	return {
		subscribe,
		ref: docRef,
		id: docRef.id
	};
}

interface UserData {
	username: string;
	bio: string;
	photoURL: string;
	links: any[];
}

export const userData: Readable<UserData | null> = derived(user, ($user, set) => {
	if ($user) {
		return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
	} else {
		set(null);
	}
});
