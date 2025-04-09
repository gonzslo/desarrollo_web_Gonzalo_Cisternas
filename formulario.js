document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("actividadForm");
  const agregarFotoBtn = document.getElementById("agregarFoto");
  const fotoExtraDiv = document.getElementById("foto-extra");
  const redes = document.getElementById("redes");
  const contactoExtraDiv = document.getElementById("contacto-extra");
  const tema = document.getElementById("tema");
  const temaOtroDiv = document.getElementById("tema-otro");
  const enviarBtn = document.getElementById("enviar");
  const confirmBox = document.getElementById("mensaje-confirmacion");
  const mensajeFinal = document.getElementById("mensaje-final");
  const inicioInput = document.getElementById("inicio");
  const terminoInput = document.getElementById("termino");

  // Prellenar fecha de inicio con la fecha y hora actual
  const fechaActual = new Date();
  const fechaInicio = fechaActual.toISOString().slice(0, 16); // Formato: YYYY-MM-DDTHH:MM
  inicioInput.value = fechaInicio;

  // Prellenar fecha de término con la fecha y hora actual + 3 horas
  const fechaTermino = new Date(fechaActual.getTime() + 3 * 60 * 60 * 1000); // Agregar 3 horas
  const fechaTerminoFormat = fechaTermino.toISOString().slice(0, 16); // Formato: YYYY-MM-DDTHH:MM
  terminoInput.value = fechaTerminoFormat;

  let fotoCount = 1;
  agregarFotoBtn.addEventListener("click", () => {
    if (fotoCount < 5) {
      fotoCount++;
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.name = "foto" + fotoCount;
      fotoExtraDiv.appendChild(input);
    } else {
      alert("Máximo 5 fotos permitidas.");
    }
  });

  redes.addEventListener("change", () => {
    contactoExtraDiv.innerHTML = ""; // Limpiar los inputs anteriores
    const selectedOptions = Array.from(redes.selectedOptions);
    
    // Limitar a un máximo de 5 opciones seleccionadas
    selectedOptions.slice(0, 5).forEach(option => {
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "ID o URL de " + option.value.charAt(0).toUpperCase() + option.value.slice(1);
      input.minLength = 4;
      input.maxLength = 50;
      input.required = true; // Asegurarse de que el campo sea obligatorio
      contactoExtraDiv.appendChild(input);
      contactoExtraDiv.appendChild(document.createElement("br"));
    });
  });

  tema.addEventListener("change", () => {
    temaOtroDiv.innerHTML = "";
    if (tema.value === "otro") {
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Describa el tema";
      input.minLength = 3;
      input.maxLength = 15;
      temaOtroDiv.appendChild(input);
    }
  });

  enviarBtn.addEventListener("click", () => {
    if (validarFormulario()) {
      form.style.display = "none";
      confirmBox.style.display = "block";
    }
  });

  document.getElementById("confirmar").addEventListener("click", () => {
    confirmBox.style.display = "none";
    mensajeFinal.style.display = "block";
  });

  document.getElementById("cancelar").addEventListener("click", () => {
    confirmBox.style.display = "none";
    form.style.display = "block";
  });

  function validarFormulario() {
    const region = document.getElementById("region").value;
    const comuna = document.getElementById("comuna").value;
    const sector = document.getElementById("sector").value;
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const celular = document.getElementById("celular").value;
    const inicio = document.getElementById("inicio").value;
    const termino = document.getElementById("termino").value;
    const descripcion = document.getElementById("descripcion").value;
    const fotos = fotoExtraDiv.querySelectorAll('input[type="file"]');
    const temaValue = tema.value;

    // Validación Región y Comuna
    if (!region) {
      alert("Debe seleccionar una región.");
      return false;
    }
    if (!comuna) {
      alert("Debe seleccionar una comuna.");
      return false;
    }

    // Validación Sector
    if (sector.length > 100) {
      alert("El sector no puede exceder los 100 caracteres.");
      return false;
    }

    // Validación Nombre
    if (!nombre || nombre.length > 200) {
      alert("El nombre es obligatorio y no debe superar los 200 caracteres.");
      return false;
    }

    // Validación Email
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email || !emailRegex.test(email) || email.length > 100) {
      alert("Debe ingresar un email válido y con un máximo de 100 caracteres.");
      return false;
    }

    // Validación Celular
    const telRegex = /^\+\d{3}\.\d{8}$/;
    if (celular && !telRegex.test(celular)) {
      alert("Número de celular inválido. Use formato +569.12345678.");
      return false;
    }

    // Validación Contacto por Redes Sociales
    const contactoInputs = contactoExtraDiv.querySelectorAll('input[type="text"]');
    if (contactoInputs.length > 5) {
      alert("Máximo 5 opciones de contacto.");
      return false;
    }

    for (let input of contactoInputs) {
      if (input.value.length < 4 || input.value.length > 50) {
        alert("El ID o URL de la red social debe tener entre 4 y 50 caracteres.");
        return false;
      }
    }

    // Validación Fecha de Inicio
    if (!inicio) {
      alert("Debe ingresar una fecha y hora de inicio.");
      return false;
    }

    // Validación Fecha de Término
    if (termino && termino <= inicio) {
      alert("La fecha de término debe ser posterior al inicio.");
      return false;
    }

    // Validación Descripción
    if (descripcion.length > 500) {
      alert("La descripción no puede exceder los 500 caracteres.");
      return false;
    }

    // Validación Tema
    if (!temaValue || (temaValue === "otro" && temaOtroDiv.querySelector('input').value.length < 3)) {
      alert("Debe seleccionar un tema o describirlo si es 'otro' (mínimo 3 caracteres).");
      return false;
    }

    // Validación Fotos
    if (fotos.length === 0) {
      alert("Debe cargar al menos una foto.");
      return false;
    }
    if (fotos.length > 5) {
      alert("No puede cargar más de 5 fotos.");
      return false;
    }

    return true;
  }
});
