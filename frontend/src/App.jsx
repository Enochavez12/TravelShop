import React, { useState, useRef } from 'react';
import { Plane, MapPin, Search, Mail, Lock, X, Users, Star, Calendar, Phone, User, CreditCard, Hotel, Ticket, ArrowRight, Info, CheckCircle } from 'lucide-react';
import api from './api';

function App() {
  const secciones = { hero: useRef(null), vuelos: useRef(null), hoteles: useRef(null), paquetes: useRef(null) };
  const scrollToSection = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth' });

  // --- ESTADOS ---
  const [pasajeros, setPasajeros] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(null);
  const [metodoPago, setMetodoPago] = useState(null); // 'paypal' o 'tarjeta'
  const [showInfo, setShowInfo] = useState(null); // Para "Más Información"
  const [formData, setFormData] = useState({ full_name: '', phone: '', email: '', password: '', birth_date: '' });

  // --- DATA EXPANDIDA Y COHERENTE ---
  const vuelos = [
    { id: 10, aerolinea: "Aeroméxico", ruta: "Tuxtla - Cancún", precio: 2800, img: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?w=800", detalle: "Vuelo directo con snacks premium, selección de asiento y maleta de mano incluida." },
    { id: 11, aerolinea: "Volaris", ruta: "CDMX - Cancún", precio: 1950, img: "https://images.unsplash.com/photo-1544016768-982d1554f0b9?w=800", detalle: "Tarifa limpia. Salidas cada hora desde la T1. Ideal para viajes rápidos y económicos." },
    { id: 12, aerolinea: "Viva Aerobus", ruta: "Monterrey - Cancún", precio: 2100, img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800", detalle: "La ruta más rápida desde el norte. Aviones nuevos Airbus A321neo." }
  ];

  const hoteles = [
    { id: 1, nombre: "Grand Fiesta Americana", precio: 4500, img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800", estrellas: 5, detalle: "Ubicado en el corazón de la zona hotelera. Cuenta con 12 restaurantes y el spa más grande de Latinoamérica." },
    { id: 2, nombre: "Hyatt Zilara Cancún", precio: 5200, img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800", estrellas: 5, detalle: "Resort solo para adultos. Todas las habitaciones tienen vista al mar y jacuzzi privado." },
    { id: 3, nombre: "Hard Rock Hotel", precio: 4800, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800", estrellas: 5, detalle: "Diversión garantizada con música en vivo, 3 albercas gigantes y plan todo incluido de lujo." }
  ];

  const paquetes = [
    { id: 5, hotel: "Aquamarina Beach Resort", precio: 6490, destino: "Cancún", img: "https://images.unsplash.com/photo-1582610116397-edb318620f90?w=800", detalle: "5 días y 4 noches. Incluye vuelo redondo, hotel a pie de playa y todos los alimentos/bebidas." },
    { id: 6, hotel: "Krystal Grand Cancún", precio: 7890, destino: "Cancún", img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800", detalle: "Ubicación privilegiada en Punta Cancún. Incluye cenas temáticas y tour a Isla Mujeres." },
    { id: 7, hotel: "Riu Palace Península", precio: 9200, destino: "Cancún", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800", detalle: "Lujo máximo. 5 albercas, servicio de mayordomo en la playa y licores internacionales." }
  ];

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { ...formData, email: formData.email.toLowerCase().trim() });
      alert("¡Cuenta creada exitosamente!");
      setShowModal(false);
    } catch (err) { alert("Error al registrar. Revisa los datos."); }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100">
      {/* NAVBAR */}
      <header className="fixed top-0 w-full flex justify-between items-center px-12 py-8 text-white z-50 bg-black/60 backdrop-blur-sm">
        <div className="flex items-center gap-3 font-black text-4xl tracking-tighter cursor-pointer" onClick={() => scrollToSection(secciones.hero)}>
          <Plane className="text-blue-400 w-10 h-10 rotate-45" />
          <span>TRAVEL<span className="font-thin text-blue-400">SHOP</span></span>
        </div>
        <nav className="hidden lg:flex gap-12 text-sm font-bold uppercase tracking-widest">
          <button onClick={() => scrollToSection(secciones.vuelos)} className="hover:text-blue-400 transition">Vuelos</button>
          <button onClick={() => scrollToSection(secciones.hoteles)} className="hover:text-blue-400 transition">Hoteles</button>
          <button onClick={() => scrollToSection(secciones.paquetes)} className="hover:text-blue-400 transition border-b-2 border-blue-500 pb-1">Paquetes</button>
        </nav>
        <button onClick={() => setShowModal(true)} className="bg-white text-black px-10 py-4 rounded-full font-black hover:bg-blue-600 hover:text-white transition-all shadow-2xl text-base uppercase">
          Mi Cuenta
        </button>
      </header>

      {/* HERO */}
      <section ref={secciones.hero} className="relative h-screen flex items-center justify-center bg-black">
        <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover opacity-60">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-tropical-beach-with-palm-trees-1558-large.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter drop-shadow-2xl">CANCÚN</h1>
          <p className="text-3xl md:text-4xl font-light tracking-[0.5em] mt-2 uppercase">Paraíso Maya</p>
        </div>
        
        {/* BUSCADOR PROFESIONAL */}
        <div className="absolute -bottom-20 w-full max-w-7xl px-6">
          <div className="bg-white/95 backdrop-blur-xl rounded-[50px] shadow-2xl p-12 grid grid-cols-1 md:grid-cols-4 gap-8 items-center border border-white">
            <div className="flex flex-col border-r border-gray-100">
              <label className="text-xs font-black text-blue-600 uppercase mb-2 flex items-center gap-2"><MapPin size={14}/> Destino</label>
              <input type="text" placeholder="¿A dónde vas?" className="text-2xl font-bold text-gray-900 outline-none" />
            </div>
            <div className="flex flex-col border-r border-gray-100">
                <label className="text-xs font-black text-blue-600 uppercase mb-2 flex items-center gap-2"><Calendar size={14}/> Fecha</label>
                <input type="date" className="text-xl font-bold text-gray-900 outline-none bg-transparent" />
            </div>
            <div className="flex flex-col border-r border-gray-100 px-2">
                <label className="text-xs font-black text-blue-600 uppercase mb-2 flex items-center gap-2"><Users size={14}/> Personas</label>
                <select className="text-xl font-bold text-gray-900 bg-transparent outline-none cursor-pointer" value={pasajeros} onChange={e => setPasajeros(Number(e.target.value))}>
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Viajero' : 'Viajeros'}</option>)}
                </select>
            </div>
            <button className="bg-blue-600 hover:bg-black text-white h-full rounded-[30px] font-black text-2xl transition-all flex items-center justify-center gap-3 shadow-2xl py-6 group">
              BUSCAR <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* VUELOS */}
      <section ref={secciones.vuelos} className="pt-60 pb-32 max-w-[1600px] mx-auto px-12">
        <h2 className="text-8xl font-black tracking-tighter mb-20 uppercase border-l-[20px] border-blue-600 pl-10">Vuelos Directos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {vuelos.map(v => (
            <div key={v.id} className="bg-gray-50 rounded-[50px] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all p-10 group">
                <img src={v.img} className="w-full h-48 object-cover rounded-[40px] mb-8 group-hover:scale-105 transition" />
                <div className="flex justify-between items-start mb-2">
                    <p className="text-blue-600 font-black text-sm uppercase tracking-widest">{v.aerolinea}</p>
                    <button onClick={() => setShowInfo(v)} className="text-gray-400 hover:text-blue-600"><Info size={24}/></button>
                </div>
                <h3 className="text-4xl font-black mb-6 leading-none">{v.ruta}</h3>
                <div className="flex justify-between items-center border-t pt-8">
                    <p className="text-4xl font-black">${v.precio.toLocaleString()}</p>
                    <button onClick={() => { setShowPayModal(v); setMetodoPago(null); }} className="bg-black text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-600 transition">Comprar</button>
                </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOTELES */}
      <section ref={secciones.hoteles} className="py-32 bg-gray-950 text-white px-12">
        <div className="max-w-[1600px] mx-auto">
            <h2 className="text-8xl font-black tracking-tighter mb-20 uppercase text-right">Resorts <span className="text-blue-500 font-thin italic">Premium</span></h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {hoteles.map(h => (
                    <div key={h.id} className="relative h-[600px] rounded-[60px] overflow-hidden group shadow-2xl border border-white/10">
                        <img src={h.img} className="absolute inset-0 w-full h-full object-cover transition duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                        <div className="absolute top-8 right-8">
                             <button onClick={() => setShowInfo(h)} className="bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/40 transition"><Info size={24} color="white"/></button>
                        </div>
                        <div className="absolute bottom-16 left-12 right-12">
                            <div className="flex text-yellow-400 mb-4 gap-1">
                                {[...Array(h.estrellas)].map((_, i) => <Star key={i} size={20} fill="currentColor"/>)}
                            </div>
                            <h3 className="text-5xl font-black tracking-tighter mb-6 leading-none">{h.nombre}</h3>
                            <div className="flex justify-between items-center">
                                <p className="text-5xl font-black text-blue-400">${h.precio.toLocaleString()}</p>
                                <button onClick={() => { setShowPayModal(h); setMetodoPago(null); }} className="bg-white text-black px-10 py-4 rounded-2xl font-black text-lg hover:bg-blue-600 hover:text-white transition-all uppercase">Reservar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* PAQUETES */}
      <section ref={secciones.paquetes} className="py-32 bg-gray-50 px-12">
        <div className="max-w-[1600px] mx-auto">
            <h2 className="text-8xl font-black tracking-tighter mb-20 uppercase">Paquetes Todo Incluido</h2>
            <div className="grid grid-cols-1 gap-12">
                {paquetes.map(p => (
                    <div key={p.id} className="bg-white rounded-[70px] overflow-hidden flex flex-col md:flex-row shadow-xl border border-gray-100 group hover:shadow-3xl transition-all duration-500">
                        <div className="md:w-1/2 h-[500px] overflow-hidden">
                            <img src={p.img} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                        </div>
                        <div className="md:w-1/2 p-20 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <p className="text-blue-600 font-black text-sm uppercase tracking-[0.3em] italic">Hotel + Vuelo Redondo</p>
                                    <button onClick={() => setShowInfo(p)} className="text-gray-300 hover:text-blue-600"><Info size={32}/></button>
                                </div>
                                <h3 className="text-6xl font-black text-gray-900 leading-[0.9] tracking-tighter mb-8">{p.hotel}</h3>
                                <div className="flex gap-4 mb-6">
                                     <span className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-4 py-2 rounded-full text-sm"><CheckCircle size={16}/> Alimentos Incluidos</span>
                                     <span className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-4 py-2 rounded-full text-sm"><CheckCircle size={16}/> Traslados VIP</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-12 border-t pt-10">
                                <div>
                                    <p className="text-gray-400 font-bold uppercase text-xs">Total para {pasajeros} personas</p>
                                    <p className="text-6xl font-black text-gray-950">${(p.precio * pasajeros).toLocaleString()}</p>
                                </div>
                                <button onClick={() => { setShowPayModal(p); setMetodoPago(null); }} className="bg-blue-600 text-white px-14 py-6 rounded-[30px] font-black text-2xl hover:bg-black transition-all uppercase">Comprar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* MODAL DE PAGO MEJORADO */}
      {showPayModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl flex items-center justify-center z-[100] p-6">
          <div className="bg-white w-full max-w-4xl rounded-[80px] p-24 relative overflow-y-auto max-h-[90vh]">
            <button onClick={() => setShowPayModal(null)} className="absolute top-12 right-12 text-gray-300 hover:text-black transition-all transform hover:rotate-90"><X size={60} /></button>
            <div className="text-center">
                <h2 className="text-7xl font-black tracking-tighter mb-10">{showPayModal.hotel || showPayModal.nombre || showPayModal.ruta}</h2>
                
                <div className="grid grid-cols-2 gap-8 mb-12">
                    <button onClick={() => setMetodoPago('paypal')} className={`flex flex-col items-center p-10 rounded-[40px] border-4 transition-all ${metodoPago === 'paypal' ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:bg-gray-50'}`}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-12 mb-4" alt="PayPal" />
                        <span className="font-black text-xl">PayPal</span>
                    </button>
                    <button onClick={() => setMetodoPago('tarjeta')} className={`flex flex-col items-center p-10 rounded-[40px] border-4 transition-all ${metodoPago === 'tarjeta' ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:bg-gray-50'}`}>
                        <CreditCard size={48} className="mb-4 text-gray-800" />
                        <span className="font-black text-xl text-gray-800">Tarjeta</span>
                    </button>
                </div>

                {metodoPago === 'tarjeta' && (
                    <div className="space-y-6 text-left animate-in slide-in-from-bottom-10 duration-500">
                        <div className="bg-gray-50 p-8 rounded-[40px]">
                            <label className="text-xs font-black text-gray-400 uppercase ml-4">Número de Tarjeta</label>
                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-transparent text-3xl font-bold outline-none mt-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-8 rounded-[40px]">
                                <label className="text-xs font-black text-gray-400 uppercase ml-4">Expiración</label>
                                <input type="text" placeholder="MM/AA" className="w-full bg-transparent text-3xl font-bold outline-none mt-2" />
                            </div>
                            <div className="bg-gray-50 p-8 rounded-[40px]">
                                <label className="text-xs font-black text-gray-400 uppercase ml-4">CVV</label>
                                <input type="text" placeholder="***" className="w-full bg-transparent text-3xl font-bold outline-none mt-2" />
                            </div>
                        </div>
                        <button className="w-full bg-blue-600 text-white py-8 rounded-[40px] font-black text-3xl shadow-2xl shadow-blue-200 mt-6 uppercase">Pagar ${(showPayModal.precio * pasajeros).toLocaleString()} MXN</button>
                    </div>
                )}

                {metodoPago === 'paypal' && (
                    <div className="animate-in zoom-in duration-500">
                        <p className="text-2xl font-bold text-gray-400 mb-8">Redirigiendo a PayPal...</p>
                        <button className="bg-[#ffc439] text-blue-900 px-20 py-8 rounded-full font-black text-3xl shadow-xl">CONTINUAR CON PAYPAL</button>
                    </div>
                )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL MÁS INFORMACIÓN */}
      {showInfo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[300] p-6">
           <div className="bg-white w-full max-w-2xl rounded-[60px] p-16 relative">
              <button onClick={() => setShowInfo(null)} className="absolute top-10 right-10 text-gray-300 hover:text-black"><X size={48} /></button>
              <h2 className="text-5xl font-black tracking-tighter mb-6">{showInfo.hotel || showInfo.nombre || showInfo.ruta}</h2>
              <div className="bg-blue-50 p-8 rounded-[40px] mb-8 italic text-blue-800 text-2xl leading-relaxed">
                  "{showInfo.detalle}"
              </div>
              <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-xl font-bold text-gray-700"><CheckCircle className="text-green-500"/> Cancelación Gratuita</li>
                  <li className="flex items-center gap-4 text-xl font-bold text-gray-700"><CheckCircle className="text-green-500"/> Seguro de viaje incluido</li>
                  <li className="flex items-center gap-4 text-xl font-bold text-gray-700"><CheckCircle className="text-green-500"/> Mejor precio garantizado</li>
              </ul>
              <button onClick={() => setShowInfo(null)} className="w-full bg-black text-white py-6 rounded-[30px] font-black text-xl mt-10">CERRAR</button>
           </div>
        </div>
      )}

      {/* MODAL REGISTRO (CAMPOS COMPLETOS) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-[100] p-6">
          <div className="bg-white w-full max-w-3xl rounded-[70px] p-20 relative overflow-y-auto max-h-[90vh]">
            <button onClick={() => setShowModal(false)} className="absolute top-10 right-10 text-gray-300 hover:text-black"><X size={48} /></button>
            <h2 className="text-6xl font-black tracking-tighter text-center mb-10 uppercase">Registro</h2>
            <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="text-xs font-black uppercase ml-4 text-gray-400">Nombre Completo</label>
                <input required type="text" className="w-full bg-gray-100 p-6 rounded-[25px] outline-none text-xl font-bold mt-2" onChange={e => setFormData({...formData, full_name: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-black uppercase ml-4 text-gray-400">Teléfono</label>
                <input required type="tel" className="w-full bg-gray-100 p-6 rounded-[25px] outline-none text-xl font-bold mt-2" onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-black uppercase ml-4 text-gray-400">Fecha de Nacimiento</label>
                <input required type="date" className="w-full bg-gray-100 p-6 rounded-[25px] outline-none text-xl font-bold mt-2" onChange={e => setFormData({...formData, birth_date: e.target.value})} />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-black uppercase ml-4 text-gray-400">Correo Electrónico</label>
                <input required type="email" className="w-full bg-gray-100 p-6 rounded-[25px] outline-none text-xl font-bold mt-2" onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-black uppercase ml-4 text-gray-400">Contraseña</label>
                <input required type="password" placeholder="••••••••" className="w-full bg-gray-100 p-6 rounded-[25px] outline-none text-xl font-bold mt-2" onChange={e => setFormData({...formData, password: e.target.value})} />
              </div>
              <button className="md:col-span-2 bg-blue-600 text-white py-8 rounded-[35px] font-black text-3xl hover:bg-black transition-all mt-6 uppercase tracking-widest shadow-2xl shadow-blue-200">
                Crear Mi Cuenta
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;