# Plan de Pruebas - Aplicación To-Do React

## 1. 🎯 Objetivo
Verificar que las funcionalidades principales de la aplicación de tareas (To-Do) funcionen correctamente, garantizando una experiencia de usuario fluida y libre de errores críticos antes del despliegue en producción.

## 2. 📋 Alcance
Este plan cubre las siguientes funcionalidades:

### Funcionalidades Principales:
• **Crear tarea** - Añadir nuevas tareas a la lista
• **Listar tareas** - Mostrar todas las tareas existentes
• **Completar/Descompletar tarea** - Marcar tareas como realizadas
• **Eliminar tarea** - Remover tareas de la lista
• **Actualizar tarea** - Editar el contenido de tareas existentes
• **Persistencia de datos** - Guardar/cargar desde localStorage
• **Validaciones** - Manejo de entradas vacías y caracteres especiales

### Aspectos Técnicos:
• **Renderizado de componentes** - Verificar que la UI se muestre correctamente
• **Gestión de estado** - Confirmar actualizaciones reactivas
• **Manejo de errores** - Validar comportamiento con datos inválidos
• **Responsive design** - Funcionamiento en diferentes dispositivos
• **Accesibilidad** - Navegación con teclado y lectores de pantalla

## 3. 👥 Roles

| Rol | Responsabilidad |
|-----|----------------|
| **QA Tester** | Ejecutar las pruebas, registrar errores, validar correcciones |
| **Desarrollador** | Corregir defectos encontrados, implementar mejoras |
| **Líder Técnico** | Aprobar resultados del proceso de QA, definir criterios |
| **Product Owner** | Validar funcionalidades desde perspectiva de negocio |

## 4. 🧪 Casos de Prueba

### Funcionalidad: Gestión de Tareas

| ID | Nombre de Prueba | Descripción | Datos de entrada | Resultado esperado | Estado |
|----|------------------|-------------|------------------|-------------------|--------|
| **TC001** | Crear tarea válida | Verificar que se pueda crear una tarea con nombre no vacío | "Estudiar React" | Tarea aparece en la lista con estado pendiente | ✅ |
| **TC002** | Crear tarea vacía | Verificar que no se permita crear tareas sin contenido | "" (vacío) | No se crea tarea, input permanece activo | ✅ |
| **TC003** | Crear tarea con espacios | Verificar manejo de entradas con solo espacios | "   " | No se crea tarea, se valida trim() | ✅ |
| **TC004** | Crear tarea con caracteres especiales | Verificar soporte para emojis y símbolos | "🚀 Tarea @#$%" | Tarea se crea correctamente con todos los caracteres | ✅ |
| **TC005** | Crear tarea muy larga | Verificar manejo de texto extenso | Texto de 1000 caracteres | Tarea se crea sin truncar contenido | ✅ |
| **TC006** | Completar tarea | Verificar que se pueda marcar como completada | Click en tarea "Estudiar React" | Tarea muestra clase 'completed' y estilo tachado | ✅ |
| **TC007** | Descompletar tarea | Verificar que se pueda desmarcar tarea completada | Click en tarea ya completada | Tarea vuelve a estado pendiente | ✅ |
| **TC008** | Eliminar tarea existente | Verificar eliminación de tarea de la lista | Click en botón eliminar | Muestra confirmación y elimina tarea | ✅ |
| **TC009** | Eliminar múltiples tareas | Verificar eliminación secuencial | Eliminar 3 tareas consecutivas | Todas las tareas se eliminan correctamente | ✅ |
| **TC010** | Actualizar contenido de tarea | Verificar edición de tarea existente | Modificar "Estudiar" por "Repasar" | Contenido se actualiza en tiempo real | ✅ |

### Funcionalidad: Validaciones y Casos Borde

| ID | Nombre de Prueba | Descripción | Datos de entrada | Resultado esperado | Estado |
|----|------------------|-------------|------------------|-------------------|--------|
| **TC011** | Múltiples tareas rápidas | Crear 10 tareas consecutivamente | "Tarea 1" a "Tarea 10" | Todas se crean con keys únicos | ✅ |
| **TC012** | Tareas con nombres duplicados | Verificar soporte para nombres iguales | "Tarea" x2 veces | Ambas tareas existen independientemente | ✅ |
| **TC013** | Texto multiidioma | Verificar soporte UTF-8 | "中文 العربية Русский" | Texto se muestra correctamente | ✅ |
| **TC014** | Estado inicial sin tareas | Verificar comportamiento con lista vacía | App sin tareas predeterminadas | Interfaz se muestra sin errores | ✅ |


