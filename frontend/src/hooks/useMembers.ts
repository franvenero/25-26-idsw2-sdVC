import { useState, useEffect, useCallback } from "react";
import { UserResponse, UserCreate, UserUpdateRole } from "../types/user";
import { memberService } from "../services/member.service";

export const useMembers = () => {
  const [members, setMembers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await memberService.getMembers();
      setMembers(data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error al cargar los miembros");
    } finally {
      setLoading(false);
    }
  }, []);

  const addMember = async (data: UserCreate) => {
    try {
      const newMember = await memberService.createMember(data);
      setMembers((prev) => [...prev, newMember]);
      return newMember;
    } catch (err: any) {
      throw new Error(err.response?.data?.detail || "Error al invitar al miembro");
    }
  };

  const updateRole = async (userId: string, roleData: UserUpdateRole) => {
    try {
      const updated = await memberService.updateMemberRole(userId, roleData);
      setMembers((prev) =>
        prev.map((m) => (m.id === userId ? updated : m))
      );
      return updated;
    } catch (err: any) {
      throw new Error(err.response?.data?.detail || "Error al actualizar el rol");
    }
  };

  const deactivateMember = async (userId: string) => {
    try {
      await memberService.deactivateMember(userId);
      setMembers((prev) =>
        prev.map((m) => (m.id === userId ? { ...m, is_active: false } : m))
      );
    } catch (err: any) {
      throw new Error(err.response?.data?.detail || "Error al desactivar el miembro");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return {
    members,
    loading,
    error,
    addMember,
    updateRole,
    deactivateMember,
    refreshMembers: fetchMembers,
  };
};
