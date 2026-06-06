import sys
import os

# Añadir el directorio actual al path para importar 'app'
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import SessionLocal, engine, Base
from app.models.user import User, UserRole
from app.models.task import Task
from app.core.security import get_password_hash

def reset_db():
    print("Iniciando reinicio de base de datos...")
    
    # Destruir todas las tablas antiguas
    Base.metadata.drop_all(bind=engine)
    print("Tablas antiguas eliminadas.")
    
    # Crear tablas desde cero con los nuevos esquemas
    Base.metadata.create_all(bind=engine)
    print("Esquema de base de datos creado con éxito.")
    
    # Instanciar sesión
    db = SessionLocal()
    
    try:
        # Crear usuario administrador inicial
        admin_username = "admin"
        admin_password = "admin"
        admin_email = "admin@admin.com"
        admin_group = "familia_1"
        hashed_password = get_password_hash(admin_password)
        
        # El rol debe coincidir con el diseño UML y la lógica de negocio ("ADMIN")
        admin_user = User(
            username=admin_username,
            email=admin_email,
            hashed_password=hashed_password,
            role=UserRole.ADMIN,
            group_id=admin_group,
            is_active=True
        )
        
        db.add(admin_user)
        db.commit()
        print(f"Base de datos reiniciada. Usuario '{admin_username}' ({admin_email}) en grupo '{admin_group}' creado con éxito.")
        
    except Exception as e:
        print(f"Error durante el reinicio: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    reset_db()
