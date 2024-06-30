import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';


export async function POST(req, res) {
  const { username, password } = await req.json()
  if (username && password) {
    const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '7d' });
    return NextResponse.json({ token, refreshToken })
  } else {
    return NextResponse.json({ message: 'Invalid credentials' });
  }
}