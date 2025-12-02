# Class

- [Class](#class)
  - [类的成员](#类的成员)
  - [声明和定义](#声明和定义)
  - [构造函数](#构造函数)
    - [委托构造 \[C++11\]](#委托构造-c11)
    - [构造函数定义的隐式转换](#构造函数定义的隐式转换)
  - [析构函数](#析构函数)
  - [友元 (friend)](#友元-friend)
  - [继承](#继承)
    - [访问权限](#访问权限)
    - [父类/子类](#父类子类)
  - [虚函数](#虚函数)
    - [纯虚函数](#纯虚函数)
    - [虚函数地址表](#虚函数地址表)
  - [多继承](#多继承)
    - [虚基类](#虚基类)
  - [成员指针](#成员指针)
    - [静态数据成员和指针](#静态数据成员和指针)
    - [静态函数成员](#静态函数成员)
  - [当函数成员加上各种修饰](#当函数成员加上各种修饰)
    - [`const` `mutable` `volatile`](#const-mutable-volatile)
  - [拷贝和移动](#拷贝和移动)

## 类的成员

通常，在头文件（h/hpp）中声明类和它的成员，在 cpp 文件中给出函数的实现。

类的成员默认为`private`类型，可用**访问说明符**控制可见性。访问说明符可以任意顺序，任意次数出现.

- private: 尽可被类的成员访问
- public: 在整个程序内可访问

> C++也兼容 C 语言的`struct`,`struct`默认成员类型为`public`,在 C++中,这是`struct`与`class`的唯一区别.

hello.h

```cpp
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

类的成员可在多处初始化，后来的赋值会覆盖较早的赋值：

```cpp
#include <iostream>
using namespace std;
int i=10;
struct A{
  int i=10;
  A():i(20){
    i=30;
  }
};

int main(){
  A a;
  cout<<a.i;
  return 0;
}
```
## 声明和定义

`A() = default`: 接受默认生成的构造函数
`A
`A() = delete`: 删除
## 构造函数

未手动定义构造函数时，编译器自动生成无参的构造函数。手动定义了构造函数后，不再自动生成默认的无参构造函数。

> 默认情况下，编译器为类A默认生成6个实例成员函数：A( )、A(A&&)、A(const A&) 、~A( ) 、A&operator=(const A&)、A& operator=(A&&) 

构造函数需要定义为`public`类型才能被调用，否则无法创建成员。

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

类可以允许其他**类**或者**函数**访问它的非公有成员,方法是令其他类或者函数成为它的**友元**.

- 普通友元可在类的任何访问权限下定义
- 任何普通函数(全局函数， including `main`)都可以定义为一个类的普通友元
- 声明普通友元时，也可同时定义函数体(自动内联，注意只能定义一次)

```cpp
#include <iostream>
using namespace std;

class SecretTeller;
class SecretTeller2; // 先声明类

class SecretKeeper {
  int secret = 42; // private member

public:
  // 声明友元
  friend void peekSecret(const SecretKeeper &keeper);
  friend class SecretTeller; // "class"可加可不加
  friend SecretTeller2;
};

class SecretTeller {
public:
  void tellSecret(SecretKeeper keeper) { cout << keeper.secret << endl; }
};

class SecretTeller2 : SecretKeeper { // 声明友元让派生类能够访问基类private
  public:
    void tellSecret(){
      cout<<secret<<endl;
    }
};

// 友元函数定义
void peekSecret(const SecretKeeper &keeper) {
  cout << "I know the secret: " << keeper.secret << endl;
}

int main() {
  SecretKeeper keeper;
  peekSecret(keeper);
  // cout << keeper.secret << endl; // error
  SecretTeller teller;
  teller.tellSecret(keeper);
  SecretTeller2 teller2;
  teller2.tellSecret();
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

声明为友元可以让派生类访问基类的private，友元关系不能继承。
### 父类/子类

如果派生类的**继承方式为public**，则这样的派生类称为基类的**子类**，而相应的基类则称为派生类的**父类**。

C++允许**父类指针直接指向子类对象**，也允许父类引用直接引用子类对象。无须通过强制类型转换保持类型相容。但子类指针不能指向父类对象。

通过父类指针调用虚函数（且未通过类名限定）时晚期绑定，根据对象的实际类型绑定到合适的成员函数。父类指针实际指向的对象的类型不同，虚函数绑定的函数的行为就不同，从而产生多态。

## 虚函数
虚函数：即用`virtual`定义的实例成员函数。当基类对象指针(引用)指向不同类型派生类对象时，通过虚函数到基类或派生类中同名函数的映射实现多态。

虚函数能根据对象类型适当地绑定函数成员，且绑定函数成员的效率非常之高，因此，最好将实例函数成员全部定义为虚函数。

>Java/C# 所有实例函数都默认为虚函数。

```cpp
#include <iostream>
using namespace std;

class A {
public:
  virtual void print() { cout << 'a' << endl; }
};

class B : public A{
  virtual void print() { cout<<'b'<<endl;}
};

void DoPrint(A* p){
    p->print();
}

int main() {
    A a;
    B b;
    DoPrint(&a);
    DoPrint(&b);
    return 0;
}
```

- 在派生类中重新定义成员函数时，函数原型必须完全相同
- 构造函数不能定义为虚函数，而析构函数**应该**定义为虚函数
- 基类定义了虚函数，所有派生类中原型相同的非静态成员函数自动成为虚函数
- 虚函数编译时会取地址，内联必失败
- union既不能定义基类又不能定义派生类，故不能在union中定义虚函数

`override`关键字用于确保派生类中的函数覆盖了基类中的虚函数，编译器会在不匹配时报错。

class B 的虚函数定义也可以写为：

```cpp
  void print() override { cout<<'b'<<endl;}
  void print() { cout<<'b'<<endl;}
```

### 纯虚函数
**纯虚函数**：未定义函数体的虚函数

**抽象类**：含有纯虚函数的类

- 抽象类不能创建对象实例，也不能作为函数的值类型和返回值类型。
- 抽象类指针能够作为函数的值类型和返回值类型。
- 友元没有传递性，一般不声明纯虚函数为友元。

### 虚函数地址表

C++使用**虚函数地址表**(VFT)来实现虚函数的动态绑定。VFT是一个函数指针列表，存放对象的所有虚函数的入口地址。

一个指向虚函数表的指针存储在对象的起始单元（占一个指针的大小4/8bit）。

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

class A {
public:
    int x, y;
    virtual void print() { cout<<"A::print()"<<endl; }
    virtual void show() { cout<<"A::show()"<<endl; }
    void foo() { cout<<"A::foo()"<<endl; }
};

int main() {
    A a;
    void** vptr = *(void***)&a;

    cout<<hex;
        
	cout<<"Address of object a: "<<(void*)&a<<endl;
	cout<<"a.x address: "<<(void*)&a.x<<endl;
	cout<<"a.y address: "<<(void*)&a.y<<endl;

    cout<<"vptr: "<<vptr<<endl;
    for (int i = 0; i<3; ++i)
        cout<<"vtable["<<dec<<i<<"] = "<<vptr[i]<<endl;

    void (A::*p_print)() = &A::print;
    void (A::*p_show)() = &A::show;
    void (A::*p_foo)() = &A::foo;

    cout<<"Encoded &A::print = "<<(void*&)p_print<<endl;
    cout<<"Encoded &A::show  = "<<(void*&)p_show<<endl;
    cout<<"Encoded &A::foo   = "<<(void*&)p_foo<<endl;

    int found_index = -1;
    for (int i = 0; i<2; ++i) {
        cout<<"Calling vtable["<<dec<<i<<"] at "<<vptr[i]<<endl;
        using Fn = void(*)(A*);
        Fn f = reinterpret_cast<Fn>(vptr[i]);
        f(&a); // call through raw address
    }
    return 0;
}
```


## 多继承
多继承派生类有多个基类或虚基类。同一个类不能多次作为某个派生类的直接基类，但可多次作为一个派生类的间接基类

### 虚基类
虚基类用virtual声明，可把多个逻辑虚基类对象映射成同一个物理虚基类对象。
映射成的这个物理虚基类对象尽可能早的构造、尽可能晚的析构，且构造和析构都只进行一次。

虚函数一般在基类的public或protected部分，虚基类**几乎总是优先使用 `public` 继承**，否则不能做到共享成员，破坏多态。 

**派生树**：一个多继承的类和它继承的基类构成一棵树。派生树上的同名虚基类只构造一次

构造顺序：先一次构造所有虚基类，再依次构造其他基类。
```cpp
#include <iostream>
using namespace std;

struct A{
    A(){cout<<"A";}
};
struct B{
    B(){cout<<"B";}
};
struct C{
    C(){cout<<"C";}
};
struct D{
    D(){cout<<"D";}
};

struct E: A, virtual B, C, virtual D{
    E(){cout<<"E";}
};

int main(){
    E();
    return 0;
}
```

## 成员指针
`类名::*指针名 = &类名::成员名`

**实例数据成员指针**是数据成员相对于对象首地址的偏移，不是真正的代表地址的指针。

实例数据成员指针不能移动，不能转换类型

用`*.`, `*->`操作符访问指针指向的成员

```cpp
#include <iostream>
using namespace std;

struct A{
  int x,y;
  int add(){
    return x+y;
  }
  A(int xx,int yy):x(xx), y(yy){}
};

int main(){
  A a(1,2), *b=&a;

  int A::*p; //A类的成员指针，指向A类的int类型实例数据成员
  p=&A::x;
  cout<<a.*p<<endl;
  cout<<b->*p<<endl;
  // p++; // error
  
  int(A::*pf)()=&A::add; // A的示例函数成员指针
  cout<<(a.*pf)()<<endl; //注意.*优先级低于()
  cout<<(b->*pf)()<<endl;
  return 0;
}
```

### 静态数据成员和指针

静态数据成员（static）相当于有类名限定、带访问权限的全局变量

静态数据成员独立分配内存，不属于任何对象内存的一部分。
非const、非inline静态数据成员在类体内声明、**类体外定义**并初始化。

>⚠️ 静态数据成员不能在类内直接初始化（除非是 const static 整型或枚举类型）

**静态成员指针（不管指向静态数据成员还是指向静态函数成员）*就是普通指针*，因此如果声明了指向类的静态成员的指针，就用普通指针（但要注意指针指向的静态成员的访问权限）。**
### 静态函数成员

静态函数成员无“this”参数，一般用来访问类的**总体信息**，例如对象总个数。


## 当函数成员加上各种修饰

### `const` `mutable` `volatile`

`const` 放在函数名后的作用： **承诺“不修改对象状态”**，不能修改对象的成员变量

```cpp
#include <iostream>
using namespace std;

struct A{
  int a;
  mutable int b;
  void f();
  void f2() const;
};

void A::f(){
  a=10;
  cout<<a<<endl;
}

void A::f2() const {
  //a=20; //Cannot assign to non—static data member within const member function 'f2'
  b=20;
  cout<<a<<' '<<b<<endl;
}

int main(){
  A a;
  a.f();
  a.f2();
  return 0;
}

```

## 拷贝和移动

用一个对象初始化/赋值另一个对象时，可能：

浅拷贝：按成员依次拷贝，编译器默认

深拷贝：在传递参数时先为形参对象的指针成员分配新的存储单元，而后将实参对象的指针成员所指向的单元内容复制到新分配的存储单元中。
```cpp
A(A & o); //深拷贝构造
A & operator=(A & rhs); //深拷贝赋值
```

移动：直接替换指针，并将原指针置空
```cpp
A::A(A && o) noexcept; //移动构造
A::A & operator=(A && rhs) noexcept; //移动赋值

A a;
A b(std::move(a));
```

> 重载赋值运算符要避免`rhs`和`this`相同