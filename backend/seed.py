import sys
import os

# Asegurar que el directorio actual esté en el path para las importaciones de 'app'
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import SessionLocal
from app.models.user import User
from app.core.security import get_password_hash

def seed():
    db = SessionLocal()
    try:
        # Comprobar si el usuario admin ya existe
        user = db.query(User).filter(User.username == "admin").first()
        
        if not user:
            # Crear el usuario admin si no existe
            admin_user = User(
                username="admin",
                hashed_password=get_password_hash("admin"),
                is_active=True
            )
            db.add(admin_user)
            db.commit()
            print("Usuario admin creado con éxito")
        else:
            print("El usuario admin ya existe en la base de datos")
            
    except Exception as e:
        print(f"Error al inicializar los datos: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed()
