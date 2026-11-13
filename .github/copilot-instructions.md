# Instrucciones para Copilot


## Visión general del proyecto


Este repositorio contiene una landing page estática y responsive para un estudio creativo independiente llamado Norte Studio. El objetivo principal es comunicar la identidad de la marca, servicios, proyectos, propuesta de valor y contacto de forma clara, moderna y minimalista.


El proyecto está pensado como una web de presentación de una sola página, sin framework ni dependencias, con un enfoque en diseño visual, legibilidad y accesibilidad.


## Stack y restricciones


- HTML5 para la estructura semántica.
- CSS3 con variables CSS, diseño responsivo y estilos reutilizables.
- JavaScript vanilla para interacciones simples: menú móvil, reloj analógico y animaciones de scroll.
- No usar frameworks, paquetes adicionales ni compilación.
- No introducir dependencias externas salvo que el proyecto lo requiera explícitamente.
- Mantener una estructura simple y legible, adecuada para una landing page estática.


## Estructura recomendada


- `index.html`: contenido principal de la página y secciones.
- `styles.css`: diseño visual, responsive, variables, estados y componentes.
- `script.js`: comportamiento del navegador y UX pequeña.
- `README.md`: documentación de uso y estructura del proyecto.


## Principios de desarrollo


- Priorizar la simplicidad y la claridad por encima de la complejidad.
- Mantener el HTML semántico y accesible: headings correctos, enlaces significativos, botones con propósito claro.
- Usar clases descriptivas y consistentes con el estilo existente.
- Preferir CSS reutilizable y variables para colores, tipografías y espaciados.
- Mantener una lógica JS ligera, evitando sobreingeniería.
- Respetar el tono visual de la marca: sobrio, cálido, moderno y profesional.


## Estilo y estándares


- Conserva la estética actual del sitio: paleta minimalista, tipografías limpias y espacios bien definidos.
- Si se añaden secciones o componentes, deben seguir el mismo lenguaje visual del proyecto.
- Mantener las animaciones suaves y ligeras, con soporte para `prefers-reduced-motion`.
- Priorizar responsive design para móvil, tablet y desktop.
- Usar `aria-label` o atributos accesibles cuando se agreguen elementos interactivos.


## Reglas para cambios de código


- Realiza cambios pequeños y específicos que resuelvan el problema sin introducir refactors innecesarios.
- Mantén el código legible y fácil de mantener.
- No elimines secciones existentes sin necesidad ni cambies el tono visual del sitio sin un motivo claro.
- Cuando añadas contenido textual, usa un tono cercano, claro y profesional.
- Si se modifica la estructura HTML, revisa que los estilos y scripts sigan funcionando correctamente.


## Validación


Como el proyecto es estático, la validación principal consiste en:


- abrir la página en un navegador moderno;
- verificar que el diseño responde correctamente en móvil y escritorio;
- comprobar que el menú, el reloj y las animaciones siguen funcionando;
- asegurarse de que no haya errores de consola relevantes.


Se puede servir localmente con:


```bash
cd "C:\Documentos\Icono\Copilot-GitHub-Copilot-12\mi-web"
python -m http.server 8000
```


Luego abrir: `http://localhost:8000`.


## Recomendaciones para Copilot


Cuando generes código para este proyecto:


- usa HTML semántico y estructura clara;
- evita JavaScript complejo o frameworks innecesarios;
- mantén los estilos en CSS y usa variables CSS cuando sea apropiado;
- respeta la identidad visual actual del sitio;
- prioriza navegación, legibilidad y accesibilidad;
- no introduzcas dependencias si no son estrictamente necesarias;
- si cambias textos, mantenlos coherentes con el tono de una marca creativa y profesional.


## Objetivo del trabajo


El objetivo final es mantener una página web elegante, funcional y accesible que sirva como carta de presentación del estudio y facilite la captación de clientes o proyectos.

