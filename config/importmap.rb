# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "primitives", preload: true
pin "bootstrap", to: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js", preload: true
pin "chart.js", to: "chartjs.js" # @4.5.1
pin "@rails/ujs", to: "@rails--ujs.js" # @7.0.8
pin "data_version_switcher", preload: true
