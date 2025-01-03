# Krugger Challenge API y Frontend

Este proyecto contiene el backend y frontend para la solución del desafío Krugger. A continuación, se detallan los pasos para configurar y ejecutar ambos componentes.

---

## 🔧 Back End

### Requisitos Previos
1. **PostgreSQL**: Asegúrate de tener instalado PostgreSQL.
2. **.NET Core SDK**: Descarga e instala el SDK desde [dotnet.microsoft.com](https://dotnet.microsoft.com/).

### Configuración

1. **Crear la base de datos**:
   Crea una base de datos en PostgreSQL con el nombre `Krugger_DB`.

   ```sql
   CREATE DATABASE Krugger_DB;
   ```

2. **Configurar el nombre de la base de datos**:
   Si deseas cambiar el nombre o la configuración de la base de datos, edita el archivo `appsettings.json` en el backend.

3. **Ejecutar las migraciones**:
   Desde el directorio raíz del backend, ejecuta los siguientes comandos para crear y aplicar las migraciones:

   ```bash
   dotnet ef migrations add 20241231232903_InicioDB
   dotnet ef database update
   ```

   Esto generará automáticamente las tablas necesarias en la base de datos.

---

## 🌐 Front End

### Requisitos Previos
1. **Node.js y npm**: Instala Node.js desde [nodejs.org](https://nodejs.org/).
2. **Angular CLI**: Instala Angular CLI si aún no lo tienes:

   ```bash
   npm install -g @angular/cli
   ```

### Configuración

1. **Clonar el repositorio**:
   Clona el repositorio en tu máquina local:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

2. **Navegar al directorio del frontend**:
   Ve al directorio del proyecto Angular:

   ```bash
   cd FrontEnd
   cd AppKruggerChallengue
   ```

3. **Instalar dependencias**:
   Ejecuta el siguiente comando para instalar las dependencias del proyecto:

   ```bash
   npm install
   ```

4. **Ejecutar la aplicación**:
   Levanta el servidor de desarrollo de Angular con:

   ```bash
   ng serve
   ```

   La aplicación estará disponible en [http://localhost:4200](http://localhost:4200).

---

## 📚 Notas Adicionales

- **Cambios en la configuración de la base de datos**: Edita el archivo `appsettings.json` para personalizar la conexión a la base de datos.
- **Despliegue**: Consulta las guías oficiales de .NET Core y Angular para desplegar en producción.

---

## 🤝 Contribuciones

Si deseas contribuir al proyecto:
1. Realiza un fork del repositorio.
2. Crea una rama para tus cambios:

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

3. Envía un pull request con tus mejoras.

---

## 🖍️ Licencia

Este proyecto está bajo la licencia [MIT](https://opensource.org/licenses/MIT). ¡Siéntete libre de usarlo y mejorarlo!

---

¡Gracias por usar Krugger Challenge! 🚀


-Dorival Pichamba
