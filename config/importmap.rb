# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "jquery", to: "https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.js", preload: true
pin "bootstrap", to: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js", preload: true
pin "chart.js", to: "https://cdn.skypack.dev/chart.js"
