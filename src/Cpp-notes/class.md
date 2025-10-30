# Class

- [Class](#class)
  - [类的成员](#类的成员)
  - [构造函数](#构造函数)
    - [委托构造 \[C++11\]](#委托构造-c11)
    - [构造函数定义的隐式转换](#构造函数定义的隐式转换)
  - [析构函数](#析构函数)
  - [友元 (friend)](#友元-friend)
  - [继承](#继承)
    - [访问权限](#访问权限)

## 类的成员

通常，在头文件（h/hpp）中声明类和它的成员，在 cpp 文件中给出函数的实现。

类的成员默认为`private`类型，可用**访问说明符**控制可见性。访问说明符可以任意顺序，任意次数出现.

- private: 尽可被类的成员访问
- public: 在整个程序内可访问

> C++也兼容 C 语言的`struct`,`struct`默认成员类型为`public`,在 C++中,这是`struct`与`class`的唯一区别.

hello.h

```h
#include <iostream>
#include <string>

class greeting {
  std::string name; // private
public:
  greeting(std::string); // Constructor
  void sayHello();
};
```

hello.cpp

```cpp
#include "hello.h"

greeting::greeting(std::string s) { name = s; }
void greeting::sayHello(){
  std::cout<<"hello "<<name<<std::endl;
}

int main() {
  greeting a("mirpri");
  a.sayHello();
  return 0;
}
```

## 构造函数

未手动定义构造函数时，编译器自动生成无参的构造函数。手动定义了构造函数后，不再自动生成默认的无参构造函数。

构造函数需要定义为`public`类型才能被调用。

```cpp
class A{
  int x,y;
};

class B{
  int x,y;
 public:
  B(int a,int b):x{a}, y{b}{}
  B()=default; //让编译器生成默认无参构造函数
};

int main(){
  A a1;
  B b1, b2(1,2);
  return 0;
}
```

有时无法生成默认的构造函数，如含有：

- 引用类型的成员
- const 成员
- 不能无参初始化的类作为成员

```cpp
class B{
  public:
    B(int x){}
};

class A{
  int x,y;
  //int &p;
  //const int t;
  //B b;
};

int main(){
  cout<<"start";
  A a1;
  return 0;
}
```

### 委托构造 [C++11]

非委托构造函数直接初始化成员变量，委托构造函数调用其他构造函数完成初始化。

```cpp
class A{
  int x,y;
  public:
  A(int a, int b):x{a},y{b}{}
  A(int a):A(a, a+1){} //委托构造
};
```

### 构造函数定义的隐式转换

默认情况下，构造函数能够在需要隐式转换时进行隐式转换。

使用`explicit`关键字可以阻止。

允许隐式转换为 Number：

```cpp
#include<iostream>
using namespace std;

class Number {
    int value;
public:
    Number(int x) : value(x) {}
    int getValue(){
      return value;
    }
};

void display(Number n) {
    cout<<n.getValue()<<endl;
}

int main() {
    display(5);
    Number n=10;
    display(n);
    return 0;
}
```

不允许隐式转换：

```cpp
#include<iostream>
using namespace std;

class Number {
    int value;
public:
    explicit Number(int x) : value(x) {}
    int getValue(){
      return value;
    }
};

void display(Number n) {
    cout<<n.getValue()<<endl;
}

int main() {
    display(static_cast<Number>(5));
    Number n(10);
    display(n);
    return 0;
}
```
## 析构函数

当未手动定义析构函数时, 系统生成默认的无参数析构函数.

析构函数可以被主动调用, 应防止重复释放资源操作.

## 友元 (friend)

类可以允许其他类或者函数访问它的非公有成员,方法是令其他类或者函数成为它的**友元**.

```cpp
#include <iostream>
using namespace std;

class SecretKeeper {
    int secret = 42;  // private member 

public:
    // 声明友元函数
    friend void peekSecret(const SecretKeeper& keeper);
};

// 友元函数定义
void peekSecret(const SecretKeeper& keeper) {
    cout << "I know the secret: " << keeper.secret << endl;
}

int main() {
    SecretKeeper keeper;
    peekSecret(keeper);    
    // cout << keeper.secret << endl; // error
    return 0;
}
```


## 继承

- 基类: 提供成员的类, 抽象/一般化
- 派生类: 接受成员的类, 具体

### 访问权限
>Introducing `protected`:  
>派生类能够访问, 而不允许其它用户访问

基类的私有(`private`)成员不能被派生类 *(非基类友元)成员函数* 访问.

具体而言, 继承后基类成员在派生类中的访问权限:

| 基类成员类型 | private 继承 | protected 继承 | public 继承 |
| ------------ | ------------ | -------------- | ----------- |
| protected    | private      | protected      | protected   |
| public       | private      | protected      | public      |
| private      | NA           | NA             | NA          |

继承的类型:
- private: *默认*
- protected
- public

```cpp
#include <iostream>

class A {
  int x=1;
protected:
  int m=2;
public:
  int a=3;
};

class B : A { // 默认为private继承
  public:
    void print(){
      //std::cout<<x<<std::endl; // error
      std::cout<<m<<std::endl;
      std::cout<<a<<std::endl;
    }
};

class C : public A{};

int main() {
  B b;
  b.print();
  //std::cout<<b.a; // error
  
  C c;
  std::cout<<c.a<<std::endl;
  return 0;
}
```