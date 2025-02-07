class rectangle {
    constructor(length, width, color){
        this.length=length;
        this.width=width;
        this.color=color;
    }
    area(){
        return (this.width * this.length);
    }
    color(){
        console.log("this is the " + this.color)
    }
}
const rec = new rectangle(5, 6, "blue");
console.log(rec.area());
console.log(rec.color);
