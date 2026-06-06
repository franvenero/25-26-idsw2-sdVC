import React, { useState } from "react";
import { UserRole } from "../../types/auth";
import { UserCreate } from "../../types/user";

interface MemberFormProps {
  onAdd: (data: UserCreate) => Promise<any>;
}

const MemberForm: React.FC<MemberFormProps> = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: UserRole.MEMBER,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await onAdd(formData);
      setSuccess(true);
      setFormData({ username: "", email: "", role: UserRole.MEMBER });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Invitar Nuevo Miembro</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
            <input
              type="text"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rol</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
            >
              <option value={UserRole.MEMBER}>Miembro</option>
              <option value={UserRole.ADMIN_MEMBER}>Miembro Administrador</option>
            </select>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">¡Invitación enviada con éxito!</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
        >
          {loading ? "Invitando..." : "Enviar Invitación"}
        </button>
      </form>
    </div>
  );
};

export default MemberForm;
