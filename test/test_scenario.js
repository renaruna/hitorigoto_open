fetch('https://script.google.com/macros/s/AKfycbzjCXoB0CWk9irqnG4hBaGSHA9EPDefmMzAx4mXrB9XoR0R78LQLUjXT_xSy1bpMcjahg/exec')
      .then(response => response.json())
      .then(data => {
        let jsElement = document.getElementById('js-content');
        jsElement.textContent = data;
      });

console.log("script");
