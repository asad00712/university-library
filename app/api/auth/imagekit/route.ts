import config from '@/lib/config'
import ImageKit from 'imagekit'
import { NextResponse } from 'next/server';

const { env: {
    imageKit: {
        publicKey, privateKey, urlEndpoint
    }
} } = config

const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });

export async function GET() {
    try {
        const authParams = imagekit.getAuthenticationParameters();
        console.log('Generated auth params:', authParams); // Log for debugging
        return NextResponse.json(authParams);
    } catch (error) {
        console.error('Error generating auth params:', error);
        return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }
}