function show(){
    alert(`local storage count ${localStorage.getItem("localCount")}, session storage count ${sessionStorage.getItem("sessionCount")}`);
}
function clearLocal(){
    localStorage.clear();
}
function clearSession(){
    sessionStorage.clear();
}function increment(){
    if((localStorage.getItem("localCount")==null)  && (localStorage.getItem("sessionCount")==null))
    {
        localStorage.setItem("localCount",1);
        sessionStorage.setItem("sessionCount", 1);
    }
    else{
        localStorage.setItem("localCount", parseInt(localStorage.getItem("localCount"))+1);
        sessionStorage.setItem("sessionCount", parseInt(sessionStorage.getItem("sessionCount"))+1);
    }
    
}