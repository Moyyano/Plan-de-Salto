# Camino al Mate: cómo ponerla en tu iPhone

Esta carpeta es la app completa. Al subirla a GitHub Pages (gratis) tendrás tu propia dirección web y, desde ahí, la instalas en el iPhone con su icono y a pantalla completa.

## Qué hay en la carpeta

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app: Hoy, Estirar, Plan y Progreso, con todos los dibujos |
| `manifest.json` | Nombre, colores e iconos de la app |
| `icon-180.png`, `icon-192.png`, `icon-512.png` | El icono del balón |
| `sw.js` | Hace que la app se abra aunque no tengas conexión |

`GUIA.md` (este archivo) no hace falta subirlo.

## 1. Subirla a GitHub Pages

1. Entra en github.com con tu cuenta (o créate una).
2. Arriba a la derecha, **+** → **New repository**.
   - Nombre: `camino-al-mate`
   - Márcalo como **Public** (GitHub Pages gratis solo funciona con repositorios públicos).
   - Pulsa **Create repository**.
3. En el repositorio nuevo, pulsa **uploading an existing file** (o **Add file → Upload files**).
4. Arrastra los 6 archivos: `index.html`, `manifest.json`, `sw.js` y los tres `icon-*.png`.
5. Pulsa **Commit changes**.
6. Ve a **Settings → Pages**.
   - En **Source** elige **Deploy from a branch**.
   - Rama **main**, carpeta **/ (root)** → **Save**.
7. Espera uno o dos minutos. Tu app estará en:
   `https://TU-USUARIO.github.io/camino-al-mate/`

Al ser público, cualquiera con la dirección puede ver la app (el plan y los dibujos). Tus datos no se ven: se guardan solo en tu iPhone.

## 2. Instalarla en el iPhone

1. Abre tu dirección en **Safari**.
2. Botón **Compartir** → **Añadir a pantalla de inicio** → **Añadir**.
3. Ábrela siempre desde ese icono. Se abre a pantalla completa, sin barras de Safari, y funciona sin conexión.

## 3. Tus datos

- Todo lo que apuntes (sesiones, kilos, tests y estiramientos) se guarda **en el iPhone**, dentro de la app.
- **Importante:** el iPhone guarda por separado los datos del icono y los de Safari. Si abres la misma dirección en Safari, la verás vacía. Usa siempre el icono.
- Haz una copia de vez en cuando: **Progreso → Copia de seguridad → Copiar copia** y pégala en Notas. Si cambias de móvil o borras la app, la recuperas con **Restaurar copia**.
- Si borras el icono de la pantalla de inicio, se borran sus datos. Haz antes una copia.

## 4. Avisos en el iPhone

Al tocar un aviso se abre la app, directamente en la pestaña que toca.

| Aviso | Cuándo | Abre |
|---|---|---|
| Entrenar | Lunes, miércoles, viernes y sábado a las 18:30 | Hoy |
| Entrenar | Martes a las 19:30 | Hoy |
| Entrenar | Jueves a las 19:15 | Hoy |
| Estirar antes de dormir | Todos los días a las 21:30 | Estirar |
| Mañana toca test | Viernes 18 dic 2026 y viernes 12 feb 2027 a las 20:00 | Plan |
| Día de test | Sábado 19 dic 2026 y sábado 13 feb 2027 a las 11:00, 14:00, 18:00 y 21:00, **solo si aún no lo has apuntado** | Progreso |
| Falta apuntar el test | El domingo siguiente a las 12:00, **solo si sigue sin apuntar** | Progreso |

Los domingos no hay aviso de entreno (es tu día de descanso) y el sábado de test no hay aviso de entreno.

Los avisos los envía un pequeño servidor gratuito en **Cloudflare**, que está en la carpeta `servidor-avisos` (al lado de esta).

> **No subas la carpeta `servidor-avisos` a GitHub.** Contiene `CLAVES-SECRETAS.txt`.

### 4.1 Crear el servidor (una vez, unos 10 minutos)

1. Créate una cuenta gratuita en **dash.cloudflare.com**.
2. **Workers & Pages → Create → Create Worker** (empezando por «Hello World»). Nombre: `camino-al-mate-avisos`. Pulsa **Deploy**.
3. Pulsa **Edit code**, borra todo, pega el contenido de `servidor-avisos/worker.js` y pulsa **Deploy**.
4. **Storage & Databases → KV → Create** un espacio llamado `avisos`.
5. Vuelve al worker → **Settings → Bindings → Add → KV namespace**. Nombre de la variable: `AVISOS`. Elige `avisos`.
6. **Settings → Variables and Secrets → Add**. Copia los valores de `servidor-avisos/CLAVES-SECRETAS.txt`:
   - `VAPID_PUBLIC`, tipo **Text**.
   - `VAPID_PRIVATE`, tipo **Secret**.
   - `CLAVE`, tipo **Secret**.
   - `CONTACTO`, tipo **Text**, con la dirección de tu app, por ejemplo `https://TU-USUARIO.github.io/camino-al-mate/`.
7. **Settings → Trigger Events → Add → Cron Triggers**, con la expresión `*/5 * * * *` (revisa cada 5 minutos).
8. Apunta la dirección del worker. Será algo como `https://camino-al-mate-avisos.TU-NOMBRE.workers.dev`.

Los nombres de los menús de Cloudflare pueden cambiar un poco, pero los pasos son esos.

### 4.2 Activar los avisos en el iPhone

1. Abre la app **desde el icono** de la pantalla de inicio. Desde Safari no funciona.
2. Ve a **Plan → Avisos en el iPhone**.
3. Pega la dirección del worker y la `CLAVE`.
4. Pulsa **Activar avisos** y acepta el permiso.
5. Pulsa **Enviar prueba**. Te debería llegar un aviso en unos segundos.

Necesitas iOS 16.4 o posterior. Si ya no quieres los avisos de Atajos que creaste antes, bórralos en **Atajos → Automatización**.

Para cambiar las horas, edita las líneas `HORA_...` del principio de `worker.js` en Cloudflare y pulsa **Deploy**.

## 5. Actualizar la app

Cuando haya una versión nueva, sube el `index.html` nuevo al repositorio (**Add file → Upload files**, sustituye el anterior). El iPhone la descargará la próxima vez que abras la app con conexión. Tus datos no se tocan.
