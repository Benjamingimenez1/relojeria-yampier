# Relojería Yampier — Guía de estudio del proyecto

Materia: Taller de Desarrollo Web
Tecnologías: HTML5 semántico, CSS3 y JavaScript puro (Vanilla JS)

---

## 1. Propuesta de diseño y estructura

**Identidad visual.** La página busca transmitir elegancia y confianza con pocos recursos:

- **Paleta:** negro (`#0d0d0d`), gris oscuro (`#1a1a1a`), blanco, un fondo crema muy suave (`#f6f4ef`) y un dorado discreto (`#c9a45c`) solo para detalles: el apellido del logo, líneas finas, números de los beneficios y botones principales.
- **Tipografías:** *Cormorant Garamond* (serif clásica, para títulos) combinada con *Inter* (sans-serif muy legible, para textos). El contraste entre una serif elegante y una sans-serif moderna es típico de marcas premium.
- **Ritmo visual:** se alternan secciones oscuras y claras (hero oscuro → catálogo claro → nosotros blanco → beneficios oscuro → contacto claro → pie negro). Eso separa las secciones sin necesidad de líneas ni adornos.
- **Efectos sutiles:** las tarjetas suben 4 px al pasar el mouse, la imagen hace un zoom leve y los botones cambian de color. No hay animaciones automáticas.
- **Detalle de identidad:** un marco dorado desplazado detrás de la imagen del hero, que funciona como "firma" visual del sitio.

**Estructura (one-page):** Encabezado fijo → Hero → Catálogo (con filtro) → Nosotros → Beneficios → Contacto → Pie.

---

## 2. Estructura de carpetas

```
relojeria-yampier/
├── index.html           ← estructura y contenido
├── styles.css           ← presentación (estilos y responsive)
├── script.js            ← comportamiento (catálogo, WhatsApp, menú, filtro)
├── GUIA-DE-ESTUDIO.md   ← este documento (no lo usa la página)
└── img/                 ← fotos (rutas relativas)
    ├── portada.jpg
    ├── clasico-elegance.jpg
    ├── clasico-minimal.jpg
    ├── deportivo-urban.jpg
    ├── deportivo-cronografo.jpg
    ├── casual-daily.jpg
    └── casual-weekend.jpg
```

Las fotos están en la carpeta `img/`, al lado de `index.html`, y se cargan con **rutas relativas**. Como son archivos locales, cargan siempre, incluso sin internet. Para cambiar una foto, guardá la nueva en `img/` y cambiá la ruta:

- En `index.html`: `<img src="img/portada.jpg" ...>`
- En `script.js`: `imagen: "img/mi-reloj.jpg"`

Una ruta relativa se interpreta desde la ubicación del archivo HTML, por eso funciona igual en tu computadora o en un hosting, siempre que se mantenga la estructura de carpetas.

---

## 3. Cómo ejecutar el proyecto localmente

1. Colocá `index.html`, `styles.css` y `script.js` en la **misma carpeta**.
2. Hacé doble clic en `index.html` (o arrastralo a la ventana del navegador).
3. Listo: no hace falta instalar nada ni iniciar un servidor.

Notas:
- La carpeta `img/` tiene que estar junto a `index.html`; si no, las imágenes no aparecen.
- Las tipografías se descargan de Google Fonts. Sin conexión, la página funciona igual con fuentes de respaldo (Georgia/Arial).
- En VS Code podés usar la extensión *Live Server* para que la página se recargue sola al guardar, pero es opcional.
- Para ver errores: **F12** (o clic derecho → Inspeccionar) → pestaña **Consola**. Mientras no se cargue el número de WhatsApp, vas a ver un aviso amarillo (`console.warn`) que indica que los botones llevan a Instagram: es intencional.

---

## 4. Arquitectura general

El sitio sigue el principio de **separación de responsabilidades**:

| Capa | Archivo | Responde a la pregunta |
|---|---|---|
| Estructura | `index.html` | ¿Qué contenido hay y qué significa? |
| Presentación | `styles.css` | ¿Cómo se ve? |
| Comportamiento | `script.js` | ¿Qué pasa cuando el usuario interactúa? |

**Flujo de carga en el navegador:**

1. El navegador descarga `index.html` y empieza a leerlo de arriba hacia abajo.
2. En el `<head>` encuentra el `<link>` a `styles.css` y lo descarga; también las fuentes de Google.
3. Encuentra `<script src="script.js" defer>`: lo descarga en paralelo, pero **no lo ejecuta todavía** gracias a `defer`.
4. Termina de leer el HTML y construye el **DOM** (el árbol de objetos que representa la página).
5. Recién ahí ejecuta `script.js`, que ya puede encontrar todos los elementos con `getElementById`.
6. El script genera las tarjetas de productos, configura los botones de WhatsApp y registra los eventos (clics).

