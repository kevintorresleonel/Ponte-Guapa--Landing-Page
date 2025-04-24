document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const modal = document.getElementById('modal-login');
    const cerrarModal = document.querySelector('.cerrar-modal');
    const confirmarBtn = document.querySelector('.confirmar');
    const listaServicios = document.getElementById('servicios-lista');
    const totalSpan = document.getElementById('total');
    const horaSelect = document.getElementById('hora');
    const fechaInput = document.getElementById('fecha');
  
    // Cargar servicios del localStorage
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    const total = localStorage.getItem('total') || 0;
  
    servicios.forEach(servicio => {
      const li = document.createElement('li');
      li.textContent = `${servicio.nombre} - $${servicio.precio.toLocaleString()}`;
      listaServicios.appendChild(li);
    });
  
    totalSpan.textContent = parseInt(total).toLocaleString();
  
    // Rellenar horas disponibles
    for (let h = 9; h <= 16; h++) {
      const option = document.createElement('option');
      option.value = `${h}:00`;
      option.textContent = `${h}:00`;
      horaSelect.appendChild(option);
    }
  
    // Establecer fecha mínima como hoy
    const hoy = new Date().toISOString().split("T")[0];
    fechaInput.min = hoy;
  
    // Manejo del evento click en el botón confirmar
    confirmarBtn.addEventListener('click', () => {
      const fecha = fechaInput.value;
      const hora = horaSelect.value;
  
      if (!fecha || !hora) {
        alert("Por favor selecciona una fecha y hora.");
        return;
      }
  
      // Verificar login
      const estaLogueado = localStorage.getItem('usuarioLogueado'); // null si no existe
  
      if (!estaLogueado) {
        modal.style.display = 'flex';
        return;
      }
  
      alert(`Cita agendada para el ${fecha} a las ${hora}`);
    });
  
    // Cerrar modal
    cerrarModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  });