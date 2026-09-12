const imageInput = document.getElementById("imageInput");
const quality = document.getElementById("quality");
const qualityValue = document.getElementById("qualityValue");
const compressBtn = document.getElementById("compressBtn");

const preview = document.getElementById("preview");
const result = document.getElementById("result");
const downloadBtn = document.getElementById("downloadBtn");

let selectedImage = null;

// Show selected image
imageInput.addEventListener("change", function () {
    const file = imageInput.files[0];

    if (!file) {
        return;
    }

    selectedImage = file;

    const imageURL = URL.createObjectURL(file);

    preview.innerHTML = `
        <img src="${imageURL}" alt="Selected Image">
    `;

    result.innerHTML = `
        Original size: ${(file.size / 1024).toFixed(1)} KB
    `;

    downloadBtn.style.display = "none";
});

// Show quality value
quality.addEventListener("input", function () {
    qualityValue.textContent = quality.value + "%";
});

// Compress image
compressBtn.addEventListener("click", function () {

    if (!selectedImage) {
        alert("Please choose an image first.");
        return;
    }

    const img = new Image();

    img.onload = function () {

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const compressionQuality = quality.value / 100;

        canvas.toBlob(
            function (blob) {

                if (!blob) {
                    alert("Compression failed.");
                    return;
                }

                const originalSize = selectedImage.size;
                const compressedSize = blob.size;

                const compressedURL =
                    URL.createObjectURL(blob);

                result.innerHTML = `
                    Original size:
                    ${(originalSize / 1024).toFixed(1)} KB
                    <br>

                    Compressed size:
                    ${(compressedSize / 1024).toFixed(1)} KB
                `;

                downloadBtn.href = compressedURL;
                downloadBtn.style.display = "block";

            },
            "image/jpeg",
            compressionQuality
        );
    };

    img.src = URL.createObjectURL(selectedImage);
});