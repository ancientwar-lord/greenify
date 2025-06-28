import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface GuestUser {
  id: string;
  email: string;
  user_metadata: {
    name: string;
    location: string;
    avatar: string;
    isGuest: boolean;
  };
}

interface AuthContextType {
  user: User | GuestUser | null;
  session: Session | null;
  loading: boolean;
  isGuest: boolean;
  signUp: (email: string, password: string, userData: { name: string; location: string }) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInAsGuest: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Guest user data
const createGuestUser = (): GuestUser => ({
  id: 'guest-user',
  email: 'guest@greenify.com',
  user_metadata: {
    name: 'Guest User',
    location: 'Exploring Greenify',
    avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    isGuest: true,
  },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | GuestUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    // Check for guest user in localStorage
    const guestUser = localStorage.getItem('greenify_guest_user');
    if (guestUser) {
      setUser(createGuestUser());
      setIsGuest(true);
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsGuest(false);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsGuest(false);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData: { name: string; location: string }) => {
    // Clear guest mode if active
    if (isGuest) {
      localStorage.removeItem('greenify_guest_user');
      setIsGuest(false);
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: userData.name,
          location: userData.location,
        },
      },
    });

    if (!error && data.user) {
      // Create user profile in our users table
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: data.user.id,
            email: data.user.email,
            name: userData.name,
            location: userData.location,
            green_points: 0,
            current_streak: 0,
            longest_streak: 0,
            avatar: `https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1`,
          },
        ]);

      if (profileError) {
        console.error('Error creating user profile:', profileError);
      }
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    // Clear guest mode if active
    if (isGuest) {
      localStorage.removeItem('greenify_guest_user');
      setIsGuest(false);
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signInAsGuest = () => {
    localStorage.setItem('greenify_guest_user', 'true');
    setUser(createGuestUser());
    setIsGuest(true);
    setSession(null);
  };

  const signOut = async () => {
    if (isGuest) {
      localStorage.removeItem('greenify_guest_user');
      setIsGuest(false);
      setUser(null);
    } else {
      await supabase.auth.signOut();
    }
  };

  const value = {
    user,
    session,
    loading,
    isGuest,
    signUp,
    signIn,
    signInAsGuest,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};