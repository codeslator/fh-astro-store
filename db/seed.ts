import { db, Role, User, Product, ProductImage, desc } from 'astro:db';
import { v4 as UUID } from 'uuid';
import bcrypt from 'bcryptjs';
import { seedProducts } from './seed-data';

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

	const queries: any = [];

	seedProducts.forEach((p) => {
		const product = {
			id: UUID(),
			description: p.description,
			gender: p.gender,
			price: p.price,
			sizes: p.sizes.join(','),
			slug: p.slug,
			stock: p.stock,
			tags: p.tags.join(','),
			title: p.title,
			type: p.type,
			createdAt: new Date(),

			user: johnDoe.id,
		}

		queries.push(db.insert(Product).values(product));

		p.images.forEach((image) => {
			const productImage = {
				id: UUID(),
				image,
				createdAt: new Date(),

				productId: product.id,
			}

			queries.push(db.insert(ProductImage).values(productImage));
		})
	});

	await db.batch(queries);
}
