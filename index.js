// SIMULADOR DE CITA ODONTOLÓGICA EN DENTISUR

// Constante servicios disponibles 
const servicios = [
    "Implantología Oral",
    "Rehabilitación Oral",
    "Ortodoncia"
  ];
  
  // Solicita el nombre del usuario
  let nombre = prompt("¡Hola! Bienvenido a DENTISUR. ¿Cuál es tu nombre?");
  
  console.log("Nombre del usuario:", nombre);
  
  // Muestra los servicios disponibles
  let mensajeServicios = "Selecciona el número del servicio que deseas:\n";
  for (let i = 0; i < servicios.length; i++) {
    mensajeServicios += `${i + 1}. ${servicios[i]}\n`;
  }
  
  // Elección del servicio
  let seleccion = prompt(mensajeServicios);
  let servicioElegido = servicios[parseInt(seleccion) - 1];
  
  console.log("Servicio seleccionado:", servicioElegido);
  
  // Confirmación para agendar cita
  let confirmar = confirm(`¿Deseas agendar una cita para ${servicioElegido}, ${nombre}?`);
  
  if (confirmar) {
    alert(`¡Perfecto, ${nombre}! Tu cita para ${servicioElegido} ha sido agendada.`);
    console.log("Cita agendada con éxito.");
  } else {
    alert("No te preocupes, puedes agendar más tarde desde nuestra página.");
    console.log("El usuario no agendó cita.");
  }
  