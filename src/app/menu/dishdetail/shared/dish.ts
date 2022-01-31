import { Comment } from '../shared/comment';

export class Dish {
  id!: number;
  name!: string;
  image!: string;
  category!: string;
  featured!: boolean;
  label!: string;
  price!: string;
  description!: string;
  comments!: Comment[];
};
