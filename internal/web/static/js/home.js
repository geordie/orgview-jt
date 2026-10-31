document.addEventListener("DOMContentLoaded", function() {
  var fileInput = document.getElementById("file-input");
  var fileName = document.getElementById("file-name");
  var importButton = document.getElementById("import-button");
  var fileLabel = document.getElementById("file-label");
  if(fileLabel && fileInput) {
    fileLabel.addEventListener("click", function() {
      fileInput.click();
    });
    fileInput.addEventListener("change", function() {
      if (fileInput.files.length > 0) {
        fileName.value = fileInput.files[0].name;
        importButton.disabled = false;
      } else {
        fileName.value = "";
        importButton.disabled = true;
      }
    });
  }

  var fileInputC  = document.getElementById("file-input-contractors");
  var fileNameC   = document.getElementById("file-name-contractors");
  var importBtnC  = document.getElementById("import-button-contractors");
  var fileLabelC  = document.getElementById("file-label-contractors");
  if(fileLabelC && fileInputC) {
    fileLabelC.addEventListener("click", function() {
      fileInputC.click();
    });
    fileInputC.addEventListener("change", function() {
      if (fileInputC.files.length > 0) {
        fileNameC.value = fileInputC.files[0].name;
        importBtnC.disabled = false;
      } else {
        fileNameC.value = "";
        importBtnC.disabled = true;
      }
    });
  }
});
