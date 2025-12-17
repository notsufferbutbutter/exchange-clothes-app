export interface User {
	id: string;

	username: string;
	email: string;

	createdAt: string;
	updatedAt: string | null;

	passwordHash: string | null;

	avatarUrl: string | null;
	bio: string | null;

	locationCity: string | null;
	locationCountry: string | null;
}
