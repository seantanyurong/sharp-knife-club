const fs = require('fs');
const path = require('path');

module.exports = {
  siteUrl: 'https://www.knifesharpening.sg',
  generateRobotsTxt: true,
  async additionalPaths(config) {
    const dynamicRoutes = await fetchDynamicRoutes();
    const allRoutes = [
      { loc: '/', changefreq: 'daily', priority: 1.0 },
      { loc: '/blog', changefreq: 'daily', priority: 1.0 },
      { loc: '/faq', changefreq: 'daily', priority: 1.0 },
      ...dynamicRoutes.map((route) => ({
        loc: route,
        changefreq: 'daily',
        priority: 1.0,
      }))
    ];
    return allRoutes;
  }
};

async function fetchDynamicRoutes() {
  const articlesDir = path.join(process.cwd(), 'public', 'blog', 'pages');
  const routes = [];

  try {
    const files = fs.readdirSync(articlesDir);

    files.forEach(file => {
      if (path.extname(file) === '.md') {
        const slug = path.basename(file, '.md');
        routes.push(`/blog/${slug}`);
      }
    });
  } catch (error) {
    console.error('Error reading markdown files:', error);
  }

  return routes;
}
