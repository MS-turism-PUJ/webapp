export interface Producto {
    nombre: string; // Obligatorio
    categoria?: string; // Opcional
    descripcion?: string; // Opcional
    pais?: string; // Opcional
    ciudad?: string; // Opcional
    precio?: number; // Opcional
    latitud?: number; // Opcional
    longitud?: number; // Opcional
    fechaSalida?: string; // Opcional
    fechaLlegada?: string; // Opcional
    ruta?: string; // Opcional
    transporte?: string; // Opcional
}
