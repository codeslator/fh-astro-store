import { db, Role, User } from 'astro:db';
import { v4 as UUID } from 'uuid';
import bcrypt from 'bcryptjs';

// https://astro.build/db/seed
export default async function seed() {
	

	const roles = [
		{ id: 'admin', name: 'Admin' },
		{ id: 'user', name: 'User' },
	];

	const johnDoe = {
		id: UUID(),
		name: 'John Doe',
		email: 'john.doe@example.com',
		password: bcrypt.hashSync('123456'),
		role: 'admin',
		createdAt: new Date(),
	}

	const janeDoe = {
		id: UUID(),
		name: 'Jane Doe',
		email: 'jane.doe@example.com',
		password: bcrypt.hashSync('123456'),
		role: 'user',
		createdAt: new Date(),
	}

	await db.insert(Role).values(roles);
	await db.insert(User).values([johnDoe, janeDoe]);
}
