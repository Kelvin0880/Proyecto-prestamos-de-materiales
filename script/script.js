
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "admin") {
        localStorage.setItem("userRole", "admin");
        window.location.href = "admin_views/admin.html";
    } else {
        localStorage.setItem("userRole", "student");
        window.location.href = "student_views/inicio_student.html";
    }
});

/*document.addEventListener("DOMContentLoaded", function () {
    cargarMateriales();
    cargarMisPrestamos();
    cargarMaterialesAdmin();
    cargarSolicitudes();
});

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    if (username === "admin" && password === "admin123") {
        localStorage.setItem("userRole", "admin");
        window.location.href = "admin.html";
    } else {
        localStorage.setItem("userRole", "student");
        window.location.href = "student.html";
    }
});

function cargarMateriales() {
    let lista = document.getElementById("materiales-list");
    if (lista) {
        lista.innerHTML = `
            <tr>
                <td>Libro de Álgebra</td>
                <td>Libros</td>
                <td>Disponible</td>
                <td><button class="btn btn-success" onclick="solicitarPrestamo('Libro de Álgebra')">Solicitar</button></td>
            </tr>
        `;
    }
}

function cargarMisPrestamos() {
    let lista = document.getElementById("mis-prestamos");
    if (lista) {
        lista.innerHTML = `
            <tr>
                <td>Calculadora Científica</td>
                <td>01/02/2025</td>
                <td>En proceso</td>
            </tr>
        `;
    }
}

function solicitarPrestamo(material) {
    alert(`Solicitud enviada para: ${material}`);
}

function cargarMaterialesAdmin() {
    let lista = document.getElementById("admin-materiales");
    if (lista) {
        lista.innerHTML = `
            <tr>
                <td>Libro de Física</td>
                <td>Libros</td>
                <td>Disponible</td>
                <td><button class="btn btn-danger" onclick="eliminarMaterial('Libro de Física')">Eliminar</button></td>
            </tr>
        `;
    }
}

function cargarSolicitudes() {
    let lista = document.getElementById("solicitudes");
    if (lista) {
        lista.innerHTML = `
            <tr>
                <td>Juan Pérez</td>
                <td>Calculadora Científica</td>
                <td>01/02/2025</td>
                <td>
                    <button class="btn btn-success" onclick="aprobarSolicitud()">Aprobar</button>
                    <button class="btn btn-danger" onclick="rechazarSolicitud()">Rechazar</button>
                </td>
            </tr>
        `;
    }
}

function agregarMaterial() {
    alert("Función para agregar material en desarrollo...");
}

function eliminarMaterial(material) {
    alert(`Material eliminado: ${material}`);
}

function aprobarSolicitud() {
    alert("Solicitud aprobada");
}

function rechazarSolicitud() {
    alert("Solicitud rechazada");
}

function logout() {
    localStorage.removeItem("userRole");
    window.location.href = "index.html";
}
*/