### Funcionalidad: Persistencia y Rendimiento

| ID        | Nombre de Prueba | Descripción | Datos de entrada | Resultado esperado | Estado |
|-----------|------------------|-------------|------------------|-------------------|--------|
| **TC015** | Guardar en localStorage | Verificar persistencia de datos | Crear tarea nueva | localStorage.setItem se ejecuta | ✅ |
| **TC016** | Cargar desde localStorage | Verificar recuperación al recargar | Datos en localStorage | Tareas se restauran al iniciar | ⚠️ |
| **TC017** | Error en localStorage | Verificar manejo de fallos de almacenamiento | localStorage bloqueado | App continúa funcionando sin crashear | ❌ |
| **TC018** | localStorage vacío | Verificar comportamiento inicial | localStorage sin datos | Muestra tareas por defecto | ✅ |

## 5. 📅 Cronograma de Pruebas

| Fase | Duración estimada | Responsable | Entregables                               |
|------|------------------|-------------|-------------------------------------------|
| **Diseño del plan** | 2 día            | QA Tester | Documento de plan, casos de prueba        |
| **Preparación del entorno** | 1 día            | QA Tester + Dev | Configuración de testing, datos de prueba |
| **Ejecución de pruebas funcionales** | 2 días           | QA Tester | Resultados de TC001-TC014                 |
| **Ejecución de pruebas técnicas** | 1 día            | QA Tester + Dev | Resultados de TC015-TC018                 |
| **Pruebas de regresión** | 1 día            | QA Tester | Validación de correcciones                |
| **Documentación y reporte** | 1 día            | QA Tester | Reporte final, métricas                   |
| **Corrección de errores** | Según hallazgos  | Dev Team | Fixes implementados                       |
| **Validación final** | 1 día            | Líder Técnico | Aprobación para despliegue                |

**Total estimado: 9 días hábiles**

## 6. ✅ Criterios de Aceptación

### Criterios Funcionales:
• **Al menos el 90%** de los casos deben pasar sin errores
• **100% de funcionalidades core** (crear, listar, completar, eliminar) deben funcionar
• **Errores críticos** deben ser corregidos antes del despliegue
• **La experiencia del usuario** debe mantenerse fluida y sin bloqueos

### Criterios Técnicos:
• **Cobertura de pruebas** mínima del 80%
• **Compatibilidad** con Chrome, Firefox, Safari, Edge
• **Responsive design** funcional en móviles y tablets

### Criterios de Calidad:
• **Accesibilidad** básica implementada (WCAG 2.1 nivel A)
• **Manejo de errores** sin crashes de aplicación
• **Persistencia de datos** confiable
• **Feedback visual** claro para todas las acciones

## 7. 🐛 Registro de Errores

| ID Error   | Descripción | Pasos para reproducir | Severidad | Estado | Responsable | Fecha |
|------------|-------------|----------------------|-----------|--------|-------------|-------|
| **BUG001** | Error localStorage no manejado | 1. Simular fallo localStorage<br>2. Crear nueva tarea<br>3. Error no capturado | 🔴 Alta | ❌ Abierto | Dev1 | 06/06/2025 |
| **BUG002** | Sin recuperación de localStorage | 1. Crear tareas<br>2. Recargar página<br>3. Tareas no se restauran | 🟡 Media | ⚠️ Pendiente | Dev2 | - |

## 8. 📊 Métricas de Seguimiento

### Estado Actual de Pruebas:
- ✅ **Casos pasados**: 16/18 (89%)
- ❌ **Casos fallidos**: 1/18 (6%)
- ⚠️ **Casos pendientes**: 1/18 (6%)

### Distribución por Severidad:
- 🔴 **Críticos**: 1 error
- 🟡 **Medios**: 1 errores
- 🟢 **Menores**: 0 errores

## 9. 🎯 Próximos Pasos

1. **Inmediato**: Corregir BUG001 (localStorage error handling)
4. **Medio plazo**: Implementar persistencia completa con recuperación

## 10. 📝 Notas Adicionales

- Las pruebas se ejecutan en entorno de desarrollo local
- Se recomienda automatizar los casos TC001-TC010 con Jest/React Testing Library
- Considerar integración con CI/CD para ejecución automática
- Evaluar herramientas de testing E2E como Cypress para flujos completos

---

**Documento creado**: 06/06/2025  
**Última actualización**: 09/06/2025  
**Versión**: 1.0  
**Responsable**: QA Team

