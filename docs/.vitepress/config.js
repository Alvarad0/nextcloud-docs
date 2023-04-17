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
          { text: 'Formulas', link: '/modulos/Inventarios/formulas' },
          { text: 'Consulta de Carga', link: '/modulos/Inventarios/consultaCarga' },
          { text: 'Máximos Almacén', link: '/modulos/Inventarios/maxalmacen' }
        ]
      }
    ],
    markdown: {
      theme: "material-palenight",
      lineNumbers: true,
    },
  },
};