La parte **estática** (textos, secciones) está en el HTML. La parte **dinámica** (las tarjetas) la crea JavaScript a partir de un array de datos. Así, para cambiar productos no hay que tocar HTML.

---

## 5. Función de cada archivo

**`index.html`** — Define las secciones con etiquetas semánticas, contiene los textos fijos, los enlaces internos del menú, un contenedor vacío (`#lista-productos`) donde JS insertará las tarjetas y elementos ocultos con `hidden` para Instagram, dirección y horarios.

**`styles.css`** — Organizado en 12 bloques numerados (índice al comienzo). Empieza con variables de color y medidas, sigue con estilos base, componentes reutilizables (botones), cada sección en orden y termina con las media queries.

**`script.js`** — Organizado en 9 bloques: datos del negocio, array de productos, referencias al DOM, funciones de WhatsApp, funciones del catálogo, filtro, menú móvil, datos de contacto y la ejecución inicial.

---

## 6. Principales etiquetas HTML

| Etiqueta | Uso en el proyecto | Por qué |
|---|---|---|
| `<!DOCTYPE html>` | Primera línea | Indica que es un documento HTML5. |
| `<html lang="es">` | Raíz | El idioma ayuda a lectores de pantalla y buscadores. |
| `<meta charset="UTF-8">` | Head | Permite acentos y ñ. |
| `<meta name="viewport">` | Head | Imprescindible para el responsive: hace que el celular use su ancho real. |
| `<meta name="description">` | Head | Texto que muestran los buscadores. |
| `<link rel="stylesheet">` | Head | Vincula la hoja de estilos. |
| `<script defer>` | Head | Carga el JS y lo ejecuta cuando el DOM está listo. |
| `<header>` | Encabezado | Zona superior con logo y navegación. |
| `<nav>` | Menú y pie | Bloque de enlaces de navegación. Tiene `aria-label` para distinguir los dos menús. |
| `<ul>` / `<li>` | Menús y datos de contacto | Una lista de enlaces es, semánticamente, una lista. |
| `<a href="#productos">` | Menú | **Enlace interno**: lleva a un elemento con `id="productos"`. |
| `<main>` | Contenido principal | Hay uno solo por página. |
| `<section>` | Cada bloque temático | Agrupa contenido con un título propio. |
| `<h1>`, `<h2>`, `<h3>` | Títulos | Un solo `h1` (el del hero); `h2` por sección; `h3` en tarjetas y beneficios. Jerarquía lógica. |
| `<figure>` / `<img>` | Hero | `alt` describe la imagen; `width`/`height` reservan espacio y evitan saltos al cargar. |
| `<article>` | Beneficios y tarjetas de producto | Contenido independiente que tiene sentido por sí solo. |
| `<button>` | Filtros y menú | Para **acciones** dentro de la página (no navegan). |
| `<em>` | "estilo propio" | Énfasis; CSS lo pinta dorado. |
| `<footer>` | Pie | Datos finales y derechos. |
| `<noscript>` | Catálogo | Mensaje si el navegador tiene JavaScript desactivado. |

**Atributos importantes:**
- `id`: identificador único. Lo usan los enlaces internos (`#contacto`) y JavaScript (`getElementById`).
- `class`: nombre reutilizable para aplicar estilos.
- `data-categoria`: atributo personalizado (`data-*`) que guarda un dato para JavaScript.
- `hidden`: oculta un elemento; JavaScript lo quita cuando hay datos.
- `aria-label`, `aria-expanded`, `aria-pressed`, `aria-controls`: información extra para tecnologías de asistencia (lectores de pantalla).

**Diferencia clave enlace vs botón:** `<a>` lleva a otro lugar (otra sección, otra página, WhatsApp). `<button>` ejecuta una acción en la misma página (filtrar, abrir el menú).

---

## 7. Reglas CSS más importantes

**Variables (custom properties)**
```css
:root { --color-dorado: #c9a45c; }
.logo span { color: var(--color-dorado); }
```
`:root` representa el elemento `<html>`. Las variables se definen una vez y se reutilizan. Cambiar un valor en `:root` cambia todo el sitio.

**Reset y `box-sizing`**
`*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }` — con `border-box`, el `width` incluye padding y borde, lo que simplifica los cálculos de tamaño.

