import { supabase } from './supabaseClient';
import { SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from '@supabase/supabase-js';

export const authService = {
    async signUp(credentials: { email: string; password: string; name: string }) {
        const { email, password, name } = credentials;
        return await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                },
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    },


    async signIn(credentials: SignInWithPasswordCredentials) {
        return await supabase.auth.signInWithPassword(credentials);
    },

    async signInWithOAuth(provider: 'google' | 'apple') {
        return await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    },

    async signOut() {
        return await supabase.auth.signOut();
    },

    async getUser() {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    },

    async getSession() {
        const { data: { session } } = await supabase.auth.getSession();
        return session;
    },
};
