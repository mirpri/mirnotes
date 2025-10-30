# C++ Features
>📜*This section focuses on features unique to c++*

C的超集，*多继承*的强类型的混合型的OO(Object-oriented)语言

详细的C++笔记见[Cpp-notes](../../Cpp-notes/)

## 传递引用类型的参数
函数原型中，可定义**引用类型**参数。
```cpp
void work(int &x) {
    x = x + 10; // 修改 x 的值
}

int main() {
    int a = 5;
    work(a); // 传递 a 的引用给 work
    cout<<a; // a为15
    return 0;
}
```
引用类型的参数在函数调用时不会创建参数的副本，而是直接引用调用时传递的实参。这样，可以避免拷贝参数带来的开销，且能在函数中会直接修改原变量的值，也无需使用指针间接访问。

## 基于范围的 for 循环
简洁的遍历数组和其它容器 (C++ 11)
```cpp
int arr[]={1,2,3,4,5};

for(int i:arr){
    cout<<i<<' ';
}
```
这种方式默认是值传递，意味着循环内对 i 的修改不会影响原数组中的元素。如果需要修改原数组元素，可以使用引用：
```cpp
for (int &i : arr) {
    i++; // 这会修改 arr 中的元素
}
```
基于范围的 for 循环适用于：
- 普通数组（如 int arr[5]）
- 标准容器（如 vector, list, map 等）
- 任何提供了 begin() 和 end() 方法的类型

## Class vs Struct
这两种结构体在C++几乎完全相同，只不过struct的成员变量默认为public而class的成员变量默认为private。

```cpp
class MyClass {
    int privateData; // private by default
public:
    int publicData;
};

struct MyStruct {
    int publicData;  // public by default
private:
    int privateData;
};
```

传统上，struct 关键字用于将简单数据成员组合在一起而class 关键字用于定义具有更复杂行为且需要强封装的对象。

## 使用构造函数初始化对象
在C++中，可使用构造函数来初始化变量/对象
```
#include <iostream>
using namespace std;

int main(){
  int x(1);        //Parentheses initialization
  double y{1.2};   //Brace initialization
  cout<<x<<endl<<y;
  return 0;
}
```
### *Parentheses initialization* vs *Brace initialization*

The Difference: **Narrowing Conversions**:  
`int x(1.5);` will compile successfully but will truncate the value, resulting in x being 1.  
`int x{1.5};` will cause a compile-time error. 

The **brace initialization syntax** is considered safer and is the recommended modern C++ practice.

## 重载
C++支持函数重载与运算符重载

运算符重载时，要求至少有一个操作数为自定义的数据类型。
```
bool operator+ (int a, int b){
  return a*b;
}
```
>❌ Overloaded 'operator+' must have at least one parameter of class or enumeration type

# C++ 标准
## 使用新的空指针 nullptr
nullptr has type `std::nullptr_t`. It's implicitly convertible to any pointer type. Thus, it'll match std::nullptr_t or pointer types in overload resolution, but not other types such as int.

0 (aka. C's NULL bridged over into C++) could cause **ambiguity in overloaded function resolution**, among other things

```c++
#include <iostream>
using namespace std;

void fun(int x){
  cout<<"int x: "<<x<<endl;
}

void fun(int* p){
  cout<<"pointer p: "<<p<<endl;
}

int main(){
  fun(0); // int x: 0
  fun(nullptr); // pointer p: 0
  // fun(NULL); //THIS CAUSE ERROR
  return 0;
}
```