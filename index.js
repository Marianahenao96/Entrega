// SIMULADOR DE CITA ODONTOLÓGICA EN DENTISUR

// Clase para manejar las citas
class GestorCitas {
    constructor() {
        this.citas = JSON.parse(localStorage.getItem('citas')) || [];
        this.nombreInput = document.getElementById('nombre-paciente');
        this.servicioSelect = document.getElementById('servicio-seleccion');
        this.agendarBtn = document.getElementById('agendar-cita');
        this.listaCitas = document.getElementById('lista-citas');
        
        // Crear modal de confirmación
        this.crearModal();
        
        // Inicializar eventos
        this.inicializarEventos();
        // Mostrar citas existentes
        this.mostrarCitas();
    }

    crearModal() {
        const modal = document.createElement('div');
        modal.id = 'modal-confirmacion';
        modal.innerHTML = `
            <div class="modal-contenido">
                <h3>Confirmar Acción</h3>
                <p id="modal-mensaje"></p>
                <div class="modal-botones">
                    <button id="modal-confirmar">Confirmar</button>
                    <button id="modal-cancelar">Cancelar</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    mostrarModal(mensaje, onConfirm) {
        const modal = document.getElementById('modal-confirmacion');
        const mensajeElement = document.getElementById('modal-mensaje');
        const confirmarBtn = document.getElementById('modal-confirmar');
        const cancelarBtn = document.getElementById('modal-cancelar');

        mensajeElement.textContent = mensaje;
        modal.style.display = 'flex';

        const limpiarEventos = () => {
            confirmarBtn.removeEventListener('click', confirmarHandler);
            cancelarBtn.removeEventListener('click', cancelarHandler);
        };

        const confirmarHandler = () => {
            onConfirm();
            modal.style.display = 'none';
            limpiarEventos();
        };

        const cancelarHandler = () => {
            modal.style.display = 'none';
            limpiarEventos();
        };

        confirmarBtn.addEventListener('click', confirmarHandler);
        cancelarBtn.addEventListener('click', cancelarHandler);
    }

    inicializarEventos() {
        this.agendarBtn.addEventListener('click', () => this.agendarCita());
    }

    agendarCita() {
        const nombre = this.nombreInput.value.trim();
        const servicio = this.servicioSelect.value;

        if (!nombre || !servicio) {
            this.mostrarModal('Por favor, completa todos los campos', () => {});
            return;
        }

        this.mostrarModal(
            `¿Deseas agendar una cita para ${servicio}, ${nombre}?`,
            () => {
                const cita = {
                    id: Date.now(),
                    nombre,
                    servicio,
                    fecha: new Date().toLocaleDateString(),
                    confirmada: false
                };

                this.citas.push(cita);
                this.guardarCitas();
                this.mostrarCitas();
                this.limpiarFormulario();
                
                // Mostrar confirmación de éxito
                this.mostrarModal('¡Cita agendada con éxito!', () => {});
            }
        );
    }

    guardarCitas() {
        localStorage.setItem('citas', JSON.stringify(this.citas));
    }

    mostrarCitas() {
        this.listaCitas.innerHTML = '';
        
        this.citas.forEach(cita => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${cita.nombre}</strong> - ${cita.servicio}
                <br>
                <small>Agendada el: ${cita.fecha}</small>
                <div class="cita-acciones">
                    ${!cita.confirmada ? 
                        `<button onclick="gestorCitas.confirmarCita(${cita.id})" class="btn-confirmar">Confirmar</button>` :
                        `<span class="cita-confirmada">✓ Confirmada</span>`
                    }
                    <button onclick="gestorCitas.eliminarCita(${cita.id})" class="btn-eliminar">Eliminar</button>
                </div>
            `;
            this.listaCitas.appendChild(li);
        });
    }

    confirmarCita(id) {
        this.mostrarModal(
            '¿Deseas confirmar esta cita?',
            () => {
                const cita = this.citas.find(c => c.id === id);
                if (cita) {
                    cita.confirmada = true;
                    this.guardarCitas();
                    this.mostrarCitas();
                }
            }
        );
    }

    eliminarCita(id) {
        const cita = this.citas.find(c => c.id === id);
        this.mostrarModal(
            `¿Estás seguro de que deseas eliminar la cita de ${cita.nombre} para ${cita.servicio}?`,
            () => {
                this.citas = this.citas.filter(cita => cita.id !== id);
                this.guardarCitas();
                this.mostrarCitas();
            }
        );
    }

    limpiarFormulario() {
        this.nombreInput.value = '';
        this.servicioSelect.value = '';
    }
}

// Inicializar el gestor de citas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.gestorCitas = new GestorCitas();
});
  