import React, { useState, useEffect } from 'react';
import { Search, Edit2, Trash2, Plus } from 'lucide-react';

interface GroupMock {
  id: string;
  name: string;
}

const GroupManagementPage: React.FC = () => {
  // Datos de prueba (mock data) basados en el mockup
  const [groups, setGroups] = useState<GroupMock[]>([
    { id: 'FAM-001', name: 'Familia' },
    { id: 'WRK-205', name: 'Equipo de Diseño' },
    { id: 'SOC-099', name: 'Club de Senderismo' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Futura integración con la API
  /*
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('/api/groups');
        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };
    fetchGroups();
  }, []);
  */

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id: string) => {
    console.log('Editar grupo:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Eliminar grupo:', id);
    // Lógica temporal de filtrado local para demostración
    // setGroups(groups.filter(g => g.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Gestión de Grupos</h1>
            <p className="text-slate-500 mt-1">Administra los grupos y membresías del sistema.</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium shadow-sm">
            <Plus size={20} />
            Nuevo Grupo
          </button>
        </div>

        {/* Barra de Búsqueda */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-slate-200">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por ID o nombre..."
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tabla de Datos */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-bottom border-slate-200">
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">ID</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Nombre del Grupo</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredGroups.length > 0 ? (
                  filteredGroups.map((group) => (
                    <tr key={group.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-mono">
                          {group.id}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {group.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-right space-x-2">
                        <button
                          onClick={() => handleEdit(group.id)}
                          className="inline-flex items-center p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(group.id)}
                          className="inline-flex items-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-slate-500 italic">
                      No se encontraron grupos que coincidan con la búsqueda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Footer de la tabla / Info */}
          <div className="bg-slate-50 px-6 py-3 border-t border-slate-200">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Total: {filteredGroups.length} {filteredGroups.length === 1 ? 'grupo' : 'grupos'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupManagementPage;