**Selectores utilizados**
- De elemento: `body`, `img`, `a`.
- De clase: `.boton`, `.producto`.
- Descendiente: `.hero h1` (un `h1` dentro de `.hero`).
- Hijo directo: `.contacto-caja > p`.
- Combinado: `.filtro.activo` (elemento con ambas clases).
- Pseudoclases: `:hover`, `:focus-visible`.
- Pseudoelementos: `::before` (marco dorado del hero), `::after` (texto "Imagen no disponible" si falla una imagen).
- De atributo: `[hidden]`.

**Contenedor centrado**
```css
.contenedor { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
```
`margin: 0 auto` centra horizontalmente un bloque con ancho máximo.

**Flexbox** (distribución en una dimensión)
- `.encabezado-interior`: `justify-content: space-between` → logo a la izquierda, menú a la derecha; `align-items: center` → centrado vertical.
- `.hero-botones` y `.filtros`: `flex-wrap: wrap` → si no entran, pasan a la línea siguiente.
- `.producto` y `.producto-cuerpo`: `flex-direction: column` + `flex-grow: 1` en la descripción → todos los botones quedan alineados abajo aunque las descripciones tengan distinto largo.

**Grid** (distribución en dos dimensiones)
- `.hero-interior`: `grid-template-columns: 1.1fr 1fr` → dos columnas (texto un poco más ancho que la imagen).
- `.beneficios-grilla`: `repeat(3, 1fr)` → tres columnas iguales.
- `.productos-grilla`: `repeat(auto-fill, minmax(260px, 1fr))` → "poné tantas columnas como entren, cada una de al menos 260 px". Por eso el catálogo se adapta solo, casi sin media queries.

**Posicionamiento**
- `.encabezado { position: sticky; top: 0; }` → el encabezado acompaña el scroll.
- `.hero-imagen { position: relative }` + `::before { position: absolute }` → el marco se ubica respecto de la imagen.
- `.saltar-contenido` está fuera de pantalla (`top: -60px`) y aparece con `:focus` al presionar Tab.

**Navegación suave**
`scroll-behavior: smooth` hace que los enlaces internos se desplacen con animación; `scroll-padding-top` evita que el encabezado fijo tape el título de la sección.

**Otras propiedades útiles**
- `aspect-ratio: 1 / 1` + `object-fit: cover` → todas las fotos se ven cuadradas sin deformarse.
- `clamp(2.6rem, 6vw, 4.5rem)` → tamaño de letra fluido con mínimo y máximo.
- `transition` → cambios de color/posición suaves en `:hover`.

**Responsive (media queries)** — enfoque *desktop first*:
- `max-width: 900px` (tablets): el hero y los beneficios pasan a una columna.
- `max-width: 768px` (celulares): aparece el botón hamburguesa; el menú se oculta (`display: none`) y se muestra solo con la clase `.abierto`.
- `max-width: 480px`: botones del hero a ancho completo.
- `prefers-reduced-motion`: desactiva animaciones para quienes lo configuraron en su sistema.

**Accesibilidad visual**
- `:focus-visible` dibuja un contorno dorado al navegar con teclado.
- Se usa `--color-dorado-oscuro` (`#7a5f26`) para textos dorados sobre fondo claro, porque el dorado claro no alcanzaría el contraste mínimo recomendado (4,5:1).

---

## 8. Funciones JavaScript y conceptos

### Datos

**`datosNegocio`** (objeto) — Agrupa WhatsApp, Instagram, dirección y horario. Todo el sitio lee los datos de contacto de este único lugar, así no hay que buscar el número en varios archivos. Por ahora tiene cargado solo Instagram (`relojeriayampier`); los demás datos quedan vacíos hasta tenerlos confirmados, para no inventar información.

**`productos`** (array de objetos) — Cada objeto tiene `nombre`, `categoria`, `precio`, `descripcion`, `imagen` y `alt`. Es la "base de datos" del catálogo.

**`nombresCategorias`** (objeto) — Traduce la clave interna (`"clasico"`, sin tilde y en minúscula, cómoda para comparar) al texto que se muestra (`"Clásico"`). Se accede con corchetes: `nombresCategorias[producto.categoria]`.

### Referencias al DOM
```js
const listaProductos = document.getElementById("lista-productos");
const botonesFiltro = document.querySelectorAll(".filtro");
```
- `getElementById` devuelve **un** elemento por su id.
- `querySelectorAll` devuelve **todos** los elementos que coinciden con un selector CSS (una *NodeList*, que se puede recorrer con `forEach`).
Se guardan en constantes al principio para no buscarlos repetidamente.

### Funciones de contacto (WhatsApp e Instagram)

**`numeroWhatsAppEsValido(numero)`** — Devuelve `true` o `false`. Usa una expresión regular: `/^\d{10,15}$/` significa "desde el inicio (`^`) hasta el final (`$`), solo dígitos (`\d`), entre 10 y 15". Así se rechaza un número vacío, con espacios, guiones o el signo `+`.

