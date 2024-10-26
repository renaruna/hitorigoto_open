fetch('https://script.google.com/macros/s/AKfycbyoDRrmUAPJkOB6_g81A5exR0aWSEl6wI3FWzmmX4tMNzIHc_x2QLsbU-jrTrnQBULP/exec')
      .then(response => response.json())
      .then(data => {
        let jsElement = document.getElementById('js-content');
        jsElement.textContent = data;
      });

console.log("script");
