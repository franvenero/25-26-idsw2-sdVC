import sys
import os
import uuid

# Añadir el directorio actual al path para importar 'app'
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import SessionLocal, engine, Base
# Importar TODOS los modelos para que SQLAlchemy registre las tablas en Base.metadata
from app.models.user import User, UserRole
from app.models.task import Task
from app.models.group import Group, GroupMember, GroupMemberRole
from app.models.invitation import Invitation
from app.core.security import get_password_hash

def reset_db():
    print("Iniciando reinicio de base de datos y poblado de datos semilla...")
    
    # Destruir todas las tablas antiguas
    Base.metadata.drop_all(bind=engine)
    print("Tablas antiguas eliminadas.")
    
    # Crear tablas desde cero
    Base.metadata.create_all(bind=engine)
    print("Esquema de base de datos creado con éxito.")
    
    # Instanciar sesión
    db = SessionLocal()
    
    try:
        # 1. Crear el Grupo único para todos los usuarios semilla
        group_id = str(uuid.uuid4())
        db_group = Group(
            id=group_id,
            name="Familia Test",
            description="Grupo compartido para pruebas de desarrollo y RBAC"
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
        print(f"--- Datos Semilla Insertados ---")
        for u in created_users:
            print(f"Usuario: {u.username} | Rol Sistema: {u.role}")
        print(f"Grupo Único ID: {group_id}")
        
    except Exception as e:
        print(f"Error durante el reinicio: {e}")
        db.rollback()
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    reset_db()
