import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb'; 
import Prompt from '@/models/Prompt';      
export async function GET() {
  try {
    await connectDB();
    const prompts = await Prompt.find({});
    return NextResponse.json(prompts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch" }, { status: 500 });
  }
}