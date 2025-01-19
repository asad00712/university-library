import ImageKit from 'imagekit';
import dummybooks from '../dummybooks.json'
import { books } from './schema';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { config } from 'dotenv';

config( {path: '.env.local'})

const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle({client: sql})
const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!
});

const uploadToImageKit = async (url: string, fileName: string, folder: string) => {
    try {
        const response = await imagekit.upload({
            file: url,
            fileName,
            folder
        });

        return response.filePath

    } catch (error) {
        console.log('Error uploading image', error);
    }
}

const seed = async () => {
    console.log('seeding data...');
    try {
        for(const book of dummybooks) {
            const coverUrl = await uploadToImageKit(book.coverUrl, `${book.title}.jpg`,"/book/covers" ) as string;

            const videoUrl = await uploadToImageKit(book.videoUrl, `${book.title}.mp4`,"/book/videos" ) as string;

            await db.insert(books).values({
                ...book,
                coverUrl,
                videoUrl
            });
        }
console.log('Data seeded Successfully');

    } catch (error) {
        console.log('Error seeding data', error);
    }
}

seed();