// Código para manejar el menú
const toggle = document.querySelector(".toggle");
const menuDashboard = document.querySelector(".menu-dashboard");
const iconoMenu = toggle.querySelector("i");
const enlacesMenu = document.querySelectorAll(".enlace");

menuDashboard.addEventListener("mouseenter", () => {
    menuDashboard.classList.add("open");
});

menuDashboard.addEventListener("mouseleave", () => {
    menuDashboard.classList.remove("open");
});

enlacesMenu.forEach(enlace => {
    enlace.addEventListener("click", () => {
        menuDashboard.classList.add("open");
        iconoMenu.classList.replace("bx-menu", "bx-x");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const enlaces = document.querySelectorAll(".menu .enlace");

    // Diccionario que mapea "data-vista" con la página real
    const paginas = {
        "inicio": "inicio_student.html",
        "solicitudes": "estado_solicitudes.html",
        "materiales": "materiales.html",
    };

    // Agregar evento de clic a cada enlace del menú
    enlaces.forEach(enlace => {
        enlace.addEventListener("click", function () {
            let vista = this.getAttribute("data-vista"); // Obtener data-vista
            let pagina = paginas[vista]; // Buscar la página en el diccionario

            if (pagina) {
                window.location.href = pagina; // Redirigir a la página
            } else {
                console.warn("Página no encontrada para: " + vista);
            }
        });

    });
});




// Datos de ejemplo
let materiales = JSON.parse(localStorage.getItem("materiales")) || [
    { titulo: "Introducción a Python", autor: "Guido van Rossum", genero: "Programación", disponibilidad: "Disponible" },
    { titulo: "Redes de Computadoras", autor: "Andrew Tanenbaum", genero: "Tecnología", disponibilidad: "Prestado" },
    { titulo: "Gestión de Bases de Datos", autor: "Elmasri & Navathe", genero: "Informática", disponibilidad: "Disponible" }
];

// Cargar materiales en la tabla
function cargarMateriales() {
    const tabla = document.getElementById("materialTable");
    tabla.innerHTML = "";

    materiales.forEach((mat, index) => {
        let row = `
            <tr>
                <td>${mat.titulo}</td>
                <td>${mat.autor}</td>
                <td>${mat.genero}</td>
                <td class="status">${mat.disponibilidad}</td>
                <td>
                    ${mat.disponibilidad === "Disponible" 
                        ? `<button class="btn btn-primary btn-sm loan-btn" onclick="solicitarPrestamo(${index})">Solicitar</button>` 
                        : `<button class="btn btn-secondary btn-sm" disabled>No disponible</button>`}
                    <button class="btn btn-warning btn-sm" onclick="editarMaterial(${index})">✏️</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarMaterial(${index})">🗑️</button>
                </td>
            </tr>
        `;
        tabla.innerHTML += row;
    });

    localStorage.setItem("materiales", JSON.stringify(materiales));
}

// Función para agregar o editar materiales
document.getElementById("guardarMaterial").addEventListener("click", function () {
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const genero = document.getElementById("genero").value;
    const disponibilidad = document.getElementById("disponibilidad").value;
    const editIndex = document.getElementById("editIndex").value;

    if (editIndex) {
        materiales[editIndex] = { titulo, autor, genero, disponibilidad };
    } else {
        materiales.push({ titulo, autor, genero, disponibilidad });
    }

    document.getElementById("editIndex").value = "";
    cargarMateriales();
    document.querySelector(".btn-close").click();
});

// Función para eliminar material
function eliminarMaterial(index) {
    if (confirm("¿Estás seguro de eliminar este material?")) {
        materiales.splice(index, 1);
        cargarMateriales();
    }
}

// Función para editar material
function editarMaterial(index) {
    document.getElementById("editIndex").value = index;
    document.getElementById("titulo").value = materiales[index].titulo;
    document.getElementById("autor").value = materiales[index].autor;
    document.getElementById("genero").value = materiales[index].genero;
    document.getElementById("disponibilidad").value = materiales[index].disponibilidad;
}

// Función para solicitar préstamo
function solicitarPrestamo(index) {
    alert(`📌 Solicitud enviada para: ${materiales[index].titulo}`);
    materiales[index].disponibilidad = "Prestado";
    cargarMateriales();
}

// Filtro de búsqueda
document.getElementById("searchInput").addEventListener("keyup", function () {
    const texto = this.value.toLowerCase();
    document.querySelectorAll("#materialTable tr").forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(texto) ? "" : "none";
    });
});

// Cargar materiales al iniciar
document.addEventListener("DOMContentLoaded", cargarMateriales);


