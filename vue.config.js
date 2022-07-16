module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @import "@/design/_variables.scss";
                `
            }
        }
    }
};