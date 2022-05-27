var domain = null;

function getEmplFrom(callback) {
  return new Promise((reject, resolve) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", domain + "/employees.json");
    xhr.onload = function (e) {
      if (this.status == 200) {
        reject(e);
        callback(e);
      }

      resolve(e);
    };

    xhr.send();
  });
}

function getSalaries() {
  //TODO returns salaries from json
  console.log("get salaries");
}

function getEmployees(name) {
  //TODO should be exposed function which returns array of employees => for example [{id:"id", "name":"test", "salary":""}]
  console.log(`hello employee ${name}`);
}

console.log("hello from my package");

module.exports = getEmployees;