**`crearEnlaceWhatsApp(mensaje)`** — Si el número no es válido devuelve `""` (*retorno temprano*). Si es válido arma `https://wa.me/NUMERO?text=MENSAJE`. Usa `encodeURIComponent` porque una URL no puede llevar espacios, acentos ni comas tal cual: los convierte a códigos como `%20` o `%C3%A1`.

**`crearEnlaceInstagram()`** — Valida el usuario de `datosNegocio.instagram` (solo letras, números, punto y guion bajo, hasta 30 caracteres) y devuelve `https://www.instagram.com/usuario/`, o `""` si no es válido.

**`configurarBotonConsulta(enlace, mensaje)`** — Recibe un elemento `<a>` y decide a dónde lleva con un `if / else if / else`:
1. Si hay WhatsApp válido → abre WhatsApp con el mensaje y el texto dice "Consultar por WhatsApp".
2. Si no, pero hay Instagram → abre el perfil y el texto dice "Consultar por Instagram" (Instagram no permite precargar un mensaje por enlace).
3. Si no hay ninguno → oculta el botón con `hidden`, para no mostrar un enlace roto.

En los casos 1 y 2 agrega `target="_blank"` (nueva pestaña) y `rel="noopener noreferrer"` (impide que la página abierta controle la nuestra). Esta función se reutiliza para los 2 botones generales y los 6 de productos: **evita código duplicado**. Cuando se cargue el número de WhatsApp, todos los botones cambian solos.

### Funciones del catálogo

**`formatearPrecio(precio)`** — Si `precio` no es un número (por ejemplo `null`), devuelve "Precio a confirmar". Si es número, usa `toLocaleString("es-AR")` para agregar puntos de miles: `185000` → `"$ 185.000"`.

**`crearTarjetaProducto(producto)`** — Construye una tarjeta con:
- `document.createElement("article")` → crea un elemento nuevo (todavía fuera de la página).
- `.className = "producto"` → le asigna clases CSS.
- `.textContent = producto.nombre` → inserta texto **como texto plano**.
- `.append(...)` / `.appendChild(...)` → mete un elemento dentro de otro.
- `imagen.addEventListener("error", ...)` → si la foto no carga, se elimina y se muestra el aviso.
- `imagen.loading = "lazy"` → la foto se descarga recién cuando está por verse.

Al final `return tarjeta;` devuelve el elemento armado.

> **¿Por qué no `innerHTML`?** `innerHTML` interpreta el texto como código HTML. Si un dato contuviera `<script>` o `<img onerror=...>`, se ejecutaría (ataque XSS). `textContent` siempre lo trata como texto. Además, `createElement` deja más claro qué elemento se crea y con qué propiedades.

**`mostrarProductos(listaAMostrar)`** — Vacía la grilla (`textContent = ""`), recorre el array con `forEach`, crea cada tarjeta y la agrega. Al final: `mensajeVacio.hidden = listaAMostrar.length > 0;` → si hay productos, el mensaje queda oculto; si no hay, se muestra.

### Filtro

**`filtrarProductos(categoriaElegida)`** — Condicional `if/else`: si es `"todos"` muestra el array completo; si no, usa `filter`, que devuelve un **array nuevo** solo con los productos cuya categoría coincide. El array original no se modifica.

**Eventos de los botones de filtro** — Se recorre `botonesFiltro` con `forEach` y a cada botón se le agrega `addEventListener("click", ...)`. Al hacer clic: se quita la clase `activo` a todos, se agrega al presionado y se llama a `filtrarProductos(boton.dataset.categoria)`. `dataset.categoria` lee el atributo HTML `data-categoria`.

### Menú móvil

**Evento del botón hamburguesa** — `classList.toggle("abierto")` agrega la clase si no está y la quita si está, y devuelve `true` si quedó agregada. Ese valor se usa para actualizar `aria-expanded` y el `aria-label` con un **operador ternario** (`condición ? siVerdadero : siFalso`). CSS hace el resto: `.menu.abierto { display: flex; }`.

**`cerrarMenu()`** — Quita la clase `abierto`. Se ejecuta al hacer clic en cualquier enlace del menú, para que el panel no quede tapando la sección elegida.

### Contacto y pie

**`mostrarDatoSiExiste(valor, idElementoTexto, idContenedor)`** — Si el valor está vacío (`trim()` elimina espacios sobrantes) no hace nada. Si tiene contenido, lo escribe y quita el `hidden`. Se reutiliza para dirección y horario.

