import React, { useState, useEffect } from 'react';

const IconoMas = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
  </svg>
);

const IconoBasura = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const IconoCheck = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
  </svg>
);

const IconoUsuario = () => (
  <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const IconoMail = () => (
  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconoCandado = () => (
  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 002-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const IconoLista = () => (
  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const IconoCerrarSesion = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h6a2 2 0 00-2-2v-1" />
  </svg>
);

const IconoOjo = () => (
  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);
export default function App() {
  // Lista de usuarios registrados en el sistema
  const [usuariosBD, setUsuariosBD] = useState([]);
  
  // Usuario actualmente seleccionado para publicar
  const [usuarioActivo, setUsuarioActivo] = useState(null);

  // Campos para el formulario de registro y login
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorRegistro, setErrorRegistro] = useState('');

  // Estado para la lista global de tareas y el input de la nueva tarea
  const [tareas, setTareas] = useState([]);
  const [textoNuevaTarea, setTextoNuevaTarea] = useState('');

  useEffect(() => {
    const usuariosGuardados = localStorage.getItem('base_usuarios');
    if (usuariosGuardados) {
      const lista = JSON.parse(usuariosGuardados);
      setUsuariosBD(lista);
      if (lista.length > 0) {
        setUsuarioActivo(lista[0]);
      }
    }

    const tareasGuardadas = localStorage.getItem('base_tareas_compartidas');
    if (tareasGuardadas) {
      setTareas(JSON.parse(tareasGuardadas));
    }
  }, []);

  // Sincronizar tareas en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('base_tareas_compartidas', JSON.stringify(tareas));
  }, [tareas]);

  // Cerrar sesion manteniendo intactas todas las tareas guardadas
  const cerrarSesion = () => {
    setUsuarioActivo(null);
  };

  const registrarOIngresarUsuario = (e) => {
    e.preventDefault();
    setErrorRegistro('');

    if (!nombre.trim() || !email.trim() || !password.trim()) {
      setErrorRegistro('Completa Nombre, Email y Contraseña.');
      return;
    }

    if (password.length < 4) {
      setErrorRegistro('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    const emailLimpio = email.trim().toLowerCase();
    const usuarioExistente = usuariosBD.find((u) => u.email === emailLimpio);

    if (usuarioExistente) {
      if (usuarioExistente.password === password) {
        setUsuarioActivo(usuarioExistente);
        setNombre('');
        setEmail('');
        setPassword('');
      } else {
        setErrorRegistro('Contraseña incorrecta para este email.');
      }
    } else {
      const nuevoUsuario = {
        nombre: nombre.trim(),
        email: emailLimpio,
        password: password,
      };

      const nuevaListaUsuarios = [...usuariosBD, nuevoUsuario];
      setUsuariosBD(nuevaListaUsuarios);
      localStorage.setItem('base_usuarios', JSON.stringify(nuevaListaUsuarios));
      setUsuarioActivo(nuevoUsuario);

      setNombre('');
      setEmail('');
      setPassword('');
    }
  };

  const agregarTarea = (e) => {
    e.preventDefault();
    if (!textoNuevaTarea.trim() || !usuarioActivo) return;

    const nuevaTarea = {
      id: Date.now(),
      texto: textoNuevaTarea.trim(),
      completada: false,
      creador: usuarioActivo.nombre,
      emailCreador: usuarioActivo.email,
    };

    setTareas([nuevaTarea, ...tareas]);
    setTextoNuevaTarea('');
  };

  const alternarCompletada = (id) => {
    setTareas(
      tareas.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t))
    );
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  // Calculos de avance general
  const completadas = tareas.filter((t) => t.completada).length;
  const total = tareas.length;
  const porcentajeProgreso = total > 0 ? Math.round((completadas / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <header className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
              <IconoLista />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                MIS TAREAS
              </span>
              <h1 className="text-xl font-bold text-white">Gestor de Tareas Compartido</h1>
            </div>
          </div>

          {usuarioActivo ? (
            <div className="flex items-center gap-3">
              <div className="bg-slate-950 border border-indigo-500/30 px-4 py-2.5 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-bold text-sm">
                  {usuarioActivo.nombre.charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-400">Publicando como:</p>
                  <p className="text-sm font-semibold text-indigo-300">{usuarioActivo.nombre}</p>
                </div>
              </div>

              <button
                onClick={cerrarSesion}
                className="p-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
                title="Cerrar Sesión"
              >
                <IconoCerrarSesion />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-2 rounded-xl">
              <IconoOjo />
              <span>Modo Lectura — Inicia sesión a la izquierda para crear tareas</span>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <h2 className="text-lg font-bold text-white mb-1">
                {usuarioActivo ? 'Sesión Iniciada' : 'Registro / Ingreso'}
              </h2>
              <p className="text-xs text-slate-400 mb-4">
                {usuarioActivo
                  ? `Estás registrado como ${usuarioActivo.nombre}.`
                  : 'Registra un nuevo usuario o ingresa para publicar tareas.'}
              </p>

              {errorRegistro && (
                <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs">
                  {errorRegistro}
                </div>
              )}

              <form onSubmit={registrarOIngresarUsuario} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Nombre
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IconoUsuario />
                    </div>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IconoMail />
                    </div>
                    <input
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Contraseña
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IconoCandado />
                    </div>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs transition shadow-lg shadow-indigo-600/20 mt-2 cursor-pointer"
                >
                  Registrar / Iniciar Sesión
                </button>
              </form>
            </section>

            {usuariosBD.length > 0 && (
              <section className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Usuarios Registrados ({usuariosBD.length})
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {usuariosBD.map((u, idx) => (
                    <button
                      key={idx}
                      onClick={() => setUsuarioActivo(u)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs transition cursor-pointer ${
                        usuarioActivo?.email === u.email
                          ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <IconoUsuario />
                        <span className="truncate">{u.nombre}</span>
                      </div>
                      {usuarioActivo?.email === u.email ? (
                        <span className="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full font-bold">
                          Activo
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 hover:text-indigo-400">
                          Seleccionar
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-8 space-y-6">
            
            <section className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2.5 shadow-xl">
              <div className="flex justify-between items-center text-xs font-medium text-slate-300">
                <span>Progreso general de tareas</span>
                <span className="text-indigo-400 font-semibold bg-indigo-950/80 px-2.5 py-1 rounded-full border border-indigo-800/40">
                  {completadas} de {total} completadas ({porcentajeProgreso}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-indigo-500 transition-all duration-500 rounded-full"
                  style={{ width: `${porcentajeProgreso}%` }}
                />
              </div>
            </section>

            <section className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl">
              <form onSubmit={agregarTarea} className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <IconoMas />
                  </div>
                  <input
                    type="text"
                    disabled={!usuarioActivo}
                    placeholder={
                      usuarioActivo
                        ? `Escribe una tarea como ${usuarioActivo.nombre}...`
                        : 'Inicia sesión a la izquierda para agregar nuevas tareas'
                    }
                    value={textoNuevaTarea}
                    onChange={(e) => setTextoNuevaTarea(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!textoNuevaTarea.trim() || !usuarioActivo}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium px-5 py-3 rounded-xl transition shadow-lg shadow-indigo-600/20 flex items-center gap-2 text-sm shrink-0 cursor-pointer"
                >
                  <IconoMas />
                  <span>Agregar</span>
                </button>
              </form>
            </section>

            <section className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Lista de Tareas ({tareas.length})
                </h3>
                {!usuarioActivo && (
                  <span className="text-[11px] text-amber-400/90 font-medium">
                    👁 Mostrando todas las tareas guardadas
                  </span>
                )}
              </div>

              {tareas.length === 0 ? (
                <div className="bg-slate-900/50 border border-dashed border-slate-800 p-8 rounded-2xl text-center">
                  <p className="text-slate-400 text-sm">No hay tareas creadas en la lista.</p>
                  <p className="text-xs text-slate-500 mt-1">
                    ¡Registra un usuario e ingresa la primera tarea!
                  </p>
                </div>
              ) : (
                tareas.map((t) => (
                  <div
                    key={t.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition ${
                      t.completada
                        ? 'bg-slate-900/40 border-slate-800/60 text-slate-500'
                        : 'bg-slate-900 border-slate-800 text-slate-100 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 flex-1 min-w-0 pr-3">
                      <button
                        onClick={() => alternarCompletada(t.id)}
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center transition shrink-0 cursor-pointer ${
                          t.completada
                            ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                            : 'border-slate-600 hover:border-indigo-500 text-transparent'
                        }`}
                        title={t.completada ? "Marcar como incompleta" : "Marcar como completada"}
                      >
                        <IconoCheck />
                      </button>

                      <div className="flex flex-col min-w-0">
                        <span
                          className={`text-sm break-words transition ${
                            t.completada ? 'line-through text-slate-500' : 'text-slate-200 font-medium'
                          }`}
                        >
                          {t.texto}
                        </span>

                        <div className="flex items-center gap-1.5 mt-1 text-xs text-indigo-400/90 font-medium">
                          <IconoUsuario />
                          <span>Creado por: <strong className="text-indigo-300">{t.creador || 'Usuario'}</strong></span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => eliminarTarea(t.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition shrink-0 cursor-pointer"
                      title="Eliminar tarea"
                    >
                      <IconoBasura />
                    </button>
                  </div>
                ))
              )}
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}