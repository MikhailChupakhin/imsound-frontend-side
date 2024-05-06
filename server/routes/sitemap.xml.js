export default defineEventHandler(async (event) => {
    event.node.res.setHeader('content-type', 'text/xml');

    const config = useRuntimeConfig(event);
    const baseUrl = config.public.base_url;
    const BASE_API_URL = config.public.apiBase;

    const data = await $fetch(BASE_API_URL+'sitemap')

    let result = '';
    result += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    result += `
        <url>
            <loc>${config.public.base_url}</loc>
            <priority>1.0</priority>
            <changefreq>weekly</changefreq>
        </url>
        <url>
            <loc>${config.public.base_url}/blog</loc>
            <priority>1.0</priority>
            <changefreq>weekly</changefreq>
        </url>
     `;
    
    for (const item of data) {
        const { frontend_path, priority, changefreq, updated_at } = item.sitemap_item;
        result += `
            <url>
                <loc>${config.public.base_url}${frontend_path}</loc>
                <priority>${priority}</priority>
                <changefreq>${changefreq}</changefreq>
        `;
        if (updated_at) {
            result += `<lastmod>${new Date(updated_at).toISOString()}</lastmod>`;
        }
        result += `
            </url>
        `;
    }
    result += '</urlset>';
    return result;
});