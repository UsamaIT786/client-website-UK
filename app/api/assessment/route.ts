import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Use environment variable if available, fallback to localhost:5000
    const backendUrl = process.env.BACKEND_URL || 'https://client-backend-alpha.vercel.app/';
    
    const response = await fetch(`${backendUrl}/api/assessment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy Error (Assessment):', error);
    return NextResponse.json({ error: 'Failed to submit assessment.' }, { status: 500 });
  }
}
