export default {
  title: "nextcloud",
  description: "Documentación nextcloud",
  base: '/nextcloud-docs/',
  themeConfig: {
    logo: "/next.webp",
    siteTitle: "nextcloud",
    // Navbar Link
    nav: [
      { text: "Documentación", link: "/modulos/maxalmacen" }
    ],
    // Sidebar
    sidebar: [
      {
        text: "Section A",
        collapsible: true,
        items: [
          { text: "Introduction", link: "/introduction" },
          { text: "Getting Started", link: "/getting-started" },
        ],
      },
      {
        text: "Section B",
        collapsible: false,
        items: [
          { text: "Introduction", link: "/introduction" },
          { text: "Getting Started", link: "/getting-started" },
        ],
      },
      {
        text: "Section C",
        collapsible: true,
        items: [
          { text: "Introduction", link: "/introduction" },
          { text: "Getting Started", link: "/getting-started" },
        ],
      },
    ],
    markdown: {
      theme: "material-palenight",
      lineNumbers: true,
    },
  },
};
