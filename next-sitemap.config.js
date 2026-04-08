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
  const routes = [];

  const blogDir = path.join(process.cwd(), 'public', 'blog', 'pages');
  try {
    const files = fs.readdirSync(blogDir);
    files.forEach(file => {
      if (path.extname(file) === '.md') {
        routes.push(`/blog/${path.basename(file, '.md')}`);
      }
    });
  } catch (error) {
    console.error('Error reading blog markdown files:', error);
  }

  const sharpenSlugs = ['scissors', 'serrated', 'german-knives', 'japanese-knives'];
  sharpenSlugs.forEach(slug => routes.push(`/sharpen/${slug}`));

  const addonSlugs = ['derusting', 'chip-repairs'];
  addonSlugs.forEach(slug => routes.push(`/add-on/${slug}`));

  routes.push('/use-cases');

  const useCasesDir = path.join(process.cwd(), 'public', 'for');
  try {
    const files = fs.readdirSync(useCasesDir);
    files.forEach(file => {
      if (path.extname(file) === '.md') {
        routes.push(`/use-cases/${path.basename(file, '.md')}`);
      }
    });
  } catch (error) {
    console.error('Error reading use-cases markdown files:', error);
  }

  return routes;
}
