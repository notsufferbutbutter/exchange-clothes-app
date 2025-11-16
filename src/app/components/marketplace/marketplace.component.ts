import { Component, computed, effect, signal } from '@angular/core';
import { HlmAutocomplete } from '@spartan-ng/helm/autocomplete';
import { User } from 'src/app/libs/models/user.record';
import { Category } from 'src/app/libs/models/category.record';
import { Condition } from 'src/app/libs/models/condition.record';
import { Item } from 'src/app/libs/models/item.record';
import { Size } from 'src/app/libs/models/size.record';
import { ItemComponent } from '../item/item.component';

const dummyCategories: Category[] = [
  { id: 1, label: 'Tops' },
  { id: 2, label: 'Pants' },
  { id: 3, label: 'Dresses' },
  { id: 4, label: 'Shoes' },
  { id: 5, label: 'Outerwear' },
  { id: 6, label: 'Accessories' },
];

const dummySizes: Size[] = [
  { id: 1, label: 'XS' },
  { id: 2, label: 'S' },
  { id: 3, label: 'M' },
  { id: 4, label: 'L' },
  { id: 5, label: 'XL' },
  { id: 6, label: 'EU 36' },
  { id: 7, label: 'EU 37' },
  { id: 8, label: 'EU 38' },
  { id: 9, label: 'EU 39' },
];

const dummyConditions: Condition[] = [
  { id: 1, label: 'New with tags' },
  { id: 2, label: 'Like new' },
  { id: 3, label: 'Good' },
  { id: 4, label: 'Fair' },
  { id: 5, label: 'Needs love' },
];

const dummyUsers: User[] = [
  {
    user_id: 'c1a2b3c4-d5e6-4789-abcd-123456789001',
    username: 'linhpham',
    email: 'linh@example.com',
    created_at: '2025-01-10T14:22:00Z',
    updatedAt: '2025-02-02T10:15:12Z',
    passwordHash: null,
    avatarUrl: '/catProfile1.jpg',
    bio: 'Loves fashion and swapping clothes 💚',
    locationCity: 'Hamburg',
    locationCountry: 'Germany',
  },
  {
    user_id: 'd2e3f4a5-b6c7-4890-bcde-234567890002',
    username: 'minhstyle',
    email: 'minh@example.com',
    created_at: '2025-01-15T09:45:30Z',
    updatedAt: null,
    passwordHash: null,
    avatarUrl: '/catProfile2.jpg',
    bio: 'Minimalist wardrobe enthusiast.',
    locationCity: 'Berlin',
    locationCountry: 'Germany',
  },
  {
    user_id: 'e3f4a5b6-c7d8-4901-cdef-345678900003',
    username: 'sara.mode',
    email: 'sara@example.com',
    created_at: '2025-02-01T12:00:00Z',
    updatedAt: '2025-02-10T17:50:00Z',
    passwordHash: null,
    avatarUrl: '/catProfile3.jpg',
    bio: 'Vintage collector & streetwear lover.',
    locationCity: 'Munich',
    locationCountry: 'Germany',
  },
];

@Component({
  selector: 'app-marketplace',
  imports: [HlmAutocomplete, ItemComponent],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.css',
})
export class MarketplaceComponent {
  private readonly _items: Item[] = [
    {
      id: 1,
      title: 'Cozy Green Sweater',
      description:
        'Soft knitted sweater perfect for autumn. Slightly oversized fit.',
      price: 15,
      images: [
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
        'https://images.unsplash.com/photo-1611930022073-b7a4baec0f59',
      ],
      created_at: '2025-02-01T09:10:00Z',
      updated_at: '2025-02-05T12:22:00Z',

      owner_id: dummyUsers[0].user_id,
      category_id: 1, // Tops
      size_id: 3, // M
      condition_id: 2, // Like new

      owner: dummyUsers[0],
      category: dummyCategories[0],
      size: dummySizes[2],
      condition: dummyConditions[1],
    },

    {
      id: 2,
      title: 'Vintage Mom Jeans',
      description:
        'High-waisted denim with a relaxed 90s fit. Slight fading around knee.',
      price: 22,
      images: ['https://images.unsplash.com/photo-1556906781-9a412961c28c'],
      created_at: '2025-01-28T15:00:00Z',
      updated_at: '2025-01-29T11:30:00Z',

      owner_id: dummyUsers[1].user_id,
      category_id: 2, // Pants
      size_id: 4, // L
      condition_id: 3, // Good

      owner: dummyUsers[1],
      category: dummyCategories[1],
      size: dummySizes[3],
      condition: dummyConditions[2],
    },

    {
      id: 3,
      title: 'Elegant Black Dress',
      description: 'Minimalist design, suitable for events and evening dates.',
      price: 35,
      images: ['https://images.unsplash.com/photo-1556906781-9a412961c28c'],
      created_at: '2025-02-04T18:45:00Z',
      updated_at: '2025-02-04T18:45:00Z',

      owner_id: dummyUsers[2].user_id,
      category_id: 3, // Dresses
      size_id: 2, // S
      condition_id: 1, // New with tags

      owner: dummyUsers[2],
      category: dummyCategories[2],
      size: dummySizes[1],
      condition: dummyConditions[0],
    },

    {
      id: 4,
      title: 'White Sneakers EU 38',
      description: 'Clean condition, worn 3 times. No damage.',
      price: 28,
      images: ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f'],
      created_at: '2025-02-03T12:20:00Z',
      updated_at: '2025-02-11T13:00:00Z',

      owner_id: dummyUsers[0].user_id,
      category_id: 4, // Shoes
      size_id: 8, // EU 38
      condition_id: 2, // Like new

      owner: dummyUsers[0],
      category: dummyCategories[3],
      size: dummySizes[7],
      condition: dummyConditions[1],
    },

    {
      id: 5,
      title: 'Beige Trench Sneaker',
      description: 'Classic trench, mid-length. Perfect for spring.',
      price: null, // swap-only item
      images: ['https://images.unsplash.com/photo-1556906781-9a412961c28c'],
      created_at: '2025-02-02T10:40:00Z',
      updated_at: '2025-02-02T10:40:00Z',

      owner_id: dummyUsers[1].user_id,
      category_id: 5, // Outerwear
      size_id: 3, // M
      condition_id: 3, // Good

      owner: dummyUsers[1],
      category: dummyCategories[4],
      size: dummySizes[2],
      condition: dummyConditions[2],
    },
  ];

  public readonly search = signal('');
  public transformOptionToString = (item: Item) => item.title;

  public filteredOptions = computed<Item[]>(() =>
    this._items.filter((item) =>
      item.title.toLowerCase().includes(this.search().toLocaleLowerCase()),
    ),
  );
}
