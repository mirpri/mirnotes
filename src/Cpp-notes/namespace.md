# Namespace

名字空间是C++引入的一种**新作用域**。C++名字空间既面向对象又面向过程：除可包含类外，还可包含函数、变量定义。
- 名字空间必须在**全局作用域**内用`namespace`定义
- 同一名字空间内的标识符名必须唯一，不同名字空间内的标识符名可以相同
- 名字空间(包括匿名名字空间)可以分多次定义

## using

`using <名字空间名称>::<成员名称>`可将namespace的标识符加入当前作用域。

`using namespace <名字空间名称>`使namespace的全部标识符可见（但未加入当前作用域，因此可以定义同名变量）

```cpp
#include <iostream>

namespace A{
    int i=1,j=2;
    int f(void);
    int g(int x){return x;}
}

namespace B{
    int i=3,k=4;
    int f(void){ return 10; }
    int g(void){return 20;}
}

namespace A{ // 可以分多次定义
    int f(void){
        return 30;
    }
}

int main(){
    std::cout<< A::i<<" " << B::i<<" " << A::f()<<std::endl;
    {
        using A::f;
        using B::f;
        // f(); //error, ambiguos
    }
    {
        using A::g;
        using B::g;
        std::cout<<g()<<std::endl; //ok, reload
    }
    {
        using A::i;
        // int i; //error, conflict
    }
    {
        using namespace A;
        int i=100; //ok
        std::cout<<i<<std::endl;
    }
    return 0;
}
```
## 作用域运算符`::`

既可以是双目运算符，也可以是单目运算符

用`::x`来访问全局的变量

```cpp
#include <iostream>
int i=10;
namespace A{
    int i=1,j=2;
    int g(){return ::i;}
}

int main(){
  std::cout<<A::g();
  return 0;
}
```
## 嵌套的namespace

设置别名来简洁的访问嵌套的namespace：`namespace <alias> = <namespace>`
