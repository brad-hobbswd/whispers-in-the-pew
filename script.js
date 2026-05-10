fetch('/whispers-in-the-pew/partials/footer.html')
.then(response => response.text())
.then(data => {
document.getElementById('footer').innerHTML = data;
});
