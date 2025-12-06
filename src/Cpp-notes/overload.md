# Overload

根据能否重载及重载函数的类型，运算符分为：
不能重载的：sizeof、. 、.*、::、? : 
只能重载为普通函数成员的：＝、–>、( )、\[\] 
不能重载为普通函数成员的：new、delete 
其他运算符：可以重载为普通函数成员和普通函数。

运算符重载若作为**类的成员函数**，必须是**非静态成员函数**

## 确定匹配

```cpp
#include <iostream>
using namespace std;

void func(const int*) {
    cout << "2" << endl;
}

void func(volatile int*) {
    cout << "3" << endl;
}

int main() {
    int a = 10;
    // 下面这行代码会编译报错，因为编译器无法确定调用哪个重载版本
    func(&a);
    return 0;
}
```
### 重载 `++` `--`

```cpp
&A operator ++ (); //前置`++`/`--`
A operator ++ (int); //后置
```

### 重载 `.` `->`

### 重载 `[]` `()`

### 重载 `new` `delete`

函数原型：
```cpp
      extern void * operator new(unsigned bytes); 
      extern void operator delete(void *ptr);
```

## 重载类型转换函数

```cpp
#include <iostream>
using namespace std;

class A{
  int x;
  public:
  A(int xx):x(xx){}
  operator int (){
    return x;
  }
  
};

int main(){
  A a(1);
  cout<<int(a)<<endl;
  cout<<a+a<<endl; //计算时转换为int
  cout<<a.operator int();
  return 0;
}
```

- 重载类型转换符的函数不应声明类型
- explicit禁止自动类型转换，否则在参与运算时编译器会自动进行类型转换