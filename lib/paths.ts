// Without a custom domain, GitHub Pages serves the site from /<repo>/, so static
// file URLs need that prefix. The Pages action sets it; it is empty on saniaasif.org.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${basePath}${path}`;
