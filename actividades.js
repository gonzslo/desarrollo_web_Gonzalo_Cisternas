document.addEventListener("DOMContentLoaded", () => {
  const filas = document.querySelectorAll("#tabla-actividades tbody tr");
  const detalleDiv = document.getElementById("detalle-actividad");

  filas.forEach(fila => {
    fila.addEventListener("click", () => {
      const datos = fila.querySelectorAll("td");
      const id = fila.getAttribute('data-id');
      const totalFotos = parseInt(datos[6].innerText, 10); // Obtener el total de fotos de la actividad

      // Crear un array de fotos según el total de fotos de la actividad
      const fotos = [];
      for (let i = 1; i <= totalFotos; i++) {
        fotos.push(`img/actividad${id}_${i}.jpeg`);
      }

      // Crear el HTML para las fotos, solo las fotos disponibles
      let fotoHtml = fotos.map(foto => {
        return `<img src="${foto}" width="320" height="240" class="foto-pequena" />`;
      }).join('');

      detalleDiv.innerHTML = `
        <h2>Detalle de Actividad</h2>
        <p><strong>Inicio:</strong> ${datos[0].innerText}</p>
        <p><strong>Término:</strong> ${datos[1].innerText}</p>
        <p><strong>Comuna:</strong> ${datos[2].innerText}</p>
        <p><strong>Sector:</strong> ${datos[3].innerText}</p>
        <p><strong>Tema:</strong> ${datos[4].innerText}</p>
        <p><strong>Organizador:</strong> ${datos[5].innerText}</p>
        <p><strong>Total fotos:</strong> ${totalFotos}</p>
        <div id="fotos-detalle">${fotoHtml}</div>
        <div id="ampliada" style="display:none;">
          <img src="" id="foto-ampliada" width="800" height="600"><br>
          <button onclick="document.getElementById('ampliada').style.display='none'">Cerrar</button>
        </div>
        <br>
        <a href="actividades.html">Volver al listado</a> |
        <a href="index.html">Volver a la portada</a>
      `;

      // Mostrar la foto ampliada al hacer clic
      document.querySelectorAll(".foto-pequena").forEach(foto => {
        foto.addEventListener("click", (e) => {
          const fotoAmpliada = document.getElementById("foto-ampliada");
          fotoAmpliada.src = e.target.src;
          document.getElementById("ampliada").style.display = "block";
        });
      });

      detalleDiv.style.display = "block";
    });
  });
});
