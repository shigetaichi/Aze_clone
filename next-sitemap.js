module.exports = {
    siteUrl: 'https://azerbaijapan.xyz',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    exclude: ['/server-sitemap.xml'], // <= exclude here
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://azerbaijapan.xyz/server-sitemap.xml', // <==== Add here
        ],
    },
}
