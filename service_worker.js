let CACHE_NAME = "ROBSKI-Cache";

const htmlFiles = [
	"403.html",
	"admin_dashboard.html",
	"admin_dashboard2.html",
	"admin_login.html",
	"checkout.html",
	"cloth.html",
	"about_us.html",
	"index.html",
	"map.html",
	"privacy_policy.html",
	"shoe.html",
	"weather.html",
];

const jsonFiles = ["json/cloth.json", "json/shoe.json"];

const jsFiles = [
	"service_worker.js",
	"js/assignment/active-users.js",
	"js/assignment/admin_auth.js",
	"js/assignment/admin_dashboard.js",
	"js/assignment/cart.js",
	"js/assignment/checkout.js",
	"js/assignment/cube.js",
	"js/assignment/google_map.js",
	"js/assignment/wscript.js",
	"js/template/bootstrap.min.js",
	"js/template/date-range-s.js",
	"js/template/jquery-3.2.1.min.js",
	"js/template/jquery.nicescroll.min.js",
	"js/template/main.js",
	"js/template/mixitup.min.js",
	"js/template/owl.carousel.min.js",
	"js/template/sly.min.js",
	"js/template/view-selector2.js",
	"js/assignment/web_push.js",
	"js/assignment/notification.js",
];

const imgFiles = [
	"img/cloth/1.jpg",
	"img/cloth/1cube.jpg",
	"img/cloth/2.png",
	"img/cloth/2crop.png",
	"img/cloth/2cube.jpg",
	"img/cloth/3.jpg",
	"img/cloth/3crop.jpg",
	"img/cloth/3cube.jpg",
	"img/cloth/4.png",
	"img/cloth/4crop.png",
	"img/cloth/4cube.jpg",
	"img/cloth/5.png",
	"img/cloth/5crop.png",
	"img/cloth/5cube.jpg",
	"img/cloth/6.jpg",
	"img/cloth/6crop.jpg",
	"img/cloth/6cube.jpg",
	"img/icons/weather_icons/01d.png",
	"img/icons/weather_icons/02d.png",
	"img/icons/weather_icons/03d.png",
	"img/icons/weather_icons/04d.png",
	"img/icons/weather_icons/09d.png",
	"img/icons/weather_icons/10d.png",
	"img/icons/weather_icons/11d.png",
	"img/icons/weather_icons/13d.png",
	"img/icons/weather_icons/50d.png",
	"img/icons/weather_icons/01n.png",
	"img/icons/weather_icons/02n.png",
	"img/icons/weather_icons/03n.png",
	"img/icons/weather_icons/04n.png",
	"img/icons/weather_icons/09n.png",
	"img/icons/weather_icons/10n.png",
	"img/icons/weather_icons/11n.png",
	"img/icons/weather_icons/13n.png",
	"img/icons/weather_icons/50n.png",
	"img/icons/weather_icons/unknown.png",
	"img/icons/bag.png",
	"img/icons/bag.png",
	"img/icons/check.png",
	"img/icons/eye.png",
	"img/icons/heart.png",
	"img/icons/icon-google.png",
	"img/icons/layout-1.png",
	"img/icons/layout-2.png",
	"img/icons/search.png",
	"img/icons/shoppingcart1.png",
	"img/map/fallback_robski_map.png",
	"img/shoe/1crop.jpg",
	"img/shoe/1cube.jpg",
	"img/shoe/2crop.png",
	"img/shoe/2cube.jpg",
	"img/shoe/3crop.png",
	"img/shoe/3cube.jpg",
	"img/shoe/4crop.png",
	"img/shoe/4cube.jpg",
	"img/shoe/5crop.jpg",
	"img/shoe/5cube.jpg",
	"img/shoe/6crop.jpg",
	"img/shoe/6cube.jpg",
	"img/shoe/30.jpg",
	"img/shoe/60.jpg",
	"img/bg.jpg",
	"img/black.jfif",
	"img/categorie-page-top.png",
	"img/favicon.ico",
	"img/img3.jpg",
	"img/img6.jpg",
	"img/logo_short.jpg",
	"img/logo2.png",
	"img/page-info-art.png",
	"img/websitelogo.png",
	"img/white.jpg",
];

const cssFiles = [
	"assignment/button3d.css",
	"assignment/cart.css",
	"assignment/cube.css",
	"assignment/style_403.css",
	"assignment/style_admin_dashboard.css",
	"assignment/style_admin_login.css",
	"template/animate.css",
	"template/bootstrap.min.css",
	"template/chartjs-visualizations.css",
	"template/font-awesome.min.css",
	"template/owl.carousel.css",
	"template/style.css",
];

const iconFontFiles = [
	"fonts/Futura.woff",
	"fonts/Futura1.woff",
	"fonts/Montserrat-Medium.tff",
	"fonts/Montserrat-SemiBold.tff",
	"icon-fonts/fontawesome-webfont.eot",
	"icon-fonts/fontawesome-webfont.svg",
	"icon-fonts/fontawesome-webfont.woff",
	"icon-fonts/fontawesome-webfont.woff2",
];

let urlsToCache = ["/"].concat(
	htmlFiles,
	cssFiles,
	jsFiles,
	jsonFiles,
	imgFiles,
	iconFontFiles
);

self.addEventListener("install", function (event) {
	// Perform install steps
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then(function (cache) {
				console.log("Opened cache");
				return cache.addAll(urlsToCache);
			})
			.catch((err) => console.log(err))
	);
});

self.addEventListener("fetch", function (event) {
	event.respondWith(
		caches
			.match(event.request)
			.then(function (response) {
				// Cache hit - return response
				if (response) {
					return response;
				}

				return fetch(event.request).then(function (
					response
				) {
					// Check if we received a valid response
					if (
						!response ||
						response.status !== 200 ||
						response.type !== "basic"
					) {
						return response;
					}

					// IMPORTANT: Clone the response. A response is a stream
					// and because we want the browser to consume the response
					// as well as the cache consuming the response, we need
					// to clone it so we have two streams.
					var responseToCache = response.clone();

					caches.open(CACHE_NAME).then(function (
						cache
					) {
						cache.put(
							event.request,
							responseToCache
						);
					});

					return response;
				});
			})
			.catch((err) => console.log(err))
	);
});

// self.addEventListener("activate", function (event) {
//     // var cacheAllowlist = ["pages-cache-v1", "blog-posts-cache-v1"];

//     event.waitUntil(
//         caches.keys().then(function (cacheNames) {
//             return Promise.all(
//                 cacheNames.map(function (cacheName) {
//                     if (cacheAllowlist.indexOf(cacheName) === -1) {
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         })
//     );
// });
