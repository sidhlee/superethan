import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const readingsDirectory = join(process.cwd(), '_readings');

export function getReadingSlugs() {
  return fs.readdirSync(readingsDirectory);
}

export function getReadingBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(readingsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

// TODO: add difficulty column and sort by it
export function getAllReadings(fields: string[] = []) {
  const slugs = getReadingSlugs();
  const readings = slugs
    .map((slug) => getReadingBySlug(slug, fields))
    // sort readings by date in descending order
    .sort((reading1, reading2) => (reading1.date > reading2.date ? -1 : 1));
  return readings;
}
