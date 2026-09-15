'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.auth.login(email, password);
      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);
      setUser(response.data.user);
      toast.success('Connexion réussie!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur de connexion');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [router]);

  const logout = useCallback(async () => {
    try {
      await api.auth.logout();
      localStorage.removeItem('access_token');
      setUser(null);
      router.push('/');
      toast.success('Déconnexion réussie!');
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
    }
  }, [router]);

  return { user, loading, login, logout };
}
