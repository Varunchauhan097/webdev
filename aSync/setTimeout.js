function print(){
    console.log("its timeout");
}
console.log("hi there");
setTimeout(print, 10000);
console.log("how are you");
let c=0;
for( let i=0; i<=10000; i++){
    c++;
}
console.log("Expensive task");