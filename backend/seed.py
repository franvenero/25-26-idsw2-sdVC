import sys
import os

# Añadir el directorio actual al path para importar 'app'
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import SessionLocal, engine, Base
# Importar TODOS los modelos para que SQLAlchemy registre las tablas en Base.metadata
from app.models.user import User, UserRole
from app.models.task import Task
from app.models.group import Group, GroupMember
from app.models.invitation import Invitation
from app.core.security import get_password_hash

def reset_db():
    print("Iniciando reinicio de base de datos...")
    
    # Destruir todas las tablas antiguas
    # Ahora Base.metadata conoce 'groups' e 'invitations' por las importaciones previas
    Base.metadata.drop_all(bind=engine)
    print("Tablas antiguas eliminadas.")
    
    # Crear tablas desde cero con los nuevos esquemas
    Base.metadata.create_all(bind=engine)
    print("Esquema de base de datos creado con éxito.")
    
    # Instanciar sesión
    db = SessionLocal()
    
    try:
        # Crear usuario administrador inicial
        # RN-SEC-01: La contraseña en texto plano debe ser corta para bcrypt (< 72 bytes)
        admin_username = "admin"
        admin_plain_password = "admin123" # Contraseña sencilla y segura para el límite de bcrypt
        admin_email = "admin@admin.com"
        admin_group_name = "familia_1"
        
        # Encriptamos la contraseña una sola vez
        hashed_password = get_password_hash(admin_plain_password)
        
        # Primero creamos el grupo para mantener integridad referencial
        db_group = Group(
            name=admin_group_name,
            description="Grupo familiar inicial"
        )
        db.add(db_group)
        db.flush() # Para obtener el ID del grupo

        # El rol debe coincidir con el diseño UML y la lógica de negocio ("Administrador")
        admin_user = User(
            username=admin_username,
            email=admin_email,
            hashed_password=hashed_password,
            role=UserRole.ADMIN,
            group_id=str(db_group.id),
            is_active=True
        )
        db.add(admin_user)
        db.flush()

        # Registrar al admin como miembro del grupo
        from app.models.group import GroupMemberRole
        member = GroupMember(
            user_id=admin_user.id,
            group_id=db_group.id,
            role=GroupMemberRole.ADMIN
        )
        db.add(member)
        
        db.commit()
        print(f"Base de datos reiniciada con éxito.")
        print(f"Usuario: {admin_username}")
        print(f"Contraseña: {admin_plain_password}")
        print(f"Email: {admin_email}")
        print(f"Grupo: {admin_group_name} ({db_group.id})")
        
    except Exception as e:
        print(f"Error durante el reinicio: {e}")
        db.rollback()
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    reset_db()
