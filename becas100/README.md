# Becas100

Plataforma web estática para descubrir **becas con cobertura 100%**, segmentadas por categoría, país, modalidad, nivel y estado.

## Qué incluye
- Catálogo de oportunidades 100% verificadas.
- Filtros y buscador instantáneo.
- Favoritos guardados en el navegador.
- Estados: abierta, próximamente y cerrada.
- Fuentes oficiales configurables.
- GitHub Action diaria para revisar estados y detectar nuevas candidatas.
- Separación entre `scholarships.json` (verificadas) y `candidates.json` (detección automática pendiente de revisión).

## Ejecutar localmente
```bash
cd becas100
python -m http.server 8080
```
Abre `http://localhost:8080`.

## Actualización diaria
El workflow del repositorio ejecuta:
```bash
python becas100/scripts/update_scholarships.py
```
La detección automática busca evidencia explícita de cobertura total. Si no puede garantizar el 100%, la oportunidad no se publica en el catálogo verificado.

## Agregar una beca verificada
Edita `data/scholarships.json` respetando el esquema existente y usa `verified100: true` solo cuando la fuente oficial confirme la cobertura completa.
