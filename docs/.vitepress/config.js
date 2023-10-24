import { SearchPlugin } from "vitepress-plugin-search"
import { defineConfig } from "vitepress"

export default defineConfig({
  title: "nextcloud",
  description: "Documentación nextcloud",
  base: '/nextcloud-docs/',
  vite: { 
    plugins: [
      SearchPlugin({
        previewLength: 62,
        buttonLabel: "Buscar",
        placeholder: "Buscar Documentación"
      })
    ]
  },
  themeConfig: {
    logo: "/next.webp",
    siteTitle: "nextcloud",
    sidebar: [
      {
        text: 'Inventario',
        collapsed: true,
        items: [
          { text: 'Formulas', link: '/modulos/inventario/formulas' },
          { text: 'Consulta de Carga', link: '/modulos/inventario/consultaCarga' },
          { text: 'Máximos Almacén', link: '/modulos/inventario/maxalmacen' },
          { text: 'Ranking de Carga', link: '/modulos/inventario/rankCarga' },
          { text: 'Estadistica de Carga', link: '/modulos/inventario/estadisticaCarga' },
          { text: 'Nivel de Servicio', link: '/modulos/inventario/nivelServicio' },
          { text: 'Existencias Costeadas', link: '/modulos/inventario/existCosteadas' },
        ]
      }
    ],
    markdown: {
      theme: "material-palenight",
      lineNumbers: true,
    }
  }
})
