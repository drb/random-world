/**
 * File extension data - 500+ extensions organized by category
 */

const extensions = [
    // Documents
    'doc', 'docx', 'docm', 'dot', 'dotx', 'dotm', 'docb',
    'pdf', 'rtf', 'txt', 'odt', 'ods', 'odp', 'odg', 'odf',
    'xls', 'xlsx', 'xlsm', 'xlt', 'xltx', 'xltm', 'xlsb', 'xla', 'xlam', 'xll', 'xlw',
    'ppt', 'pptx', 'pptm', 'pot', 'potx', 'potm', 'pps', 'ppsx', 'ppsm',
    'csv', 'tsv', 'json', 'xml', 'yaml', 'yml', 'toml', 'ini', 'cfg', 'conf',
    'md', 'markdown', 'rst', 'tex', 'latex', 'bib',
    'log', 'msg', 'pages', 'key', 'numbers', 'wpd', 'wps',
    'epub', 'mobi', 'azw', 'azw3', 'fb2', 'djvu', 'chm',

    // Images
    'jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'tif', 'webp', 'avif', 'heic', 'heif',
    'svg', 'eps', 'ai', 'psd', 'xcf', 'cdr', 'sketch',
    'ico', 'icns', 'cur', 'ani',
    'raw', 'cr2', 'cr3', 'nef', 'nrw', 'arw', 'dng', 'orf', 'rw2', 'pef', 'raf', 'srw',
    'exr', 'hdr', 'dds', 'tga', 'pcx', 'pbm', 'pgm', 'ppm', 'pnm',
    'jfif', 'jpe', 'jp2', 'jpx', 'j2k', 'j2c',
    'psb', 'pdd', 'indd', 'indt', 'idml',
    'fig', 'xd', 'afdesign', 'afphoto', 'afpub',

    // Audio
    'mp3', 'wav', 'flac', 'aac', 'ogg', 'oga', 'opus', 'wma', 'aiff', 'aif', 'aifc',
    'm4a', 'm4b', 'm4p', 'm4r', 'amr', 'ape', 'au', 'ra', 'ram', 'mid', 'midi',
    'mka', 'ac3', 'dts', 'dtshd', 'mpc', 'wv', 'tak', 'tta', 'shn', 'cda',
    'spx', 'gsm', 'dss', 'msv', 'caf', 'sd2', 'w64', 'rf64',

    // Video
    'mp4', 'mkv', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mpeg', 'mpg', 'm4v',
    'vob', 'ogv', 'ogm', 'rm', 'rmvb', 'asf', 'divx', 'xvid', 'ts', 'mts', 'm2ts',
    '3gp', '3g2', 'f4v', 'f4p', 'f4a', 'f4b', 'swf', 'drc', 'gifv', 'mng',
    'qt', 'yuv', 'amv', 'm2v', 'svi', 'mxf', 'roq', 'nsv', 'rec',

    // Archives
    'zip', 'rar', '7z', 'tar', 'gz', 'gzip', 'bz2', 'bzip2', 'xz', 'lz', 'lzma', 'lzo',
    'z', 'cab', 'arj', 'lzh', 'lha', 'ace', 'zoo', 'arc', 'pak', 'sit', 'sitx',
    'sea', 'bin', 'hqx', 'dmg', 'iso', 'img', 'toast', 'vcd', 'nrg', 'mdf', 'mds',
    'cpio', 'shar', 'a', 'ar', 'deb', 'rpm', 'tgz', 'tbz', 'tbz2', 'txz', 'tlz',
    'zst', 'zstd', 'sz', 'rz', 'lz4', 'br', 'apk', 'ipa', 'xpi', 'crx',
    'war', 'ear', 'aar', 'jar', 'jmod',

    // Programming - Web
    'html', 'htm', 'xhtml', 'mhtml', 'mht',
    'css', 'scss', 'sass', 'less', 'styl', 'stylus',
    'js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'mts', 'cts',
    'vue', 'svelte', 'astro', 'mdx',
    'php', 'phtml', 'php3', 'php4', 'php5', 'php7', 'phps',
    'asp', 'aspx', 'cshtml', 'vbhtml', 'razor',
    'jsp', 'jspx', 'jspf', 'tld',
    'ejs', 'pug', 'jade', 'hbs', 'handlebars', 'mustache', 'njk', 'twig', 'jinja', 'jinja2',

    // Programming - General
    'c', 'h', 'cpp', 'cc', 'cxx', 'hpp', 'hh', 'hxx', 'c++', 'h++',
    'cs', 'csx', 'vb', 'vbs', 'bas', 'cls', 'frm', 'frx',
    'java', 'class', 'kotlin', 'kt', 'kts', 'groovy', 'gvy', 'gy', 'gsh',
    'scala', 'sc', 'clj', 'cljs', 'cljc', 'edn',
    'py', 'pyc', 'pyo', 'pyw', 'pyz', 'pyd', 'pyi',
    'rb', 'rbw', 'rake', 'gemspec', 'erb', 'haml', 'slim',
    'pl', 'pm', 'pod', 't', 'cgi',
    'lua', 'luac',
    'r', 'rdata', 'rds', 'rmd',
    'go', 'mod', 'sum',
    'rs', 'rlib',
    'swift', 'swiftmodule', 'swiftdoc',
    'm', 'mm', 'pch',
    'f', 'f90', 'f95', 'f03', 'f08', 'for', 'ftn', 'fpp',
    'd', 'di',
    'nim', 'nims', 'nimble',
    'zig', 'zon',
    'v', 'vh', 'sv', 'svh',
    'vhd', 'vhdl',
    'asm', 's', 'inc',
    'pas', 'pp', 'dpr', 'dpk', 'dfm', 'lfm', 'lpr', 'lpk',
    'ada', 'adb', 'ads',
    'cob', 'cbl', 'cpy',
    'erl', 'hrl', 'ex', 'exs', 'eex', 'leex', 'heex',
    'hs', 'lhs', 'cabal',
    'ml', 'mli', 'mll', 'mly', 'fs', 'fsi', 'fsx', 'fsscript',
    'lisp', 'lsp', 'el', 'elc', 'scm', 'ss', 'rkt',
    'tcl', 'tk',
    'pro', 'prolog',
    'st', 'squeak',

    // Shell and Scripts
    'sh', 'bash', 'zsh', 'csh', 'tcsh', 'ksh', 'fish',
    'bat', 'cmd', 'ps1', 'psm1', 'psd1', 'ps1xml',
    'awk', 'sed', 'make', 'makefile', 'mk', 'cmake', 'ninja',

    // Data and Database
    'sql', 'sqlite', 'sqlite3', 'db', 'db3', 'mdb', 'accdb', 'dbf', 'sdf',
    'bson', 'avro', 'parquet', 'orc', 'arrow', 'feather',
    'graphql', 'gql', 'prisma',
    'proto', 'protobuf', 'thrift', 'capnp', 'flatbuffers',

    // Config and Settings
    'env', 'properties', 'prefs', 'plist',
    'gitignore', 'gitattributes', 'gitmodules', 'gitkeep',
    'dockerignore', 'dockerfile', 'docker', 'compose',
    'editorconfig', 'prettierrc', 'eslintrc', 'babelrc', 'tsconfig',
    'npmrc', 'npmignore', 'yarnrc', 'nvmrc', 'rvmrc',
    'htaccess', 'htpasswd', 'htgroups',

    // Executable and Binary
    'exe', 'dll', 'so', 'dylib', 'a', 'lib', 'o', 'obj',
    'com', 'msi', 'msix', 'appx', 'appxbundle',
    'app', 'bundle', 'framework', 'kext', 'plugin',
    'sys', 'drv', 'vxd', 'ocx', 'cpl', 'scr',
    'bin', 'elf', 'axf', 'out', 'prx', 'puff',
    'ko', 'mod',

    // Fonts
    'ttf', 'otf', 'woff', 'woff2', 'eot', 'fon', 'fnt',
    'pfb', 'pfm', 'afm', 'tfm', 'bdf', 'pcf', 'snf', 'psf',
    'sfd', 'ufo', 'glif', 'vfb', 'ttc', 'dfont',

    // 3D and CAD
    'obj', 'fbx', 'dae', 'gltf', 'glb', 'stl', 'ply', '3ds', 'blend', 'max',
    'c4d', 'ma', 'mb', 'lwo', 'lws', 'x3d', 'wrl', 'vrml',
    'dwg', 'dxf', 'dgn', 'rvt', 'rfa', 'rte', 'rft',
    'stp', 'step', 'iges', 'igs', 'sat', 'sab', 'x_t', 'x_b',
    'skp', 'skb', 'layout', 'style',

    // GIS and Maps
    'shp', 'shx', 'dbf', 'prj', 'kml', 'kmz', 'gpx', 'osm', 'pbf',
    'geojson', 'topojson', 'gml',

    // Scientific
    'mat', 'fig', 'mlx', 'slx', 'mdl',
    'nb', 'cdf', 'wl', 'm',
    'fits', 'fit', 'fts',
    'hdf', 'hdf4', 'hdf5', 'h5', 'he5', 'nc', 'nc4', 'netcdf',
    'pdb', 'mol', 'mol2', 'sdf', 'cif', 'xyz',

    // Game Development
    'unity', 'unitypackage', 'prefab', 'asset', 'meta',
    'uasset', 'umap', 'uproject', 'uplugin',
    'gd', 'tscn', 'tres', 'godot',
    'rpgmvp', 'rpgmvo', 'rpgmvm',

    // Security and Crypto
    'pem', 'crt', 'cer', 'der', 'pfx', 'p12', 'p7b', 'p7c', 'p7s',
    'key', 'pub', 'csr', 'jks', 'keystore', 'truststore',
    'gpg', 'pgp', 'asc', 'sig', 'kbx', 'kdb', 'kdbx',
    'enc', 'aes', 'gpg',

    // Virtual Machines
    'vmdk', 'vmx', 'vmxf', 'vmsd', 'vmsn', 'nvram',
    'vdi', 'vbox', 'vbox-prev',
    'vhd', 'vhdx', 'avhd', 'avhdx',
    'qcow', 'qcow2', 'qed', 'raw',
    'ova', 'ovf',
    'vagrant', 'vagrantfile',

    // Backup
    'bak', 'backup', 'old', 'orig', 'tmp', 'temp', 'swp', 'swo',
    'bkp', 'bkf', 'tbk', 'spf', 'spi', 'xlk', 'wbk',

    // Email
    'eml', 'emlx', 'mbox', 'pst', 'ost', 'dbx', 'maildir',
    'ics', 'ical', 'ifb', 'vcf', 'vcard',

    // Misc
    'torrent', 'magnet',
    'nfo', 'diz', 'sfv', 'md5', 'sha1', 'sha256', 'crc',
    'url', 'webloc', 'desktop', 'lnk',
    'part', 'crdownload', 'download', 'partial'
];

export default extensions;
