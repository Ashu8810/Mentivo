import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    const cookieStore = await cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: Record<string, unknown>) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    cookieStore.set({ name, value, ...options } as any);
                },
                remove(name: string, options: Record<string, unknown>) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    cookieStore.set({ name, value: '', ...options } as any);
                },
            },
        }
    );

    if (code) {
        await supabase.auth.exchangeCodeForSession(code);
    }

    return NextResponse.redirect(new URL('/dashboard', request.url));
}