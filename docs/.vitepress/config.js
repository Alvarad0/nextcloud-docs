export default {
  title: "nextcloud",
  description: "Documentación nextcloud",
  base: '/nextcloud-docs/',
  themeConfig: {
    logo: "/next.webp",
    siteTitle: "nextcloud",
    sidebar: [
      {
        text: 'Inventario',
        collapsed: true,
        items: [
          { text: 'Formulas', link: '/modulos/inventarios/formulas' },
          { text: 'Consulta de Carga', link: '/modulos/inventarios/consultaCarga' },
          { text: 'Máximos Almacén', link: '/modulos/inventarios/maxalmacen' }
        ]
      }
    ],
    markdown: {
      theme: "material-palenight",
      lineNumbers: true,
    },
  },
};
