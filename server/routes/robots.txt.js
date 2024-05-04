export default defineEventHandler(async (event) => {
    event.node.res.setHeader('content-type', 'text/plain');

    const config = useRuntimeConfig(event);
    const baseUrl = config.public.base_url;

    const result = `User-agent: *
Disallow: /
Sitemap: ${baseUrl}/sitemap.xml
Host: ${baseUrl}
`;

    return result;
});