**`mostrarDatosDeContacto()`** — Configura los dos botones generales de consulta (`#boton-consulta-hero` y `#boton-consulta-contacto`), avisa por consola si falta el número de WhatsApp, muestra la línea de Instagram con el enlace de `crearEnlaceInstagram()` y muestra dirección/horario si existen.

**`mostrarAnioActual()`** — `new Date().getFullYear()` obtiene el año del sistema para el aviso de derechos. Así no hay que actualizarlo cada año.

### Inicio
Las últimas tres líneas llaman a las funciones que preparan la página. Las funciones declaradas arriba no hacen nada hasta que se las **invoca**.

### Conceptos de JavaScript presentes
`const` (todo lo que no se reasigna) · funciones con parámetros y `return` · objetos y acceso con punto o corchetes · arrays · `forEach` y `filter` · condicionales `if`/`else` y ternario · `typeof` · expresiones regulares básicas · métodos de string (`trim`) · DOM (`getElementById`, `querySelectorAll`, `createElement`, `textContent`, `classList`, `setAttribute`, `hidden`, `dataset`) · eventos (`click`, `error`) · funciones anónimas como *callbacks* · `console.warn`.

> Nota sobre `let`: el proyecto no lo necesitó porque ninguna variable se reasigna. Usar `const` siempre que sea posible es una buena práctica: evita reasignaciones accidentales. `let` se usaría, por ejemplo, para un contador que cambia de valor.

---

## 9. Relación con las unidades de la materia

**Unidad 1 — Herramientas.** Organización en tres archivos + carpeta `img/`. Edición en VS Code. Uso de DevTools: pestaña *Elements* para ver las tarjetas generadas por JS (no aparecen en "Ver código fuente", sí en el DOM), pestaña *Console* para los avisos, modo de dispositivos (Ctrl+Shift+M) para probar el responsive.

**Unidad 2 — HTML5 y CSS3.** Documento completo con `head`/`body`, etiquetas semánticas, enlaces internos y externos, imágenes con `alt`, listas, botones, secciones. Selectores de todo tipo, clases e ids, colores y tipografías con variables, márgenes y padding, Flexbox (encabezado, botones, tarjetas), Grid (hero, catálogo, beneficios) y media queries.

**Unidad 3 — JavaScript ES6+.** `const`, funciones, arrays y objetos (`productos`, `datosNegocio`), condicionales, `forEach`/`filter`, manipulación del DOM y eventos `click` y `error`.

**Unidad 4 — Funcionamiento del navegador.** Orden de carga y atributo `defer`. Construcción del DOM y modificación posterior desde JS. Carga de recursos: locales (`styles.css`, `script.js`, `img/...` con rutas relativas) y externos (Google Fonts). Diferencias:
- **Enlace** (`<a href>`): el navegador navega solo cuando el usuario hace clic. El de WhatsApp es un enlace a un servicio externo: abre otra página, no intercambia datos con nuestro código.
- **Recurso local**: archivo de nuestra carpeta que el navegador lee al cargar la página.
- **Petición a un servicio externo** (ej. `fetch` a una API): el código pide datos a un servidor y espera la respuesta. Este proyecto **no hace peticiones de datos**; solo descarga recursos estáticos (fuentes e imágenes).

**Unidad 5 — Preprocesadores CSS.** No se usan. Un preprocesador como Sass permite variables, anidamiento, *mixins* y dividir el CSS en varios archivos, pero requiere instalar un compilador que genere el `.css` final. En este proyecto, las **variables nativas de CSS** (`--color-dorado`) cubren la necesidad principal y funcionan directamente en el navegador. En un proyecto grande, con muchos archivos de estilos, Sass sería una alternativa razonable.

**Unidad 6 — Frameworks de JavaScript.** No se usan. Con JS puro: el catálogo se genera con `createElement` + `forEach`; el filtro con `filter` y volviendo a dibujar la lista; el menú con `classList.toggle`; WhatsApp con una función que arma una URL. **Ventajas para un proyecto chico:** cero instalación, se abre con doble clic, carga rápida, sin dependencias que actualizar y se entiende exactamente qué hace cada línea. Un framework como React conviene cuando hay muchas vistas, mucho estado compartido o un equipo grande; aquí agregaría complejidad sin beneficio.

**Unidad 7 — Backend y APIs.** No hay backend porque el catálogo es chico y cambia poco: los datos pueden vivir en un array de `script.js` y el navegador los procesa solo. WhatsApp es un **servicio externo al que se accede mediante un enlace**: la página no envía ni guarda nada; el usuario continúa la conversación en WhatsApp. La web **no almacena pedidos, no procesa pagos y no maneja usuarios**.

