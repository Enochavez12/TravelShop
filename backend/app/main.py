from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import auth

# Crear las tablas en MySQL automáticamente
Base.metadata.create_all(bind=engine)

app = FastAPI(title="TravelShop API")

# CONFIGURACIÓN DE CORS (Para que React pueda conectarse)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Puerto de Vite/React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir las rutas de autenticación
app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"message": "Bienvenido a TravelShop API"}