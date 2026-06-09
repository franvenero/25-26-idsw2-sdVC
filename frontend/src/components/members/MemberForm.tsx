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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Usuario</label>
        <input
          type="text"
          required
          placeholder="Ej: juan_vibe"
          className="w-full border border-slate-200 rounded-xl p-2.5 text-sm font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
        <input
          type="email"
          required
          placeholder="hola@vibe.com"
          className="w-full border border-slate-200 rounded-xl p-2.5 text-sm font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Permisos</label>
        <select
          className="w-full border border-slate-200 rounded-xl p-2.5 text-sm font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-white"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
        >
          <option value={UserRole.MEMBER}>Miembro</option>
          <option value={UserRole.ADMIN_MEMBER}>Administrador</option>
        </select>
      </div>

      <div className="pt-2">
        {error && <p className="text-[10px] font-bold text-red-500 mb-3 px-2">⚠️ {error}</p>}
        {success && <p className="text-[10px] font-bold text-emerald-500 mb-3 px-2">✅ Invitación procesada</p>}
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-xl transition-all hover:bg-black hover:shadow-lg active:scale-[0.98] disabled:bg-slate-100 disabled:text-slate-400"
        >
          {loading ? "Enviando..." : "Enviar Invitación"}
        </button>
      </div>
    </form>
  );
};

export default MemberForm;