Limitaciones si el negocio quisiera crecer:
- **Inventario:** cada cambio de stock o precio exige editar `script.js` y volver a subir el archivo; no hay un panel de administración.
- **Usuarios:** no se puede iniciar sesión ni guardar preferencias, porque no hay dónde almacenar los datos de forma segura.
- **Pedidos centralizados:** las consultas quedan dispersas en chats de WhatsApp; no hay registro ni estadísticas.
- **Seguridad:** cualquier dato en el JS es visible para cualquiera (F12), así que no se podría guardar información privada.
Para esto haría falta un servidor (por ejemplo Node.js + Express), una base de datos y una API que el frontend consulte con `fetch`.

**Unidad 8 — Buenas prácticas.** HTML semántico · nombres descriptivos en español y consistentes (`crearTarjetaProducto`, `.producto-precio`) · código indentado y dividido en bloques numerados · separación HTML/CSS/JS (sin estilos ni scripts en línea) · comentarios que explican el *por qué* · accesibilidad: `alt`, `lang`, `aria-*`, enlace "Saltar al contenido", foco visible, contraste revisado, navegación por teclado (todos los controles son `<a>` o `<button>`) · validación de datos antes de armar enlaces · `textContent` en lugar de `innerHTML` · funciones reutilizables para no duplicar código · sin dependencias.

---

## 10. Guía de modificación

**Productos** (`script.js`, bloque 2)
- *Agregar:* copiá un objeto `{ ... }` completo, pegalo después del último, separándolo con una coma, y cambiá sus valores.
- *Eliminar:* borrá el objeto completo y la coma que lo separa.
- *Precio a confirmar:* `precio: null`. *Precio real:* número sin puntos ni signo: `precio: 150000`.
- *Nueva categoría* (ej. "dama"):
  1. Usala en el producto: `categoria: "dama"`.
  2. Agregala a `nombresCategorias`: `dama: "Dama"`.
  3. Agregá el botón en `index.html`: `<button class="filtro" type="button" data-categoria="dama" aria-pressed="false">Dama</button>`.

**Colores** (`styles.css`, bloque 1): cambiá los valores en `:root`. Ej.: `--color-dorado: #b8955a;`. Verificá el contraste si cambiás colores de texto.

**Tipografías:** cambiá el enlace de Google Fonts en `index.html` y las variables `--fuente-titulos` / `--fuente-texto`.

**Textos:** están en `index.html`. El texto de "Nosotros" está marcado con el comentario `TEXTO PROVISIONAL`. Los beneficios se editan dentro de cada `<article class="beneficio">`.

**Imágenes:**
- Hero: cambiá el `src` (y el `alt`) en `index.html`.
- Productos: cambiá `imagen` y `alt` en cada objeto.
- Recomendado: fotos cuadradas para productos (mín. 600×600 px) y verticales para el hero (proporción 4:5), en `.jpg` o `.webp` livianos.

**Contacto** (`script.js`, bloque 1):
```js
const datosNegocio = {
    whatsapp: "549351XXXXXXX",   // país + área + número, solo dígitos
    instagram: "relojeriayampier", // ya cargado; sin @
    direccion: "Calle y número, ciudad",
    horario: "Lunes a viernes de ... a ..."
};
```
Para Argentina, los números de celular en WhatsApp llevan `54` + `9` + código de área sin el 0 + número sin el 15. Al completar el número, los 8 botones de consulta pasan solos de Instagram a WhatsApp.

**Mensajes de WhatsApp:** el mensaje general está en `mostrarDatosDeContacto()` (`mensajeGeneral`); el de cada producto, dentro de `crearTarjetaProducto()`.

---

## 11. Pruebas manuales

**Carga y consola**
- [ ] La página abre con doble clic en `index.html`, sin servidor.
- [ ] La consola no muestra errores rojos (solo el aviso amarillo de WhatsApp mientras no haya número).
- [ ] Se ven la imagen de portada y las 6 imágenes de productos.
- [ ] Se ven 6 tarjetas con nombre, categoría, precio, descripción y botón.
- [ ] Los productos con `precio: null` dicen "Precio a confirmar".
- [ ] El año del pie es el actual.

**Navegación**
- [ ] Cada enlace del menú (y del pie) lleva a su sección y el título no queda tapado por el encabezado.
- [ ] "Ver productos" lleva al catálogo.
- [ ] Al presionar Tab al cargar, aparece "Saltar al contenido".

**Filtro**
- [ ] "Clásicos", "Deportivos" y "Casuales" muestran 2 productos cada uno; "Todos" muestra 6.
- [ ] El botón elegido queda resaltado en negro.
- [ ] Si se crea una categoría sin productos, aparece el mensaje "No hay productos...".

