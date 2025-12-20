'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClientAsync, initializeSupabase } from '@/utils/supabase/client';
import { signIn as signInApi, signUp as signUpApi, signOut as signOutApi, refreshUser as refreshUserApi } from '@/utils/api/auth-api';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [supabase, setSupabase] = useState(null);

  useEffect(() => {
    // Supabase 클라이언트 초기화
    const initSupabase = async () => {
      const client = await initializeSupabase();
      setSupabase(client);

      // 현재 세션 가져오기
      const { data: { session } } = await client.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);

      // 인증 상태 변경 리스너
      const { data: { subscription } } = client.auth.onAuthStateChange(
        async (event, session) => {
          setUser(session?.user ?? null);
          setLoading(false);
        }
      );

      return () => subscription.unsubscribe();
    };

    initSupabase();
  }, []);

  const signIn = async (email, password) => {
    try {
      const { data, error } = await signInApi(email, password);

      if (error) throw error;

      // 성공적인 로그인 후 세션 새로고침
      if (data?.user && supabase) {
        await supabase.auth.refreshSession();
      }

      return { data, error: null };
    } catch (error) {
      console.error('Login error:', error);
      return { data: null, error };
    }
  };

  const signUp = async (email, password, userData) => {
    try {
      const { data, error } = await signUpApi(email, password, userData);

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Signup error:', error);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await signOutApi();
      if (error) throw error;

      // 로그아웃 후 상태 초기화
      setUser(null);
      return { error: null };
    } catch (error) {
      console.error('Logout error:', error);
      return { error };
    }
  };

  const refreshUser = async () => {
    try {
      const { user: refreshedUser, error } = await refreshUserApi();
      if (error) throw error;

      setUser(refreshedUser);
      return { user: refreshedUser, error: null };
    } catch (error) {
      console.error('Refresh user error:', error);
      return { user: null, error };
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
