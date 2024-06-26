import { adminAuth } from '$lib/server/admin';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { idToken } = await request.json();

	const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

	const decodedIdToken = await adminAuth.verifyIdToken(idToken);
	console.log(decodedIdToken);

	try {
		const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
		const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: '/' };
		cookies.set('__session', cookie, options);
		return json({ status: 'signedIn' });
	} catch (e: any) {
		console.error(e);
		throw error(401, 'Recent sign in required!');
	}
};

export const DELETE: RequestHandler = async ({ cookies }) => {
	cookies.delete('__session', { path: '/' });
	return json({ status: 'signedOut' });
};