**WhatsApp**
- [ ] Sin número: los botones dicen "Consultar por Instagram" y abren instagram.com/relojeriayampier en otra pestaña.
- [ ] Con un número válido: abren `wa.me` en otra pestaña con el mensaje correcto, incluido el nombre del producto.
- [ ] Con un número inválido (con espacios o `+`): los botones siguen llevando a Instagram.
- [ ] Sin WhatsApp ni Instagram: los botones de consulta no aparecen.

**Contacto**
- [ ] Aparece la línea de Instagram con @relojeriayampier y abre el perfil correcto.
- [ ] Dirección y horario no aparecen mientras estén vacíos; al completarlos, aparece su línea.

**Responsive** (DevTools → modo dispositivo)
- [ ] 1280 px: menú horizontal, hero en dos columnas, catálogo en 3–4 columnas.
- [ ] 820 px (tablet): hero y beneficios en una columna.
- [ ] 375 px (celular): aparece el botón ☰; abre y cierra el menú; al elegir una sección, el menú se cierra; no hay scroll horizontal.

**Accesibilidad e imágenes**
- [ ] Todo se puede recorrer con Tab y el foco se ve (contorno dorado).
- [ ] Todas las imágenes tienen `alt` (DevTools → Elements).
- [ ] Si se escribe mal el nombre de una imagen en `script.js`, la tarjeta muestra "Imagen no disponible" y la consola avisa cuál falló.
- [ ] (Opcional) Validar el HTML en validator.w3.org y correr Lighthouse en DevTools.

---

## 12. Preguntas para la defensa oral

**1. ¿Por qué separaste el proyecto en tres archivos?**
Por separación de responsabilidades: HTML define la estructura, CSS la presentación y JS el comportamiento. Cada archivo se puede modificar sin romper los otros, el código es más ordenado y el navegador puede guardar en caché el CSS y el JS.

**2. ¿Qué es el HTML semántico y dónde lo usaste?**
Es usar etiquetas que describen el significado del contenido, no solo su aspecto. Usé `header`, `nav`, `main`, `section`, `article` y `footer`. Ayuda a la accesibilidad (lectores de pantalla), al posicionamiento en buscadores y a la legibilidad del código.

**3. ¿Qué hace el atributo `defer`?**
Descarga el script en paralelo mientras se lee el HTML, pero lo ejecuta recién cuando el DOM está completo. Sin `defer`, si el script está en el `<head>`, `getElementById` devolvería `null` porque los elementos todavía no existen.

**4. ¿Qué es el DOM?**
Es la representación en memoria de la página como un árbol de objetos que el navegador construye a partir del HTML. JavaScript puede leerlo y modificarlo; los cambios se ven al instante en pantalla. Por eso las tarjetas aparecen en el inspector (Elements), aunque no estén en el archivo HTML.

**5. ¿Cómo se generan las tarjetas de productos?**
`mostrarProductos` recorre el array `productos` con `forEach`. Por cada objeto llama a `crearTarjetaProducto`, que crea los elementos con `createElement`, les pone clases y texto con `textContent`, los anida con `append` y devuelve el `article`. Luego se agrega al contenedor `#lista-productos`.

**6. ¿Por qué no usaste `innerHTML`?**
Porque interpreta el texto como HTML: si un dato tuviera código malicioso, se ejecutaría (XSS). `textContent` inserta siempre texto plano. Además, con `createElement` queda explícito cada elemento creado.

**7. ¿Cómo funciona el filtro?**
Cada botón tiene `data-categoria`. Al hacer clic se lee con `dataset.categoria`. Si es "todos", se muestran todos los productos; si no, `filter` genera un array nuevo con los que coinciden y se vuelve a dibujar la grilla. El array original nunca se modifica.

**8. ¿Qué diferencia hay entre `forEach` y `filter`?**
`forEach` recorre el array y ejecuta una función por cada elemento, sin devolver nada. `filter` también recorre, pero devuelve un array nuevo con los elementos para los que la función devolvió `true`.

**9. ¿Cómo se arma el enlace de WhatsApp?**
Con la URL `https://wa.me/NUMERO?text=MENSAJE`. Primero se valida el número con una expresión regular; si no es válido, el botón se desactiva. El mensaje se codifica con `encodeURIComponent` para que espacios y acentos sean válidos en una URL.

**10. ¿Qué pasa si el número de WhatsApp no está cargado?**
`crearEnlaceWhatsApp` devuelve una cadena vacía y `configurarBotonConsulta` usa la siguiente opción: el perfil de Instagram. Si tampoco hubiera Instagram, el botón se oculta. Además se muestra un aviso en la consola. Así nunca hay un enlace roto ni un número inventado.

