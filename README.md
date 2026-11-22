# Equilibra

Equilibra es una página web sobre la aplicación Equilibra de bienestar financiero. Presenta una forma cercana y sin juicios de entender los gastos, crear hábitos y avanzar hacia objetivos de ahorro.

## Qué incluye

- Diseño adaptable a móviles y escritorio.
- Navegación entre las secciones de filosofía, funciones y bienestar financiero.
- Una vista ilustrativa de una aplicación de finanzas personales.
- Una galería de seis vídeos de demostración de las principales funciones.
- Un manual de usuario en PDF accesible desde la navegación, el contenido principal y el pie de página.
- Un resumen financiero interactivo que permite alternar entre el mes actual y el anterior.
- Datos y gráficos ficticios; no se conectan cuentas ni se guardan movimientos.
- Páginas públicas de privacidad, cookies y tecnologías similares, y términos y condiciones.
- Página para solicitar por correo la eliminación de una cuenta de Equilibra y sus datos asociados.

## Cómo abrir el proyecto

No requiere instalar dependencias ni compilar archivos. Puedes abrir `index.html` directamente en un navegador o iniciar un servidor local desde la carpeta del proyecto:

```powershell
python -m http.server 8000
```

Después, visita [http://localhost:8000](http://localhost:8000).

## Archivos principales

- `index.html`: estructura y contenido de la página.
- `style.css`: estilos y diseño adaptable.
- `script.js`: menú móvil, selector de periodos y animaciones de entrada.
- `assets/equilibra-icon.webp`: icono de Equilibra.
- `assets/videos/`: vídeos MP4 de demostración, reproducibles desde la galería de la página principal.
- `assets/PDF/MANUAL_USUARIO_APP_EQUILIBRA.pdf`: manual de usuario de la aplicación.
- `politica-privacidad.html`, `cookies.html` y `terminos-condiciones.html`: políticas y condiciones publicadas.
- `eliminar-cuenta.html` y `eliminar-cuenta.js`: formulario que prepara la solicitud de eliminación en el cliente de correo del usuario; la web no procesa ni guarda esas solicitudes.

Las fuentes DM Sans y Manrope se cargan desde Google Fonts, por lo que su descarga requiere conexión a internet. Sin conexión, se usarán fuentes alternativas del sistema.
