import sys
import os
import uuid
from sqlalchemy import create_engine, text

# Añadir el directorio actual al path para importar 'app'
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.config import settings
from app.core.database import SessionLocal, engine, Base
# Importar TODOS los modelos para que SQLAlchemy registre las tablas en Base.metadata
from app.models.user import User, UserRole
from app.models.task import Task
from app.models.group import Group, GroupMember, GroupMemberRole
from app.models.invitation import Invitation
from app.core.security import get_password_hash

def ensure_database_exists():
    """
    Verifica si la base de datos BREÑOTASKDB existe en LocalDB.
    Si no existe, intenta crearla conectándose a la DB 'master'.
    """
    print("Verificando existencia de la base de datos en SQL Server...")
    
    # Extraer la base de la cadena de conexión para conectar a master
    # mssql+pyodbc://(localdb)\\MSSQLLocalDB/BREÑOTASKDB?... -> mssql+pyodbc://(localdb)\\MSSQLLocalDB/master?...
    master_url = settings.DATABASE_URL.replace("/BREÑOTASKDB", "/master")
    temp_engine = create_engine(master_url, isolation_level="AUTOCOMMIT")
    
    try:
        with temp_engine.connect() as conn:
            # Comprobar si existe la base de datos
            result = conn.execute(text("SELECT name FROM sys.databases WHERE name = 'BREÑOTASKDB'"))
            exists = result.fetchone()
            
            if not exists:
                print("La base de datos 'BREÑOTASKDB' no existe. Creándola...")
                conn.execute(text("CREATE DATABASE BREÑOTASKDB"))
                print("Base de datos 'BREÑOTASKDB' creada con éxito.")
            else:
                print("Base de datos 'BREÑOTASKDB' detectada.")
    except Exception as e:
        print(f"Error al verificar/crear la base de datos: {e}")
        print("Asegúrese de que SQL Server LocalDB esté instalado y en ejecución.")
        print("Cadena de conexión intentada (master):", master_url)
    finally:
        temp_engine.dispose()

def reset_db():
    ensure_database_exists()
    
    print("Iniciando reinicio de esquema en SQL Server...")
    
    try:
        # Destruir todas las tablas antiguas
        Base.metadata.drop_all(bind=engine)
        print("Tablas antiguas eliminadas.")
        
        # Crear tablas desde cero
        Base.metadata.create_all(bind=engine)
        print("Esquema de base de datos creado con éxito.")
    except Exception as e:
        print(f"Error durante la creación del esquema: {e}")
        return

    # Instanciar sesión
    db = SessionLocal()
    
    try:
        # 1. Crear el Grupo único para todos los usuarios semilla
        group_id = str(uuid.uuid4())
        db_group = Group(
            id=group_id,
            name="Familia Test",
            description="Grupo compartido para pruebas de desarrollo y RBAC (SQL Server)"
        )
        db.add(db_group)
        db.flush()

        # Datos de usuarios semilla
        users_data = [
            {
                "username": "admin",
                "password": "admin123",
                "email": "admin@test.com",
                "role": UserRole.ADMIN,
                "member_role": GroupMemberRole.ADMIN
            },
            {
                "username": "manager",
                "password": "manager123",
                "email": "manager@test.com",
                "role": UserRole.ADMIN_MEMBER,
                "member_role": GroupMemberRole.ADMIN_MEMBER
            },
            {
                "username": "miembro",
                "password": "miembro123",
                "email": "miembro@test.com",
                "role": UserRole.MEMBER,
                "member_role": GroupMemberRole.MEMBER
            }
        ]

        created_users = []
        for u_data in users_data:
            hashed_pw = get_password_hash(u_data["password"])
            user = User(
                username=u_data["username"],
                email=u_data["email"],
                hashed_password=hashed_pw,
                role=u_data["role"],
                group_id=group_id,
                is_active=True
            )
            db.add(user)
            db.flush()
            
            # Registrar como miembro del grupo
            member = GroupMember(
                user_id=user.id,
                group_id=group_id,
                role=u_data["member_role"]
            )
            db.add(member)
            created_users.append(user)
        
        db.commit()
        print(f"--- Datos Semilla Insertados (SQL Server) ---")
        for u in created_users:
            print(f"Usuario: {u.username} | Rol Sistema: {u.role}")
        print(f"Grupo Único ID: {group_id}")
        
    except Exception as e:
        print(f"Error durante el poblado de datos: {e}")
        db.rollback()
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    reset_db()
