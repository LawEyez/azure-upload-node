const fileUpload = document.querySelector('#fileUpload')
const fileName = document.querySelector('#fileName')

fileUpload.addEventListener('change', function () {
    fileName.textContent = this.files[0].name
})