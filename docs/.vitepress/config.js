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
          { text: 'Formulas', link: '/modulos/formulas' },
          { text: 'Máximos Almacén', link: '/modulos/maxalmacen' }
        ]
      }
    ],
    markdown: {
      theme: "material-palenight",
      lineNumbers: true,
    },
  },
};
