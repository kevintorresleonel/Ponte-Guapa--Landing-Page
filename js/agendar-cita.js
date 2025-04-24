document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.querySelectorAll('.agregar');
    const botonesEliminar = document.querySelectorAll('.eliminar');
    const listaServicios = document.getElementById('lista-servicios');
    const totalTexto = document.querySelector('.total p:last-child');
    const botonContinuar = document.querySelector('.continuar');
  
    let total = 0;
    let serviciosSeleccionados = [];
  
    botonesAgregar.forEach(boton => {
      boton.addEventListener('click', () => {
        const nombre = boton.dataset.nombre;
        const precio = parseInt(boton.dataset.precio);
  
        const yaAgregado = serviciosSeleccionados.find(serv => serv.nombre === nombre);
        if (yaAgregado) return;
  
        const li = document.createElement('li');
        li.setAttribute('data-nombre', nombre);
        li.textContent = `${nombre} - $${precio.toLocaleString()}`;
        listaServicios.appendChild(li);
  
        total += precio;
        totalTexto.textContent = `$${total.toLocaleString()}`;
  
        serviciosSeleccionados.push({ nombre, precio });
      });
    });
  
    botonesEliminar.forEach(boton => {
      boton.addEventListener('click', () => {
        const nombre = boton.dataset.nombre;
  
        // Eliminar del array
        const index = serviciosSeleccionados.findIndex(serv => serv.nombre === nombre);
        if (index !== -1) {
          total -= serviciosSeleccionados[index].precio;
          serviciosSeleccionados.splice(index, 1);
        }
  
        // Eliminar del resumen visual
        const elementos = listaServicios.querySelectorAll('li');
        elementos.forEach(el => {
          if (el.dataset.nombre === nombre) {
            listaServicios.removeChild(el);
          }
        });
  
        // Actualizar total
        totalTexto.textContent = `$${total.toLocaleString()}`;
      });
    });
  
    botonContinuar.addEventListener('click', (e) => {
      e.preventDefault();
  
      localStorage.setItem('servicios', JSON.stringify(serviciosSeleccionados));
      localStorage.setItem('total', total);
  
      window.location.href = 'elegir-horario.html';
    });
  });
  