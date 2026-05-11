import smtplib, os
from email.message import EmailMessage
from passlib.context import CryptContext

# Configuramos el contexto de seguridad
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:
    def __init__(self, repository):
        self.repository = repository

    def register_user(self, user_data: dict):
        # 1. Extraemos la contraseña y la aseguramos como String
        # Usamos .pop para sacarla del diccionario y borrarla de una vez
        raw_password = str(user_data.pop('password', ''))

        if not raw_password or raw_password == '':
            raise ValueError("La contraseña es requerida")
            
        # 2. Generamos el hash (BCrypt ahora recibe un string limpio de 100%)
        user_data['hashed_password'] = pwd_context.hash(raw_password)
        
        # 3. Guardamos en la base de datos
        user = self.repository.create(user_data)
        
        # 4. Enviar correo de bienvenida
        self.send_welcome_email(user_data['email'], user_data['full_name'])
            
        return user

    def send_welcome_email(self, email, name):
        msg = EmailMessage()
        msg.set_content(f"Hola {name},\n\n¡Bienvenido a TravelShop! Tu cuenta ha sido creada exitosamente.")
        msg['Subject'] = 'Bienvenido a TravelShop'
        msg['From'] = os.getenv("SMTP_USER")
        msg['To'] = email
        
        try:
            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
                smtp.login(os.getenv("SMTP_USER"), os.getenv("SMTP_PASS"))
                smtp.send_message(msg)
        except Exception as e:
            print(f"Error enviando correo: {e}")