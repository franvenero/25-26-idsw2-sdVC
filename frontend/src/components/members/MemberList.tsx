import React from "react";
import { UserResponse } from "../../types/user";
import { UserRole } from "../../types/auth";

interface MemberListProps {
  members: UserResponse[];
  currentUser: { id: string; role: UserRole };
  onUpdateRole: (id: string, role: UserRole) => Promise<any>;
  onDeactivate: (id: string) => Promise<any>;
}

const MemberList: React.FC<MemberListProps> = ({
  members,
  currentUser,
  onUpdateRole,
  onDeactivate,
}) => {
  const canManage = (target: UserResponse) => {
    if (currentUser.role === UserRole.ADMIN) return target.id !== currentUser.id;
    if (currentUser.role === UserRole.ADMIN_MEMBER) {
      return target.role === UserRole.MEMBER;
    }
    return false;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Miembro</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rol</th>
              <th className="px-6 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 uppercase">
                      {member.username.slice(0, 2)}
                    </div>
                    <span className="font-bold text-slate-700">{member.username}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-medium">
                  {member.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {canManage(member) ? (
                    <select
                      className="text-xs font-bold border border-slate-200 rounded-lg p-1.5 bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                      value={member.role}
                      onChange={(e) => onUpdateRole(member.id, e.target.value as UserRole)}
                    >
                      <option value={UserRole.MEMBER}>Miembro</option>
                      <option value={UserRole.ADMIN_MEMBER}>M. Administrador</option>
                      {currentUser.role === UserRole.ADMIN && (
                        <option value={UserRole.ADMIN}>Administrador</option>
                      )}
                    </select>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                      {member.role}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {canManage(member) && member.is_active && (
                    <button
                      onClick={() => onDeactivate(member.id)}
                      className="text-[10px] font-bold text-red-500 uppercase tracking-widest hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all"
                    >
                      Desactivar
                    </button>
                  )}
                  {!member.is_active && <span className="text-[10px] font-bold text-slate-300 uppercase italic">Inactivo</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberList;
