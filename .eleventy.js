const { execSync } = require('child_process');

module.exports = function(eleventyConfig) {
    // Passthroughs para archivos estáticos
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("public");
    
    // Watch targets
    eleventyConfig.addWatchTarget("src/assets/css/");
    eleventyConfig.addWatchTarget("src/assets/js/");
    
    // Layouts
    eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
    eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');
    
    // Compilar Tailwind antes de la construcción
    eleventyConfig.on('beforeBuild', () => {
        try {
            console.log('Compilando Tailwind CSS...');
            execSync('npx tailwindcss -i ./src/assets/css/tailwind.css -o ./dist/assets/css/styles.css');
            console.log('Tailwind CSS compilado correctamente');
        } catch (error) {
            console.error('Error al compilar Tailwind CSS:', error);
        }
    });
    
    // Configuración de rutas
    return {
        dir: {
            input: "src",
            output: "dist",
            includes: "_includes",
            data: "_data"
        },
        templateFormats: ["njk", "md", "html"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk"
    };
};