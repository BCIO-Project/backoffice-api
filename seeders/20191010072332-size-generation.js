'use strict';



const findInArray = (arr, needle) => {
    for (let elem in arr) {
        if (arr[elem].name === needle)
            return arr[elem].id
    }
    return false;
};

module.exports = {

    up: async (queryInterface, Sequelize) => {

        try {

            const pages = await queryInterface.sequelize.query(
                `SELECT id, name from "Pages";`
            );

            await queryInterface.bulkInsert('Sizes', [
                {
                    pageId: findInArray(pages[0], 'El País - PORTADA'),
                    name: "PREMIUM",
                    height: 360,
                    width: 640,
                    class: "foto_premium",
                    template: '<article class=\"articulo\" itemscope=\"\" itemtype=\"https:\/\/schema.org\/NewsArticle\" itemref=\"organizacion\">\r\n    <div class=\"articulo__interior\">\r\n        <div class=\"articulo-antetitulo {{css_header_article}} \">\r\n            <a class=\"enlace\" href=\"{{head_link}}\">\r\n                {{head_text}}\r\n            <\/a>\r\n        <\/div>\r\n        <figure class=\"foto  foto_w1200\" itemprop=\"image\" itemscope=\"\" itemtype=\"https:\/\/schema.org\/ImageObject\">\r\n            <a href=\"{{offer_url}}\">\r\n                <img src=\"{{image}}\" alt=\"{{alt_image}}\">\r\n                <meta itemprop=\"width\" content=\"1200\">\r\n                <meta itemprop=\"height\" content=\"675\">\r\n                <meta itemprop=\"url\"\r\n                    content=\"{{image}}\">\r\n            <\/a>\r\n        <\/figure>\r\n        <h2 itemprop=\"headline\" class=\"articulo-titulo\">\r\n            <a href=\"{{offer_url}}\">{{headline}}<\/a>\r\n        <\/h2>\r\n        <div class=\"articulo-metadatos\">\r\n            <div class=\"articulo-datos\">\r\n            <\/div>\r\n        <\/div>\r\n        <meta itemscope=\"\" itemprop=\"mainEntityOfPage\" itemtype=\"https:\/\/schema.org\/WebPage\"\r\n            itemid=\"{{offer_url}}\">\r\n        <meta content=\"2019-10-24T13:12:00+02:00\" itemprop=\"datePublished\">\r\n        <meta content=\"2019-10-24T13:12:00+02:00\" itemprop=\"dateModified\">\r\n    <\/div>\r\n<\/article>',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    pageId: findInArray(pages[0], 'El País - PORTADA'),
                    name: "Standard",
                    height: 257,
                    width: 360,
                    class: "foto_w360",
                    template: '<div class=\"articulo__interior\">\r\n        <div class=\"articulo-antetitulo antetitulo_comercial_generico \">\r\n            <span class=\"sin_enlace\">\r\n                \r\n            <\/span> <\/div>\r\n        <figure class=\"foto  {{css_size}}\" itemprop=\"image\" itemscope=\"\" itemtype=\"https:\/\/schema.org\/ImageObject\">\r\n            <a href=\"{{offerUrl}}\"\r\n                class=\"posicionador\">\r\n                <span class=\"boton_video\"><\/span>\r\n                <img src=\"{{image}}\" alt=\"{{headline}}\" width=\"{{width}}\" height=\"{{height}}\">\r\n                <meta itemprop=\"width\" content=\"{{width}}\">\r\n                <meta itemprop=\"height\" content=\"{{height}}\">\r\n                <meta itemprop=\"url\"\r\n                    content=\"{{image}}\">\r\n            <\/a>\r\n        <\/figure>\r\n        <h2 itemprop=\"headline\" class=\"articulo-titulo\">\r\n            <a href=\"{{offerUrl}}\">{{headline}}<\/a>\r\n        <\/h2>\r\n        <div class=\"articulo-metadatos\">\r\n            <div class=\"articulo-datos\">\r\n            <\/div>\r\n        <\/div>\r\n        <p class=\"articulo-entradilla\" itemprop=\"description\">FedEx conecta personas y oportunidades.<\/p>\r\n        <meta itemscope=\"\" itemprop=\"mainEntityOfPage\" itemtype=\"https:\/\/schema.org\/WebPage\"\r\n            itemid=\"{{offerUrl}}\">\r\n        <meta content=\"{{createdAt}}\" itemprop=\"datePublished\">\r\n        <meta content=\"{{updatedAt}}\" itemprop=\"dateModified\">\r\n    <\/div>',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }, {
                    pageId: findInArray(pages[0], 'El País - SOCIEDAD'),
                    name: "PREMIUM",
                    height: 675,
                    width: 1200,
                    class: "c_chain",
                    template: `<a class="kicker | {{kickerClass}}" href="{{kickerUrl}}">
                    <span>{{kickerText}}</span>
                    </a>
                    <figure class="story_card_image | block margin_bottom_xs width_full">
                    <a href="{{offerUrl}}" class="image_link | width_full block relative">
                        <div class="watermark relative ">
                        <img src="{{image}}" alt="{{alt_image}}">
                        <meta itemprop="width" content="1200">
                        <meta itemprop="height" content="675">
                        <meta itemprop="url" content="{{image}}">
                        </div>
                    </a>
                    </figure>
                    <h2 class="headline | color_gray_ultra_dark font_secondary width_full  headline_md ">
                    <a href="{{offerUrl}}">{{headline}}</a>
                    </h2>
                    <div class="byline | uppercase color_gray_ultra_dark margin_bottom width_full">
                    <span class=" false"><a href="{{authorLink}}" class="author">{{author}}</a></span>  
                    </div>`,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    pageId: findInArray(pages[0], 'El País - SOCIEDAD'),
                    name: "PLATA",
                    height: 675,
                    width: 1200,
                    class: "middle_row",
                    template: `<a class="kicker | {{kickerClass}}" href="{{kickerUrl}}">
                    <span>{{kickerText}}</span>
                    </a>
                    <figure class="story_card_image | block margin_bottom_xs width_full">
                    <a href="{{offerUrl}}" class="image_link | width_full block relative">
                        <div class="watermark relative ">
                        <img src="{{image}}" alt="{{alt_image}}">
                        <meta itemprop="width" content="1200">
                        <meta itemprop="height" content="675">
                        <meta itemprop="url" content="{{image}}">
                        </div>
                    </a>
                    </figure>
                    <h2 class="headline | color_gray_ultra_dark font_secondary width_full  headline_md ">
                    <a href="{{offerUrl}}">{{headline}}</a>
                    </h2>
                    <div class="byline | uppercase color_gray_ultra_dark margin_bottom width_full">
                    <span class=" false"><a href="{{authorLink}}" class="author">{{author}}</a></span>  
                    </div>`,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }, {
                    pageId: findInArray(pages[0], 'El País - SOCIEDAD'),
                    name: "BRONCE",
                    height: 675,
                    width: 1200,
                    class: "frieze_chain",
                    template: `<a class="kicker | {{kickerClass}}" href="{{kickerUrl}}">
                        <span>{{kickerText}}</span>
                        </a>
                        <figure class="story_card_image | block margin_bottom_xs width_full">
                        <a href="{{offerUrl}}" class="image_link | width_full block relative">
                            <div class="watermark relative ">
                            <img src="{{image}}" alt="{{alt_image}}">
                            <meta itemprop="width" content="1200">
                            <meta itemprop="height" content="675">
                            <meta itemprop="url" content="{{image}}">
                            </div>
                        </a>
                        </figure>
                        <h2 class="headline | color_gray_ultra_dark font_secondary width_full  headline_md ">
                        <a href="{{offerUrl}}">{{headline}}</a>
                        </h2>
                        <div class="byline | uppercase color_gray_ultra_dark margin_bottom width_full">
                        <span class=" false"><a href="{{authorLink}}" class="author">{{author}}</a></span>  
                        </div>`,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }, {
                    pageId: findInArray(pages[0], 'El País - SOCIEDAD'),
                    name: "CUADRADO",
                    height: 257,
                    width: 360,
                    class: "bottom_row",
                    template: `<a class="kicker | {{kickerClass}}" href="{{kickerUrl}}">
                        <span>{{kickerText}}</span>
                        </a>
                        <figure class="story_card_image | block margin_bottom_xs width_full">
                        <a href="{{offerUrl}}" class="image_link | width_full block relative">
                            <div class="watermark relative ">
                            <img src="{{image}}" alt="{{alt_image}}">
                            <meta itemprop="width" content="1200">
                            <meta itemprop="height" content="675">
                            <meta itemprop="url" content="{{image}}">
                            </div>
                        </a>
                        </figure>
                        <h2 class="headline | color_gray_ultra_dark font_secondary width_full  headline_md ">
                        <a href="{{offerUrl}}">{{headline}}</a>
                        </h2>
                        <div class="byline | uppercase color_gray_ultra_dark margin_bottom width_full">
                        <span class=" false"><a href="{{authorLink}}" class="author">{{author}}</a></span>  
                        </div>`,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                } 
                , {
                    pageId: findInArray(pages[0], 'El País - SMODA'),
                    name: "Vertical",
                    height: 605,
                    width: 450,
                    class: "even",
                    template: '<article class=\"post__archive post clear hentry {{css_size}} destacados format-gallery\" data-vr-contentbox=\"\">\r\n    <p class=\"nombre-categoria\">\r\n        <a href=\"https:\/\/www.emenia.es\/demos\/smoda\/belleza\/\">\r\n            Belleza <\/a>\r\n    <\/p>\r\n    <a href=\"{{offerUrl}}\"\r\n        title=\"Galer\u00EDa vertical branded + bot\u00F3n compra\" class=\"enlace-imagen\">\r\n        <img src=\"{{image}}\" alt=\"{{headline}}\" width=\"{{width}}\" height=\"{{height}}\">\r\n    <\/a>\r\n    <div class=\"post__contenido\">\r\n        <header class=\"entry-header\">\r\n            <p class=\"marca-patrocinadora\">{{headline}}<\/p>\r\n            <h2 class=\"entry-title\">\r\n                <a href=\"{{offerUrl}}\"\r\n                    title=\"Galer\u00EDa vertical branded + bot\u00F3n compra\">\r\n                    Galer\u00EDa vertical branded + bot\u00F3n compra <\/a>\r\n            <\/h2>\r\n            <div class=\"entry-meta\">\r\n                <a href=\"https:\/\/www.emenia.es\/demos\/smoda\/author\/juandbbam\/\">Juan Bustamante<\/a>\r\n            <\/div><!-- .entry-meta -->\r\n        <\/header><!-- .entry-header -->\r\n    <\/div><!-- \/ .post__contenido -->\r\n<\/article>\r\n\r\n',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    pageId: findInArray(pages[0], 'El País - SMODA'),
                    name: "Landscape",
                    height: 480,
                    width: 635,
                    class: "odd",
                    template: '<article class=\"post__archive post clear hentry {{css_size}} destacados format-standard\" data-vr-contentbox=\"\">\r\n    <p class=\"nombre-categoria\">\r\n        <a href=\"https:\/\/www.emenia.es\/demos\/smoda\/moda\/\">\r\n            Moda <\/a>\r\n    <\/p>\r\n    <a href=\"{{offerUrl}}\"\r\n        title=\"ContentApi Art\u00EDculo normal foto highlight\" class=\"enlace-imagen\">\r\n        <img src=\"{{image}}\" alt=\"{{headline}}\" width=\"{{width}}\" height=\"{{height}}\">\r\n    <\/a>\r\n    <div class=\"post__contenido\">\r\n        <header class=\"entry-header\">\r\n            <h2 class=\"entry-title\">\r\n                <a href=\"{{offerUrl}}\"\r\n                    title=\"ContentApi Art\u00EDculo normal foto highlight\">\r\n                    {{headline}} <\/a>\r\n            <\/h2>\r\n            <div class=\"entry-meta\">\r\n                <a href=\"https:\/\/www.emenia.es\/demos\/smoda\/author\/gmontero\/\">gmontero<\/a>\r\n            <\/div><!-- .entry-meta -->\r\n        <\/header><!-- .entry-header -->\r\n    <\/div><!-- \/ .post__contenido -->\r\n<\/article>',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ], {});
        } catch (e) {
            console.log(e);
        };

    },

    down: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.sequelize.query(`TRUNCATE TABLE "Sizes";`);
        } catch (e) {
            console.log(e);
        }
    }
};
