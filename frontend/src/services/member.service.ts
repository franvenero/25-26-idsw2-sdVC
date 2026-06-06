import api from "./api";
import { UserResponse, UserCreate, UserUpdateRole } from "../types/user";

class MemberService {
  async getMembers(): Promise<UserResponse[]> {
    const response = await api.get<UserResponse[]>("/members/");
    return response.data;
  }

  async createMember(data: UserCreate): Promise<UserResponse> {
    const response = await api.post<UserResponse>("/members/", data);
    return response.data;
  }

  async updateMemberRole(userId: string, roleData: UserUpdateRole): Promise<UserResponse> {
    const response = await api.patch<UserResponse>(`/members/${userId}/role`, roleData);
    return response.data;
  }

  async deactivateMember(userId: string): Promise<void> {
    await api.delete(`/members/${userId}`);
  }
}

export const memberService = new MemberService();
