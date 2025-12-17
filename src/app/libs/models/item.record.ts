export interface Item {
	id: number;
	title: string;
	description: string;
	price: number | null;
	images: string[];
	createdAt: string;
	updatedAt: string;

	ownerId: string;
	category: string;
	size: string;
	condition: string;
	brand: string;
	color: string;
}
