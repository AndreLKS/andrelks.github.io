document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const pdfFile = document.getElementById('pdfFile').files[0];
    formData.append('pdf', pdfFile);

    const response = await fetch('/upload', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();
    document.getElementById('result').innerText = `A soma total dos valores é: R$ ${result.total}`;
});
