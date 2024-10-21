fetch('https://script.google.com/macros/s/AKfycbyjMTeRaNtT2HKEKkYdilkQg3RYP9JOlDJ8s27e7HK6NeRv67cwv03RLVyWRwDC-pN03A/exec?member='+'boss')
      .then(response => response.json())
      .then(data => {
        var dataTable = document.getElementById('data-table');
        var tbody = dataTable.querySelector('tbody');

        data.forEach(function(item) {
          var row = document.createElement('tr');


          var idCell = document.createElement('td');
          idCell.textContent = item.charaID;

          var nameCell = document.createElement('td');
          nameCell.textContent = item.name;

          var hiranameCell = document.createElement('td');
          hiranameCell.textContent = item.hiraname;

          var ageCell = document.createElement('td');
          ageCell.textContent = item.age;

          var sexCell = document.createElement('td');
          sexCell.textContent = item.sex;


          row.appendChild(idCell);
          row.appendChild(nameCell);
          row.appendChild(hiranameCell);
          row.appendChild(ageCell);
          row.appendChild(sexCell);

          tbody.appendChild(row);
        });
      });

    console.log("script");
