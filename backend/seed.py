import sys
import os

# Asegurar que el directorio actual esté en el path para las importaciones de 'app'
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import SessionLocal
from app.models.user import User, UserRole
from app.core.security import get_password_hash

def seed():
    """
    Script de inicialización robusto para crear el usuario administrador.
    Elimina cualquier rastro previo del usuario 'admin' para asegurar un estado limpio.
    """
    db = SessionLocal()
    try:
        print("Iniciando proceso de inicialización de datos...")

        # 1. Buscar y eliminar usuario admin existente para evitar conflictos de roles o hashes antiguos
        existing_admin = db.query(User).filter(User.username == "admin").first()
        if existing_admin:
            print("Eliminando usuario 'admin' existente para re-creación limpia...")
            db.delete(existing_admin)
            db.commit()

        # 2. Crear el nuevo usuario administrador con el rol correcto
        admin_user = User(
            username="admin",
            hashed_password=get_password_hash("admin"),
            role=UserRole.ADMIN,
            is_active=True
        )

        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)

        print("✅ Usuario admin creado con éxito y listo para usar")

    except Exception as e:
        print(f"❌ Error crítico al inicializar los datos: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed()
