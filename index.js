// Simular fetch de servicios
function fakeFetchServicios() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        "Consulta odontológica general",
        "Limpieza dental",
        "Ortodoncia",
        "Blanqueamiento dental",
        "Extracción de muelas"
      ]);
    }, 300);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const selectServicio = document.getElementById("servicio");
  const formulario = document.getElementById("formulario-cita");
  const citaGuardadaDiv = document.getElementById("cita-guardada");
  const btnEliminarCita = document.getElementById("eliminar-cita");

  // Cargar servicios en el <select>
  fakeFetchServicios().then(servicios => {
    servicios.forEach(servicio => {
      const option = document.createElement("option");
      option.value = servicio;
      option.textContent = servicio;
      selectServicio.appendChild(option);
    });
  });

  // Mostrar cita guardada
  const citaAlmacenada = localStorage.getItem("cita");
  if (citaAlmacenada) {
    mostrarCita(JSON.parse(citaAlmacenada));
  }

  // Manejar formulario
  formulario.addEventListener("submit", e => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const servicio = selectServicio.value;

    const cita = { nombre, fecha, hora, servicio };
    localStorage.setItem("cita", JSON.stringify(cita));
    mostrarCita(cita);

    Swal.fire({
      icon: "success",
      title: "Cita reservada",
      text: "Tu cita fue guardada correctamente.",
      confirmButtonColor: "#3085d6"
    });

    formulario.reset();
  });

  // Mostrar cita en pantalla
  function mostrarCita(cita) {
    citaGuardadaDiv.innerHTML = `
      <p><strong>Nombre:</strong> ${cita.nombre}</p>
      <p><strong>Fecha:</strong> ${cita.fecha}</p>
      <p><strong>Hora:</strong> ${cita.hora}</p>
      <p><strong>Servicio:</strong> ${cita.servicio}</p>
    `;
    btnEliminarCita.style.display = "inline-block";
  }

  // Eliminar cita
  btnEliminarCita.addEventListener("click", () => {
    Swal.fire({
      title: "¿Eliminar cita?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6"
    }).then(result => {
      if (result.isConfirmed) {
        localStorage.removeItem("cita");
        citaGuardadaDiv.innerHTML = "";
        btnEliminarCita.style.display = "none";
        Swal.fire("Eliminada", "Tu cita ha sido eliminada.", "success");
      }
    });
  });
});
