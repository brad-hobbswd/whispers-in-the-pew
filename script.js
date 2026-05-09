fetch('/whispers-in-the-pew/footer.html')
.then(response => response.text())
.then(data => {
document.getElementById('footer').innerHTML = data;
});
