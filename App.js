let savedSolutions = JSON.parse(localStorage.getItem("results")) || [];

let flag = false;

const historyContainer = document.querySelector(".historycon");
function HistoryButton(e) {
  flag = !flag;
  if (flag) {
    historyContainer.style.display = "block";
    let data = historyContainer;

    data.textContent = "";
    savedSolutions.forEach((solution) => {
      let solutionContainer = document.createElement("div");
      solutionContainer.className = "container-input";

      solutionContainer.innerHTML = `
        
            <div class="inputBox1">${solution.operation} : ${solution.expression}</div>
            <div class="inputBox2">Solution: ${solution.result}</div>
            <!-- Create a delete button -->
            <button id="deleteBtn" >
                <i class="fa-solid fa-trash-can fa-3x"></i>
            </button>  
        
      `;

      const delBtn = solutionContainer.querySelector("#deleteBtn");

      delBtn.addEventListener("click", (e) => {
        deleteSol(e, solution);
      });

      function deleteSol() {
        delBtn.parentElement.remove();
        savedSolutions = savedSolutions.filter((sol) => {
          return sol.expression === solution.expression;
        });
        localStorage.setItem("results", JSON.stringify(savedSolutions));
      }
      data.appendChild(solutionContainer);
    });
  } else {
    historyContainer.style.display = "none";
  }
}

async function SearchButton() {
  try {
    let problem = document.getElementById("problemBar").value;
    let category = document.getElementById("categoryBar").value;

    const response = await fetch(
      `https://newton.vercel.app/api/v2/${category}/${problem}`
    );

    const pro = await response.json();

    document.querySelector(".inputBox2").innerHTML = "Solution: " + pro.result;
    const input1 = (document.querySelector(".inputBox1").innerHTML =
      category + " : " + problem);

    savedSolutions.push(pro);
    localStorage.setItem("results", JSON.stringify(savedSolutions));
  } catch (e) {
    console.log(e);
  }
}

function deleteBtn() {
  document.querySelector(".inputBox1").innerHTML = "";
  document.querySelector(".inputBox2").innerHTML = "";
}

function render() {}
