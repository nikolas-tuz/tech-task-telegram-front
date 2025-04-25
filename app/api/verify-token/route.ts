import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  console.log("process.env.NEXT_PUBLIC_JWT_SECRET:", process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("decoded:", decoded);
    return NextResponse.json({ decoded }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Invalid token ${error}` }, { status: 401 });
  }
}
