module.exports = {
    siteUrl: 'https://azerbaijapan.xyz',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    exclude: ['/sitemap.xml'], // <= exclude here
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://azerbaijapan.xyz/sitemap.xml', // <==== Add here
        ],
    },
}
