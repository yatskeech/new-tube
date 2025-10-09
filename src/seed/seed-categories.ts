import { db } from '@/db';
import { categories } from '@/db/schema';

const categoryNames = [
  'Cars and vehicles',
  'Comedy',
  'Education',
  'Gaming',
  'Entertainment',
  'Film and animation',
  'How-to and style',
  'Music',
  'News and politics',
  'People and blogs',
  'Pets and animals',
  'Science and technology',
  'Sports',
  'Travel and events',
];

export async function seedCategories() {
  console.log('Seeding categories...');

  const values = categoryNames.map((name) => ({
    name,
    description: `Videos related to ${name.toLocaleLowerCase()}`,
  }));

  try {
    await db.insert(categories).values(values);
    console.log('Categories seeded successfully');
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
}

seedCategories();
