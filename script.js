/* =========================================================
   RELOJERÍA YAMPIER - Funcionalidades JavaScript
   1. Datos del negocio (completar con datos reales)
   2. Catálogo de productos
   3. Referencias a elementos del DOM
   4. Funciones de contacto (WhatsApp e Instagram)
   5. Funciones del catálogo
   6. Filtro por categoría
   7. Menú para celulares
   8. Datos de contacto y año del pie
   9. Inicio
   ========================================================= */


/* ---------- 1. DATOS DEL NEGOCIO ----------
   Completá estos valores con información real. Si un dato queda vacío (""),
   la página no lo muestra. Mientras no haya WhatsApp, los botones de consulta
   llevan al perfil de Instagram. */
const datosNegocio = {
    // Código de país + código de área + número, solo dígitos, sin "+", espacios ni guiones.
    // Ejemplo de formato para Argentina: "5493511234567"
    whatsapp: "",
    // Usuario de Instagram sin "@". Ejemplo de formato: "relojeriayampier"
    instagram: "relojeriayampier",
    // Ejemplo de formato: "Calle 123, Ciudad"
    direccion: "",
    // Ejemplo de formato: "Lunes a viernes de 9 a 18 h"
    horario: ""
};


/* ---------- 2. CATÁLOGO DE PRODUCTOS ----------
   Cada producto es un objeto con estas propiedades:
   - nombre:      texto que se muestra como título.
   - categoria:   "clasico", "deportivo" o "casual" (debe coincidir con los botones de filtro).
   - precio:      número sin puntos (ej: 185000) o null para mostrar "Precio a confirmar".
   - descripcion: texto breve.
   - imagen:      ruta relativa de la imagen dentro de la carpeta img/. Ej: "img/clasico-elegance.jpg".
                  Para usar una foto propia, guardala en img/ y escribí su nombre, ej: "img/mi-reloj.jpg".
   - alt:         descripción de la imagen para lectores de pantalla.

   AGREGAR un producto: copiá un objeto completo { ... }, pegalo dentro del array
   separado por una coma y cambiá sus valores.
   ELIMINAR un producto: borrá su objeto completo, incluida la coma que lo separa.
   MODIFICAR un producto: cambiá el valor de la propiedad que necesites.

   IMPORTANTE: los nombres y precios son DE EJEMPLO y deben reemplazarse.
   Para cambiar una foto, reemplazá el archivo en img/ o cambiá la ruta en "imagen". */
const productos = [
    {
        nombre: "Clásico Elegance",
        categoria: "clasico",
        precio: 185000,
        descripcion: "Diseño atemporal de líneas limpias, pensado para uso diario y ocasiones formales.",
        imagen: "img/clasico-elegance.jpg",
        alt: "Reloj plateado con esfera blanca, números romanos y correa de cuero marrón"
    },
    {
        nombre: "Clásico Minimal",
        categoria: "clasico",
        precio: null,
        descripcion: "Esfera sencilla y estética sobria para quienes prefieren un estilo discreto.",
        imagen: "img/clasico-minimal.jpg",
        alt: "Reloj minimalista con esfera azul y malla de acero plateada"
    },
    {
        nombre: "Deportivo Urban",
        categoria: "deportivo",
        precio: 142000,
        descripcion: "Estilo robusto y moderno para acompañar una rutina activa.",
        imagen: "img/deportivo-urban.jpg",
        alt: "Reloj de acero con esfera negra, números grandes y pulsera metálica"
    },
    {
        nombre: "Deportivo Cronógrafo",
        categoria: "deportivo",
        precio: 210000,
        descripcion: "Diseño de inspiración deportiva con una presencia marcada en la muñeca.",
        imagen: "img/deportivo-cronografo.jpg",
        alt: "Reloj negro con números romanos, tres subesferas y correa de cuero negro"
    },
    {
        nombre: "Casual Daily",
        categoria: "casual",
        precio: 98000,
        descripcion: "Versátil y cómodo, fácil de combinar con la ropa de todos los días.",
        imagen: "img/casual-daily.jpg",
        alt: "Reloj con esfera azul oscuro y correa de cuero marrón claro"
    },
    {
        nombre: "Casual Weekend",
        categoria: "casual",
        precio: null,
        descripcion: "Esfera negra y pulsera de acero: una opción versátil para el fin de semana o para regalar.",
        imagen: "img/casual-weekend.jpg",
        alt: "Reloj de acero con esfera negra y pulsera metálica"
    }
];

