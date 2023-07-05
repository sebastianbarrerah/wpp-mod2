

export const ahora = luxon.DateTime.now();
export const fecha = ahora.toLocaleString();
export const diaSemana = ahora.weekdayLong;
export const hora = luxon.DateTime.local().toLocaleString(luxon.DateTime.TIME_SIMPLE);
export const ultimoTiempo = ahora.toRelative();

// console.log('Fecha:', fecha);
// console.log('Día de la semana:', diaSemana);
// console.log('hora:', hora);
// console.log('Hora actual:', ultimoTiempo);