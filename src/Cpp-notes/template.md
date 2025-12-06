# template

模板是C++泛型编程的核心机制，允许编写与类型无关的通用代码。无需为每种类型重复编写相同功能的代码，提升代码复用性与灵活性。

```cpp
#include <iostream>
#include <string>
using namespace std;

template<typename T> T add(const T &v1, const T &v2){
  return v1+v2;
}

template<typename T1, typename T2> void print(const T1 &a1, const T1 &a2, const T2 &b){
  cout<<a1<<a2<<b<<endl;
  return;
}

int main(){
  cout<<add(1,2)<<endl;
  cout<<add(string("hi"),string("lo"))<<endl;

  print(1,2,3);
  print(1,2,string("hi"));
  // print(1,string("hi"),2); // no matching function
  return 0;
}
```