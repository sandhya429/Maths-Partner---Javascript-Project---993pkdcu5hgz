function SavedButton(){
    let wet = document.querySelector(".inputBox1").innerHTML;
    let set = document.querySelector(".inputBox2").innerHTML;
    localStorage.setItem(wet,set);
    console.log(localStorage.getItem(set));
    set++;
}

let hcount =0;

function HistoryButton(){
    hcount++;
    if(hcount%2 == 1){
        document.querySelector(".historycon").style.display = "block";
        let data = document.querySelector(".historycon");

        for(p in localStorage){
            let ans = localStorage.getItem(p);
            if(ans != null){
                // console.log(ans);
                let h3 = document.createElement("h3");
                h3.setAttribute('class','remove');
                h3.innerHTML=`${p} => Result = ${ans}`;
                console.log(h3);
                data.appendChild(h3);
            }
        }
    }
    else{
        document.querySelector(".historycon").style.display = "none";
        let rem = document.querySelector(".remove");
        for(let i=0;i<rem.clientHeight;i++){
            rem[i].remove();
        }
    }
}

function SearchButton(){
    event.preventDefault();
    let problem = document.getElementById("problemBar").value;
    let category = document.getElementById("categoryBar").value;

    let pro = fetch(`https://newton.vercel.app/api/v2/${category}/${problem}`);
    console.log(pro);

    pro.then((response) => {
        console.log(response.status);
        console.log(response.ok);
        return response.json();
    })
    .then((value)=>{
        console.log("Value:",value);
        let input2 = value.result;
        document.querySelector(".inputBox2").innerHTML = input2;
    })

    const input1 = document.querySelector(".inputBox1").innerHTML = category+" : "+problem;
    let set = document.querySelector(".inputBox1").value;
    let wet =  document.querySelector(".inputBox2").innerHTML;

    localStorage.setItem(set,wet);
}   

function deleteBtn(){
    console.log("deleteBtn() working")
    document.querySelector(".inputBox1").innerHTML = "";
    document.querySelector(".inputBox2").innerHTML="";
}
