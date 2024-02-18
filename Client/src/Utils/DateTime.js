export default function getDataFormatada() {
  const dataAtual = new Date();
  const dia = dataAtual.getDate();
  const mes = dataAtual.getMonth() + 1;
  const ano = dataAtual.getFullYear();
  const horas = dataAtual.getHours();
  const minutos = dataAtual.getMinutes();
  const segundos = dataAtual.getSeconds();

  return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
}

export function converterStringParaData(dataString) {
    const partes = dataString.split(' ');
    const dataPartes = partes[0].split('/');
    const horaPartes = partes[1].split(':');
    
    const dia = parseInt(dataPartes[0]);
    const mes = parseInt(dataPartes[1]); // Os meses em JavaScript são indexados a partir de 0
    const ano = parseInt(dataPartes[2]);
    const hora = parseInt(horaPartes[0]);
    const minutos = parseInt(horaPartes[1]);
    const segundos = parseInt(horaPartes[2]);
    
  return {ano, mes, dia, hora, minutos, segundos};
  }