// Nombres que se muestran en pantalla para cada categoría
const nombresCategorias = {
    clasico: "Clásico",
    deportivo: "Deportivo",
    casual: "Casual"
};


/* ---------- 3. REFERENCIAS A ELEMENTOS DEL DOM ---------- */
const listaProductos = document.getElementById("lista-productos");
const mensajeVacio = document.getElementById("mensaje-vacio");
const botonesFiltro = document.querySelectorAll(".filtro");
const botonMenu = document.getElementById("boton-menu");
const menuPrincipal = document.getElementById("menu-principal");
const enlacesMenu = document.querySelectorAll(".menu a");


/* ---------- 4. FUNCIONES DE CONTACTO (WHATSAPP E INSTAGRAM) ---------- */

// Devuelve true si el número tiene solo dígitos y entre 10 y 15 caracteres
function numeroWhatsAppEsValido(numero) {
    return /^\d{10,15}$/.test(numero);
}

// Arma el enlace de WhatsApp con un mensaje. Si el número no es válido devuelve ""
function crearEnlaceWhatsApp(mensaje) {
    if (!numeroWhatsAppEsValido(datosNegocio.whatsapp)) {
        return "";
    }
    // encodeURIComponent convierte espacios y acentos a un formato válido para una URL
    return "https://wa.me/" + datosNegocio.whatsapp + "?text=" + encodeURIComponent(mensaje);
}

// Arma el enlace al perfil de Instagram. Si el usuario no es válido devuelve ""
// (un usuario válido tiene solo letras, números, puntos y guiones bajos, máximo 30)
function crearEnlaceInstagram() {
    const usuario = datosNegocio.instagram.trim();
    if (!/^[A-Za-z0-9._]{1,30}$/.test(usuario)) {
        return "";
    }
    return "https://www.instagram.com/" + usuario + "/";
}

// Configura un botón de consulta:
// 1) si hay WhatsApp, abre WhatsApp con el mensaje;
// 2) si no, abre el perfil de Instagram;
// 3) si no hay ninguno de los dos, el botón se oculta.
function configurarBotonConsulta(enlace, mensaje) {
    const urlWhatsApp = crearEnlaceWhatsApp(mensaje);
    const urlInstagram = crearEnlaceInstagram();

    if (urlWhatsApp !== "") {
        enlace.href = urlWhatsApp;
        enlace.textContent = "Consultar por WhatsApp";
    } else if (urlInstagram !== "") {
        enlace.href = urlInstagram;
        enlace.textContent = "Consultar por Instagram";
    } else {
        enlace.hidden = true;
        return;
    }

    enlace.target = "_blank";              // abre en otra pestaña
    enlace.rel = "noopener noreferrer";    // buena práctica de seguridad al abrir otra pestaña
}


/* ---------- 5. FUNCIONES DEL CATÁLOGO ---------- */

// Convierte el precio numérico en texto. Ejemplo: 185000 -> "$ 185.000"
function formatearPrecio(precio) {
    if (typeof precio !== "number") {
        return "Precio a confirmar";
    }
    return "$ " + precio.toLocaleString("es-AR");
}

// Crea y devuelve el elemento <article> de una tarjeta de producto
function crearTarjetaProducto(producto) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "producto";

    // Imagen
    const contenedorImagen = document.createElement("div");
    contenedorImagen.className = "producto-imagen";

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.alt;
    imagen.loading = "lazy";   // la imagen se descarga cuando está cerca de verse

    // Si la imagen no carga, se quita y se muestra un aviso con CSS
    imagen.addEventListener("error", function () {
        imagen.remove();
        contenedorImagen.classList.add("sin-imagen");
        console.warn("No se pudo cargar la imagen de: " + producto.nombre);
    });

    contenedorImagen.appendChild(imagen);

    // Textos
    const cuerpo = document.createElement("div");
    cuerpo.className = "producto-cuerpo";

    const categoria = document.createElement("span");
    categoria.className = "producto-categoria";
    categoria.textContent = nombresCategorias[producto.categoria];

    const nombre = document.createElement("h3");
    nombre.className = "producto-nombre";
    nombre.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.className = "producto-precio";
    precio.textContent = formatearPrecio(producto.precio);

    const descripcion = document.createElement("p");
    descripcion.className = "producto-descripcion";
    descripcion.textContent = producto.descripcion;

    // Botón de consulta (el nombre del producto va en el mensaje de WhatsApp)
    const botonConsulta = document.createElement("a");
    botonConsulta.className = "boton boton-oscuro";
    configurarBotonConsulta(
        botonConsulta,
        "Hola, Relojería Yampier. Quisiera consultar por el reloj " + producto.nombre + "."
    );

    cuerpo.append(categoria, nombre, precio, descripcion, botonConsulta);
    tarjeta.append(contenedorImagen, cuerpo);

    return tarjeta;
}