**11. ¿WhatsApp es una API? ¿Tu página se comunica con WhatsApp?**
En este proyecto WhatsApp se usa mediante un **enlace**, no mediante una API. La página no envía datos ni recibe respuestas: cuando el usuario hace clic, el navegador abre WhatsApp con un mensaje precargado, y el usuario decide si lo envía. No se guarda ningún pedido.

**12. ¿Por qué no hay backend?**
Porque el sitio es una vidriera: muestra un catálogo chico y deriva las consultas a WhatsApp. Los datos pueden estar en un array de JS. Un backend sería necesario para gestionar stock, usuarios, pedidos o pagos, porque requieren guardar información de forma centralizada y segura.

**13. ¿Por qué no usaste React o Bootstrap?**
Porque el proyecto es chico y no lo necesita. JS puro resuelve todas las funciones con pocas líneas, sin instalación ni dependencias, y se abre con doble clic. Además, me permite entender y explicar cada parte. Un framework tiene sentido en aplicaciones grandes con mucho estado e interfaces complejas.

**14. ¿Qué ventaja tienen las variables de CSS? ¿Es lo mismo que Sass?**
Permiten definir un valor una vez y reutilizarlo; cambiar el dorado en `:root` cambia todo el sitio. Sass tiene variables también, pero se compilan antes y requieren una herramienta; las variables CSS son nativas, funcionan directo en el navegador y hasta se pueden cambiar con JavaScript.

**15. ¿Cuándo usaste Flexbox y cuándo Grid?**
Flexbox para alinear elementos en una sola dirección: el encabezado (logo y menú), los botones y el interior de las tarjetas. Grid para distribuciones en filas y columnas: el hero en dos columnas, los beneficios en tres y el catálogo.

**16. ¿Qué hace `repeat(auto-fill, minmax(260px, 1fr))`?**
Crea tantas columnas como entren en el ancho disponible, cada una de al menos 260 px, repartiendo el espacio sobrante. Así el catálogo pasa de 4 a 3, 2 o 1 columna según la pantalla sin escribir media queries para eso.

**17. ¿Cómo hiciste el diseño responsive?**
Con la meta viewport, unidades flexibles, Grid automático y media queries en 900, 768 y 480 px. En celulares el menú se oculta y aparece un botón que lo muestra agregando la clase `abierto`.

**18. ¿Cómo funciona el menú móvil?**
En pantallas chicas CSS oculta el menú. Al tocar el botón, `classList.toggle("abierto")` agrega o quita esa clase, y CSS muestra el menú cuando la tiene. También se actualiza `aria-expanded` para lectores de pantalla. Al tocar un enlace, `cerrarMenu` lo vuelve a ocultar.

**19. ¿Qué medidas de accesibilidad aplicaste?**
Textos `alt`, `lang="es"`, jerarquía correcta de títulos, controles con `<a>` y `<button>` (operables con teclado), foco visible, enlace para saltar al contenido, atributos `aria` en el menú y los filtros, contraste revisado (dorado oscuro sobre fondos claros) y respeto por `prefers-reduced-motion`.

**20. ¿Qué es una ruta relativa?**
Una ruta que se calcula desde la ubicación del archivo actual, por ejemplo `img/reloj.jpg` ("la carpeta img al lado de este HTML"). Funciona igual en mi computadora y en un servidor. Una ruta absoluta indica la dirección completa (`https://...` o `C:\...`), y la de disco dejaría de funcionar en otra computadora.

**21. ¿Por qué usaste `const` y no `let` o `var`?**
Porque ninguna variable se reasigna. `const` evita reasignaciones por error y deja clara la intención. Ojo: con `const` el contenido de un objeto o array sí se puede modificar; lo que no se puede es asignar otro valor a la variable. `var` no se usa porque tiene alcance de función y permite redeclarar, lo que provoca errores.

**22. ¿Cómo detectarías un error en la página?**
Abriendo DevTools (F12): la pestaña Consola muestra errores de JS con archivo y línea; Elements permite ver el DOM y los estilos aplicados a cada elemento; Network muestra si algún archivo o imagen no cargó (error 404); el modo dispositivo sirve para probar el responsive.

**23. ¿Qué pasa si una imagen no carga?**
Cada imagen de producto tiene un evento `error`. Si falla, la función elimina la imagen, agrega la clase `sin-imagen` al contenedor y CSS muestra "Imagen no disponible" con `::after`. También se registra un aviso en la consola.

**24. ¿Qué mejorarías en una próxima versión?**
Sacar fotos propias de todos los relojes con el mismo fondo y la misma luz, cargar los datos reales del negocio y, si el catálogo crece, mover los productos a un archivo JSON o a un backend con un panel de administración, para no tener que editar el código.
