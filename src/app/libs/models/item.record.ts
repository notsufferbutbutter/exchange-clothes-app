import { User } from './user.record';
import { Category } from './category.record';
import { Condition } from './condition.record';
import { Size } from './size.record';

export interface Item {
  id: number;
  title: string;
  description: string;
  price: number | null;
  images: string[];
  created_at: string;
  updated_at: string;

  owner_id: string;
  category_id: number;
  size_id: number;
  condition_id: number;

  // Expanded Joins
  owner?: User;
  category?: Category;
  size?: Size;
  condition?: Condition;
}
