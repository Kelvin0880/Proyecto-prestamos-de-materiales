//codigo js para menu en vista admin

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
//redirreccion entre paginas
document.addEventListener("DOMContentLoaded", function () {
    const enlaces = document.querySelectorAll(".menu .enlace");

    // Diccionario que mapea "data-vista" con la página real
    const paginas = {
        "inicio": "admin.html",
        "materiales": "gestion_materiales.html",
        "prestamos": "prestamos.html",
        "reportes": "reportes.html",
        "solicitudes": "solicitudes.html"
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



// inicio
document.addEventListener("DOMContentLoaded", function() {
    // Simulación de datos (luego puedes conectarlo a una API o base de datos)
    let solicitudesPendientes = 5;
    let prestamosActivos = 12;
    let prestamosVencidos = 3;

    // Mostrar datos en la página
    document.getElementById("solicitudesPendientes").innerText = solicitudesPendientes + " pendientes";
    document.getElementById("prestamosActivos").innerText = prestamosActivos + " en curso";
    document.getElementById("prestamosVencidos").innerText = prestamosVencidos + " vencidos";
});

// Gestion de Materiales
document.addEventListener("DOMContentLoaded", function() {
    const tablaMateriales = document.getElementById("tabla-materiales");
    const formAgregarMaterial = document.getElementById("formAgregarMaterial");

    let materiales = [
        { id: 1, nombre: "Laptop Dell", categoria: "Equipos Electrónicos", cantidad: 5 },
        { id: 2, nombre: "Libro de Matemáticas", categoria: "Libros", cantidad: 10 },
        { id: 3, nombre: "Destornillador", categoria: "Herramientas", cantidad: 7 }
    ];

    function actualizarTabla() {
        tablaMateriales.innerHTML = "";
        materiales.forEach((material, index) => {
            let fila = `<tr>
                <td>${material.id}</td>
                <td>${material.nombre}</td>
                <td>${material.categoria}</td>
                <td>${material.cantidad}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editarMaterial(${index})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarMaterial(${index})">Eliminar</button>
                </td>
            </tr>`;
            tablaMateriales.innerHTML += fila;
        });
    }

    formAgregarMaterial.addEventListener("submit", function(event) {
        event.preventDefault();
        let nuevoMaterial = {
            id: materiales.length + 1,
            nombre: document.getElementById("nombreMaterial").value,
            categoria: document.getElementById("categoriaMaterial").value,
            cantidad: parseInt(document.getElementById("cantidadMaterial").value)
        };
        materiales.push(nuevoMaterial);
        actualizarTabla();
        formAgregarMaterial.reset();
        bootstrap.Modal.getInstance(document.getElementById("modalAgregarMaterial")).hide();
    });

    window.editarMaterial = function(index) {
        let material = materiales[index];
        let nuevoNombre = prompt("Nuevo nombre:", material.nombre);
        let nuevaCantidad = prompt("Nueva cantidad:", material.cantidad);
        if (nuevoNombre && nuevaCantidad) {
            materiales[index].nombre = nuevoNombre;
            materiales[index].cantidad = parseInt(nuevaCantidad);
            actualizarTabla();
        }
    };

    window.eliminarMaterial = function(index) {
        if (confirm("¿Seguro que deseas eliminar este material?")) {
            materiales.splice(index, 1);
            actualizarTabla();
        }
    };

    actualizarTabla();
});

// Prestamos de Materiales
// Datos temporales (esto se debe reemplazar con datos de una base de datos en el futuro)
const materiales = [
    { id: 1, nombre: "Laptop HP" },
    { id: 2, nombre: "Proyector Epson" },
    { id: 3, nombre: "Libro de Redes" }
];

const usuarios = [
    { id: 101, nombre: "Juan Pérez" },
    { id: 102, nombre: "María Gómez" },
    { id: 103, nombre: "Carlos Ramírez" }
];

const prestamos = [];

// 🔹 Cargar materiales y usuarios en los select del modal
document.addEventListener("DOMContentLoaded", () => {
    cargarOpciones("materialPrestamo", materiales);
    cargarOpciones("usuarioPrestamo", usuarios);
    actualizarTabla();
});

// 🔹 Función para llenar selects dinámicamente
function cargarOpciones(idSelect, lista) {
    const select = document.getElementById(idSelect);
    lista.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.nombre;
        select.appendChild(option);
    });
}

// 🔹 Manejo del formulario de préstamos
document.getElementById("formAgregarPrestamo").addEventListener("submit", function(event) {
    event.preventDefault();

    const materialId = parseInt(document.getElementById("materialPrestamo").value);
    const usuarioId = parseInt(document.getElementById("usuarioPrestamo").value);
    const fechaPrestamo = document.getElementById("fechaPrestamo").value;
    const fechaDevolucion = document.getElementById("fechaDevolucion").value;

    if (!materialId || !usuarioId || !fechaPrestamo || !fechaDevolucion) {
        alert("Todos los campos son obligatorios");
        return;
    }

    const nuevoPrestamo = {
        id: prestamos.length + 1,
        material: materiales.find(m => m.id === materialId).nombre,
        usuario: usuarios.find(u => u.id === usuarioId).nombre,
        fechaPrestamo,
        fechaDevolucion,
        estado: "Pendiente"
    };

    prestamos.push(nuevoPrestamo);
    actualizarTabla();
    document.getElementById("formAgregarPrestamo").reset();
    bootstrap.Modal.getInstance(document.getElementById("modalAgregarPrestamo")).hide();
});

// 🔹 Función para actualizar la tabla de préstamos
function actualizarTabla() {
    const tbody = document.getElementById("tabla-prestamos");
    tbody.innerHTML = "";

    prestamos.forEach(prestamo => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${prestamo.id}</td>
            <td>${prestamo.material}</td>
            <td>${prestamo.usuario}</td>
            <td>${prestamo.fechaPrestamo}</td>
            <td>${prestamo.fechaDevolucion}</td>
            <td class="${prestamo.estado === 'Devuelto' ? 'text-success' : 'text-warning'}">${prestamo.estado}</td>
            <td>
                ${prestamo.estado === "Pendiente"
                    ? `<button class="btn btn-sm btn-success" onclick="devolverPrestamo(${prestamo.id})">Devolver</button>`
                    : `<span class="text-muted">Finalizado</span>`}
            </td>
        `;
        tbody.appendChild(fila);
    });
}

// 🔹 Función para marcar un préstamo como devuelto
function devolverPrestamo(id) {
    const prestamo = prestamos.find(p => p.id === id);
    if (prestamo) {
        prestamo.estado = "Devuelto";
        actualizarTabla();
    }
}

//reportes
// Simulación de datos de préstamos

// 🔹 Calcular cantidad de préstamos activos y devueltos
(function () {
    document.addEventListener("DOMContentLoaded", function () {
        // Lista de préstamos simulada
        const prestamos = [
            { material: "Laptop HP", usuario: "Juan Pérez", estado: "Pendiente" },
            { material: "Proyector Epson", usuario: "María Gómez", estado: "Devuelto" },
            { material: "Libro de Redes", usuario: "Carlos Ramírez", estado: "Pendiente" },
            { material: "Laptop HP", usuario: "Juan Pérez", estado: "Devuelto" },
            { material: "Proyector Epson", usuario: "María Gómez", estado: "Devuelto" }
        ];

        // Verificar si los elementos existen antes de modificar el DOM
        const prestamosActivosEl = document.getElementById("prestamosActivos");
        const prestamosDevueltosEl = document.getElementById("prestamosDevueltos");
        const totalPrestamosEl = document.getElementById("totalPrestamos");
        const tablaMaterialesEl = document.getElementById("tabla-materiales");
        const tablaUsuariosEl = document.getElementById("tabla-usuarios");

        if (!prestamosActivosEl || !prestamosDevueltosEl || !totalPrestamosEl || !tablaMaterialesEl || !tablaUsuariosEl) {
            console.warn("No se encontraron algunos elementos del reporte. Verifica que estén en el HTML.");
            return;
        }

        // 🔹 Calcular cantidad de préstamos activos y devueltos
        function calcularReportes() {
            const prestamosActivos = prestamos.filter(p => p.estado === "Pendiente").length;
            const prestamosDevueltos = prestamos.filter(p => p.estado === "Devuelto").length;
            const totalPrestamos = prestamos.length;

            prestamosActivosEl.textContent = prestamosActivos;
            prestamosDevueltosEl.textContent = prestamosDevueltos;
            totalPrestamosEl.textContent = totalPrestamos;
        }

        // 🔹 Calcular materiales más prestados
        function calcularMateriales() {
            const conteoMateriales = {};

            prestamos.forEach(p => {
                conteoMateriales[p.material] = (conteoMateriales[p.material] || 0) + 1;
            });

            tablaMaterialesEl.innerHTML = "";
            Object.entries(conteoMateriales).forEach(([material, cantidad]) => {
                const fila = `<tr><td>${material}</td><td>${cantidad}</td></tr>`;
                tablaMaterialesEl.innerHTML += fila;
            });
        }

        // 🔹 Calcular usuarios con más préstamos
        function calcularUsuarios() {
            const conteoUsuarios = {};

            prestamos.forEach(p => {
                conteoUsuarios[p.usuario] = (conteoUsuarios[p.usuario] || 0) + 1;
            });

            tablaUsuariosEl.innerHTML = "";
            Object.entries(conteoUsuarios).forEach(([usuario, cantidad]) => {
                const fila = `<tr><td>${usuario}</td><td>${cantidad}</td></tr>`;
                tablaUsuariosEl.innerHTML += fila;
            });
        }

        // Ejecutar las funciones
        calcularReportes();
        calcularMateriales();
        calcularUsuarios();
    });
})();


//solicitudes
// Simulación de solicitudes
let solicitudes = [
    { id: 1, usuario: "Juan Pérez", material: "Laptop HP", fecha: "2025-02-10", estado: "Pendiente" },
    { id: 2, usuario: "María Gómez", material: "Proyector Epson", fecha: "2025-02-12", estado: "Pendiente" },
    { id: 3, usuario: "Carlos Ramírez", material: "Libro de Redes", fecha: "2025-02-14", estado: "Aprobado" }
];

// Función para renderizar la tabla de solicitudes
function cargarSolicitudes() {
    const tabla = document.getElementById("tabla-solicitudes");
    tabla.innerHTML = "";

    solicitudes.forEach((solicitud, index) => {
        const fila = `
            <tr>
                <td>${solicitud.id}</td>
                <td>${solicitud.usuario}</td>
                <td>${solicitud.material}</td>
                <td>${solicitud.fecha}</td>
                <td><span class="badge ${solicitud.estado === "Pendiente" ? "bg-warning" : "bg-success"}">${solicitud.estado}</span></td>
                <td>
                    ${solicitud.estado === "Pendiente" 
                        ? `<button class="btn btn-success btn-sm" onclick="cambiarEstado(${index}, 'Aprobado')">✔ Aprobar</button>
                        <button class="btn btn-danger btn-sm" onclick="cambiarEstado(${index}, 'Rechazado')">✖ Rechazar</button>` 
                        : `<span class="text-muted">Procesado</span>`}
                </td>
            </tr>
        `;
        tabla.innerHTML += fila;
    });
}

// Función para cambiar el estado de una solicitud
function cambiarEstado(index, nuevoEstado) {
    solicitudes[index].estado = nuevoEstado;
    cargarSolicitudes(); // Recargar la tabla
}

// Cargar solicitudes al iniciar la página
document.addEventListener("DOMContentLoaded", cargarSolicitudes);

