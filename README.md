# Equilibra

Equilibra es una página web sobre la App Equilibra de bienestar financiero. Presenta una forma cercana y sin juicios de entender los gastos, crear hábitos y avanzar hacia objetivos de ahorro.

## Qué incluye

- Diseño adaptable a móviles y escritorio.
- Navegación entre las secciones de filosofía, funciones y bienestar financiero.
- Una vista ilustrativa de una aplicación de finanzas personales.
- Un resumen financiero interactivo que permite alternar entre el mes actual y el anterior.
- Datos y gráficos ficticios; no se conectan cuentas ni se guardan movimientos.
- Páginas públicas de privacidad, cookies y tecnologías similares, y términos y condiciones.

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
- `politica-privacidad.html`, `cookies.html` y `terminos-condiciones.html`: políticas y condiciones publicadas.

Las fuentes DM Sans y Manrope se cargan desde Google Fonts, por lo que su descarga requiere conexión a internet. Sin conexión, se usarán fuentes alternativas del sistema.
