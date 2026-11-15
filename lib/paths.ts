// GitHub Pages serves the site from /<repo>/, so static file URLs need the prefix.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${basePath}${path}`;
