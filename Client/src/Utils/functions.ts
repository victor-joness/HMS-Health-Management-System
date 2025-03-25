export function converterStringParaData(dataString: string) {
  const partes = dataString.split(' ')
  const dataPartes = partes[0].split('/')
  const horaPartes = partes[1].split(':')

  const dia = parseInt(dataPartes[0])
  const mes = parseInt(dataPartes[1])
  const ano = parseInt(dataPartes[2])
  const hora = parseInt(horaPartes[0])
  const minutos = parseInt(horaPartes[1])
  const segundos = parseInt(horaPartes[2])

  return { ano, mes, dia, hora, minutos, segundos }
}
