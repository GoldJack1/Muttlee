const path = require('path')
const CONST = require('./constants.js');


const CONFIG = {
  [CONST.CONFIG.IS_DEV]: false,

  [CONST.CONFIG.LOG_LEVEL_TELETEXT_SERVER]: CONST.LOG_LEVEL_VERBOSE,
  [CONST.CONFIG.LOG_LEVEL_TELETEXT_VIEWER]: CONST.LOG_LEVEL_VERBOSE, // CONST.LOG_LEVEL_INFO,

  // this is used by `update-service-pages.js` as the place where the
  // raw source service pages directories (likely SVN repositories)
  // are located.
  // (Note: service pages are not actually served by Muttlee from here
  //  they need additional renaming first, and are then served from
  //  CONST.CONFIG.SERVICE_PAGES_SERVE_DIR defined below).
  // Render doesn't have `/var/www/...` by default. Keep these inside the repo
  // so `update-service-pages.js` can clone + write safely.
  [CONST.CONFIG.SERVICE_PAGES_DIR]: path.join(__dirname, 'teletext-services'),

  // (Note: this is the root directory for the live service pages,
  //  within it should be individual service subdirectories
  //  e.g. /var/www/private/onair/teefax, /var/www/private/onair/d2k,
  //  etc. matching the id's of the services defined below in
  //  CONST.CONFIG.SERVICES_AVAILABLE)
  // Where `update-service-pages.js` copies `.tti` pages + writes `manifest.json`
  // for consumption by `teletextserver.js`.
  [CONST.CONFIG.SERVICE_PAGES_SERVE_DIR]: path.join(__dirname, 'private', 'onair'),

  [CONST.CONFIG.PAGE_404_PATH]: path.join(__dirname, 'private', 'p404.tti'),
  [CONST.CONFIG.PAGE_404_EDITABLE_PATH]: path.join(__dirname, 'private', 'p404_editable.tti'),

  [CONST.CONFIG.ZAPPER_STANDARD_SVG_PATH]: path.join(__dirname, 'private', 'zapper_standard.svg'),
  [CONST.CONFIG.ZAPPER_COMPACT_SVG_PATH]: path.join(__dirname, 'private', 'zapper_compact.svg'),

  [CONST.CONFIG.SHOW_CONSOLE_LOGO]: true,
  [CONST.CONFIG.CONSOLE_LOGO_CHAR_ARRAY]: [
    '████████████          ███     ███   ███              ',
    '███ ██ ██ ██ ███ ██ ███████ ███████ ███ ██████ ██████',
    '███ ██ ██ ██ ███ ██   ███     ███   ███ ███ ██ ███ ██',
    '███ ██ ██ ██ ███ ██   ███     ███   ███ ██████ ██████',
    '███ ██ ██ ██ ███ ██   ███     ███   ███ ███    ███   ',
    '███ ██ ██ ██ ██████   █████   █████ ███ ██████ ██████',
  ],

  [CONST.CONFIG.TITLE]: 'Muttlee',
  [CONST.CONFIG.HEADER_TITLE]: 'WEBTEXT',

  // Banned IP addresses, all of them Amazon AWS bots making annoying connections during debugging
  [CONST.CONFIG.BANNED_IP_ADDRESSES]: [
    '54.159.215.81',
    '54.161.11.39',
    '54.235.50.87',
    '54.162.45.98',
    '54.162.186.216',
  ],

  [CONST.CONFIG.TELETEXT_VIEWER_SERVE_HTTP]: true,
  // Render injects `PORT` for web services; fall back to 8080 for local runs.
  [CONST.CONFIG.TELETEXT_VIEWER_SERVE_HTTP_PORT]: process.env.PORT ? parseInt(process.env.PORT, 10) : 8080,

  [CONST.CONFIG.TELETEXT_VIEWER_SERVE_HTTPS]: false,
  [CONST.CONFIG.TELETEXT_VIEWER_SERVE_HTTPS_PORT]: 443,

  // Use LetsEncrypt (recommended), or otherwise OpenSSL to generate a local unsigned certificate
  // (will raise a warning in the visitor's web browser):
  //    > openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365
  //    > openssl rsa -in keytmp.pem -out key.pem
  [CONST.CONFIG.TELETEXT_VIEWER_SERVE_HTTPS_KEY_PATH]: '/var/ssl/fullchain.pem',
  [CONST.CONFIG.TELETEXT_VIEWER_SERVE_HTTPS_CERT_PATH]: '/var/ssl/privkey.pem',

  // Allow the viewer to make HTTPS socket.io connections even if SSL certificate is not fully valid?
  // DO NOT SET THIS TO TRUE IN PRODUCTION!
  [CONST.CONFIG.TELETEXT_VIEWER_HTTPS_REJECT_UNAUTHORIZED]: false,


  // service definitions, in the following format:
  //   [id_of_service]: {
  //     // (optional) group name of service
  //     group: str,
  //     // display name of service
  //     name: str,
  //     // (optional) header display name of service
  //     headerTitle: str
  //     // (optional) service credit
  //     credit: str,
  //
  //     // url should be protocol independent (start with //), so that http and https can both be accommodated)
  //     //
  //     // To use this local teletext server, set `url` to '//localhost'
  //     // (also ensure that `port` matches one of the enabled
  //     //  TELETEXT_VIEWER_SERVE_HTTPS_PORT or TELETEXT_VIEWER_SERVE_HTTPS_PORT above)
  //     url: str,
  //     port: int,
  //
  //     // (optional) the character used to separate seconds in the page header display - use ':' or '/'
  //     secondsSeparator: str,
  //     // (optional) whether to force render a service header overriding the page-specific header - false if not defined
  //     forceServiceHeader: bool,
  //
  //     // (optional) whether the service is considered editable - false if not defined
  //     isEditable: bool,
  //
  //     // (optional) the type of repo - Can be 'git' or 'svn' if not defined
  //     repoType: str,
  //
  //     // (optional) SVN or GIT repository containing the service's pages
  //     // If isEditable===true then you must use a git repo, not https
  //     updateUrl: str,
  //     // (optional) number of minutes to wait before checking for updates
  //     updateInterval: int,
  //   }
  // [!] When adding or removing items, constants.js also needs to be updated
  [CONST.CONFIG.SERVICES_AVAILABLE]: {
    [CONST.SERVICE_TEEFAX]: {
      name: 'Webtext',
      url: '//www.xenoxxx.com',
      port: 80,

      secondsSeparator: ':',
      forceServiceHeader: true,

      autoplaySkip: [
        [741, 759],
        [769, 799],
      ],
      repoType: 'svn',
      // Use your own `.tti` pages as the default teletext service.
      repoType: 'git',
      updateUrl: 'https://github.com/GoldJack1/uni-ceefax',
      updateInterval: 20,
    },
  },
  
  // defaults
  [CONST.CONFIG.DEFAULT_SERVICE]: CONST.SERVICE_TEEFAX,
  [CONST.CONFIG.OPEN_SERVICE_IN_NEW_WINDOW]: false,

  [CONST.CONFIG.DEFAULT_CONTROLS]: CONST.CONTROLS_ZAPPER,
  [CONST.CONFIG.DEFAULT_DISPLAY]: CONST.DISPLAY_STANDARD,
  [CONST.CONFIG.DEFAULT_MENU_OPEN]: false,
  [CONST.CONFIG.DEFAULT_SCALE]: 1,
  [CONST.CONFIG.DEFAULT_AUTOPLAY]: CONST.AUTOPLAY_SEQUENTIAL,

  [CONST.CONFIG.DEFAULT_AUTOPLAY_INTERVAL]: 20,       // seconds
  [CONST.CONFIG.DEFAULT_AUTOSAVE_INTERVAL]: 60,       // seconds


  // rendering
  [CONST.CONFIG.NUM_COLUMNS]: 40,
  [CONST.CONFIG.NUM_ROWS]: 25,

  [CONST.CONFIG.CANVAS_WIDTH]: 600,
  [CONST.CONFIG.CANVAS_HEIGHT]: 510,
  [CONST.CONFIG.CANVAS_PADDING_RIGHT_SINGLE_COLUMN]: true,
  [CONST.CONFIG.TELETEXT_FONT_SIZE]: 20,


  // explicitly whitelist config values that are available in the frontend
  [CONST.CONFIG.FRONTEND_CONFIG_KEYS]: [
    CONST.CONFIG.LOG_LEVEL_TELETEXT_VIEWER,

    CONST.CONFIG.TITLE,
    CONST.CONFIG.HEADER_TITLE,

    CONST.CONFIG.TELETEXT_VIEWER_SERVE_HTTP,
    CONST.CONFIG.TELETEXT_VIEWER_SERVE_HTTP_PORT,

    CONST.CONFIG.TELETEXT_VIEWER_SERVE_HTTPS,
    CONST.CONFIG.TELETEXT_VIEWER_SERVE_HTTPS_PORT,

    CONST.CONFIG.TELETEXT_VIEWER_HTTPS_REJECT_UNAUTHORIZED,

    CONST.CONFIG.SERVICES_AVAILABLE,

    CONST.CONFIG.DEFAULT_SERVICE,
    CONST.CONFIG.DEFAULT_CONTROLS,
    CONST.CONFIG.DEFAULT_DISPLAY,
    CONST.CONFIG.DEFAULT_MENU_OPEN,
    CONST.CONFIG.DEFAULT_SCALE,
    CONST.CONFIG.DEFAULT_AUTOPLAY,

    CONST.CONFIG.DEFAULT_AUTOPLAY_INTERVAL,
    CONST.CONFIG.DEFAULT_AUTOSAVE_INTERVAL,

    CONST.CONFIG.OPEN_SERVICE_IN_NEW_WINDOW,

    CONST.CONFIG.NUM_COLUMNS,
    CONST.CONFIG.NUM_ROWS,

    CONST.CONFIG.CANVAS_WIDTH,
    CONST.CONFIG.CANVAS_HEIGHT,
    CONST.CONFIG.CANVAS_PADDING_RIGHT_SINGLE_COLUMN,
    CONST.CONFIG.TELETEXT_FONT_SIZE,
  ],
};


if (typeof exports === 'object') {
  module.exports = CONFIG;
}
