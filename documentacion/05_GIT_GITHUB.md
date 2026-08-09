# Git y GitHub

## Repositorio correcto

La pagina de venta debe tener un solo repositorio local en:

```text
C:\Users\Antonie\Documents\PaginaVenta
```

No debe existir otro `.git` dentro de subcarpetas.

## Archivos que no van a Git

`.gitignore` evita versionar variables locales, paquetes, builds, logs y archivos comprimidos.

## Publicar como privado

Crear en GitHub un repositorio privado, por ejemplo:

```text
https://github.com/AntonieNT/cerrajeria-pos-pagina-venta
```

Luego ejecutar:

```powershell
cd "C:\Users\Antonie\Documents\PaginaVenta"
git remote add origin https://github.com/AntonieNT/cerrajeria-pos-pagina-venta.git
git push -u origin main
```

## Agrupacion recomendada

GitHub no tiene carpetas reales para repositorios personales. Para agrupar los cuatro proyectos conviene usar una organizacion privada o nombres con el mismo prefijo `cerrajeria-pos-*`.