// Vacía la grilla y muestra las tarjetas de los productos recibidos
function mostrarProductos(listaAMostrar) {
    listaProductos.textContent = "";

    listaAMostrar.forEach(function (producto) {
        listaProductos.appendChild(crearTarjetaProducto(producto));
    });

    // Si no hay productos para mostrar, aparece el mensaje
    mensajeVacio.hidden = listaAMostrar.length > 0;
}


/* ---------- 6. FILTRO POR CATEGORÍA ---------- */

function filtrarProductos(categoriaElegida) {
    if (categoriaElegida === "todos") {
        mostrarProductos(productos);
    } else {
        const productosFiltrados = productos.filter(function (producto) {
            return producto.categoria === categoriaElegida;
        });
        mostrarProductos(productosFiltrados);
    }
}

botonesFiltro.forEach(function (boton) {
    boton.addEventListener("click", function () {
        // Quita el estado activo de todos los botones...
        botonesFiltro.forEach(function (otroBoton) {
            otroBoton.classList.remove("activo");
            otroBoton.setAttribute("aria-pressed", "false");
        });
        // ...y se lo agrega solo al botón presionado
        boton.classList.add("activo");
        boton.setAttribute("aria-pressed", "true");

        // data-categoria="clasico" en el HTML se lee como boton.dataset.categoria
        filtrarProductos(boton.dataset.categoria);
    });
});


/* ---------- 7. MENÚ PARA CELULARES ---------- */

function cerrarMenu() {
    menuPrincipal.classList.remove("abierto");
    botonMenu.setAttribute("aria-expanded", "false");
    botonMenu.setAttribute("aria-label", "Abrir menú");
}

botonMenu.addEventListener("click", function () {
    // toggle agrega la clase si no está y la quita si está; devuelve true si quedó agregada
    const menuAbierto = menuPrincipal.classList.toggle("abierto");
    botonMenu.setAttribute("aria-expanded", menuAbierto);
    botonMenu.setAttribute("aria-label", menuAbierto ? "Cerrar menú" : "Abrir menú");
});

// Al elegir una sección, el menú se cierra
enlacesMenu.forEach(function (enlace) {
    enlace.addEventListener("click", cerrarMenu);
});


/* ---------- 8. DATOS DE CONTACTO Y AÑO DEL PIE ---------- */

// Muestra un dato de texto solo si no está vacío
function mostrarDatoSiExiste(valor, idElementoTexto, idContenedor) {
    if (valor.trim() === "") {
        return;
    }
    document.getElementById(idElementoTexto).textContent = valor;
    document.getElementById(idContenedor).hidden = false;
}

function mostrarDatosDeContacto() {
    const mensajeGeneral = "Hola, Relojería Yampier. Quisiera hacer una consulta.";

    configurarBotonConsulta(document.getElementById("boton-consulta-hero"), mensajeGeneral);
    configurarBotonConsulta(document.getElementById("boton-consulta-contacto"), mensajeGeneral);

    if (!numeroWhatsAppEsValido(datosNegocio.whatsapp)) {
        console.warn("Sin número de WhatsApp: los botones de consulta llevan a Instagram.");
    }

    const urlInstagram = crearEnlaceInstagram();
    if (urlInstagram !== "") {
        const enlaceInstagram = document.getElementById("enlace-instagram");
        enlaceInstagram.href = urlInstagram;
        enlaceInstagram.textContent = "@" + datosNegocio.instagram.trim();
        document.getElementById("dato-instagram").hidden = false;
    }

    mostrarDatoSiExiste(datosNegocio.direccion, "texto-direccion", "dato-direccion");
    mostrarDatoSiExiste(datosNegocio.horario, "texto-horario", "dato-horario");
}

function mostrarAnioActual() {
    document.getElementById("anio-actual").textContent = new Date().getFullYear();
}


/* ---------- 9. INICIO ---------- */
mostrarProductos(productos);
mostrarDatosDeContacto();
mostrarAnioActual();
