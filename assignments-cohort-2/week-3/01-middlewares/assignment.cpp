#include <iostream>
using namespace std;
int main(){
    int a=4,b=6,c=0;
    a = (c * a--)/(--a * 3) % 10 + --c -b;
    cout<<"a="<<a<<endl;
    cout<<"b="<<b<<endl;
    cout<<"c="<<c<<endl;
    return 0;

}                