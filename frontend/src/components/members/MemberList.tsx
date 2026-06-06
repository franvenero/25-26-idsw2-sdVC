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
    // BR-MEM-02: Hierarchy rules
    if (currentUser.role === UserRole.ADMIN) return target.id !== currentUser.id;
    if (currentUser.role === UserRole.ADMIN_MEMBER) {
      return target.role === UserRole.MEMBER;
    }
    return false;
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Miembro
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rol
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {members.map((member) => (
            <tr key={member.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{member.username}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{member.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {canManage(member) ? (
                  <select
                    className="text-sm border rounded p-1"
                    value={member.role}
                    onChange={(e) => onUpdateRole(member.id, e.target.value as UserRole)}
                  >
                    <option value={UserRole.MEMBER}>Miembro</option>
                    <option value={UserRole.ADMIN_MEMBER}>Miembro Administrador</option>
                    {currentUser.role === UserRole.ADMIN && (
                      <option value={UserRole.ADMIN}>Administrador</option>
                    )}
                  </select>
                ) : (
                  <span className="text-sm text-gray-900">{member.role}</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    member.is_active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {member.is_active ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {canManage(member) && member.is_active && (
                  <button
                    onClick={() => onDeactivate(member.id)}
                    className="text-red-600 hover:text-red-900 font-semibold"
                  >
                    Desactivar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;
