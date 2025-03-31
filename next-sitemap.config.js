/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://savesright.com',
    generateRobotsTxt: false, // (optional)
    generateIndexSitemap: false,
    transform: async (config, path) => {
        if(path.includes("stores") || path.includes("category") || path.includes("sitemap") )
        {      return {
            loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
            changefreq: "daily",
            priority:1,
            lastmod: config.autoLastmod ? new Date().toISOString().split('T')[0] : undefined,
        }

        }else{
            return {
                loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
                changefreq: "weekly",
                lastmod: config.autoLastmod ? new Date().toISOString().split('T')[0] : undefined,
            }
        }    
     
    },
    robotsTxtOptions:{
        additionalSitemaps: [ 'https://savesright.com/image-sitemap.xml']
    }
}