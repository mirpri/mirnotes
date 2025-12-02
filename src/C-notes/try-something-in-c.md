# Try something in C

*一些值得尝试的代码*


>👉
>
>**Welcome to my C programming notes!**
>
>This is a collection of interesting C code snippets and concepts I've gathered. Feel free to explore, learn, and experiment with these examples. This page is being continuously updated, so be sure to check back often for new content!
>
>If you have any questions, suggestions, or want to discuss any of these topics further, please don't hesitate to make a comment or reach out to me. Your input is valuable and appreciated! 

# Basics
## 特殊的字符
### 响铃符，在外部终端运行时会发出声音🔔

```c
#include<stdio.h>
int main(){
    printf("\a");
    return 0;
}
```

### '\b' 回退光标

实现百分比从0变化到100：

```c
#include <stdio.h>
#include <windows.h>

int main(){
    printf("  0%%");
    for (int i = 1; i <= 100; i++)
    {
        printf("\b\b\b\b");
        printf("%3d%%",i);
        Sleep(100);
    }    
    return 0;
}
```

## float 和 double 并非准确值

计算机以二进制存储小数，小数点后的部分以2的负指数形式存储，一些有限的十进制小数就变成了无限循环小数，无法准确存储。
```c
#include<stdio.h>
int main(){
    for (float i = 0; i < 100; i+=1)
    {
        printf("%10.20f\n", i/100);
    }
    return 0;
}
```
参考：小数的进制转换代码 [链接](./elegant-codes.md#_5)
>⚠️
>
>float 和 double 不能进行位运算和取模（或被取模）操作



## 字符串末尾都是空字符 ‘\0’

```c
#include<stdio.h>
int main(){
    char str[10]="world";
    char str2[10]="";
    for (int i = 0; i < 10; i++)
    {
        if(str[i]=='\0'){
            printf("\\0 ");
        }
        else{
            printf("%c ",str[i]);
        }
    }
    printf("\n");
    for (int i = 0; i < 10; i++)
    {
        if(str2[i]=='\0'){
            printf("\\0 ");
        }
        else{
            printf("%c ",str2[i]);
        }
    }

    return 0;
}
```

## 输出一个数的二进制（是补码）

```c
#include<stdio.h>
int main(){
    while(1){
        short a;
        scanf("%hd",&a);
        for (int i = 15; i >=0; i--)
        {
            printf("%d",a>>i&1);
            if(i==8)printf(" ");
        }
        printf("\n");

    }
    return 0;

}
```

## 带有空语句的for

```c
for ( a ; b ; c ) { ... } 
```

当 `b` 为空时，相当于填入了非空常量，即循环将一直进行（除非遇到转移语句）

`a` `c` 为空时，将不进行任何操作


## scanf 的格式控制

### 空白字符

以下的表达全都等价

```c
scanf("%s%s",&a,&b);
scanf("%s %s",&a,&b);
scanf("%s\n%s",&a,&b);
scanf("%s\t%s",&a,&b);
scanf("%s\n \t\n\t     %s",&a,&b);
```

空白字符: `\n` `\t` `' '` 的作用都相同，连续的空白字符将被视为一处。

scanf 读取数字，字符串时会自动跳过空白字符。


>⚠️
>
>当读取`%c`时，空白字符可用于跳过输入中的空白字符

e.g. 输入`a b`:

```c
scanf("%c%c",&a,&b); //a='a', b=' '
scanf("%c %c",&a,&b); //a='a', b='b'
```

与其他输入方式混用，e.g. input: `hello world`

```c
#include <stdio.h>

int main() {
    char a[100],b[100];
    scanf("%s",a);
    gets(b);
    printf("%s",b);
    return 0;
}
```

改为`scanf("%s ",a);`,b=”world”

### 普通字符

```c
#include <stdio.h>
char a[100],b[100];
int main()
{
	int success;
	success=scanf("%s and %s",a,b);
	printf("%s %s",a,b);
	return 0;
}
```

表达式加入了普通字符，必须输入 `abcde and fghij` 才能正确输入a和b

### 赋值禁止字符 *

```c
#include <stdio.h>
char a,b;
int main()
{
	scanf("%c %*s %c",&a,&b);
	printf("%c %c",a,b);

	return 0;
}
```

input `a bcdef g` output `a g`

### 指定最大域宽

```c
#include <stdio.h>
char a[100],b[100];
int main()
{
	scanf("%5s%5s",a,b);
	printf("%s %s",a,b);

	return 0;
}
```

input `abcdefghijklmnopqrstuvwxyz` output `abcde fghij`

# Variables and pointers

## 变量被赋给超出范围的值，自动取模
```c
#include <stdio.h>

short a=0x12345678;

int main() {
    printf("%x" ,a);
    return 0;
}
```

## 内层变量与外层变量重名，外层的变量被屏蔽

```c
#include <stdio.h>

int main()
{
    for (int i = 0; i < 10; ++i) {
        for (int i = 0; i < 10; ++i) {
            printf("%d ",i);
        }
        printf("\n");
    }
    return 0;
}
```

### 在同一层重新定义一个重名变量会报错

```c
#include <stdio.h>

int main()
{
    int i=10;
    int i=20;
    return 0;
}
```

`error: redeclaration of 'int i'`

```c
**#include <stdio.h>

int main()
{
    int i=10;
    {
        int i=20;
        printf("%d\n",i);
    }
    printf("%d",i);
    return 0;
}**
```

用代码块就可定义内层同名变量。

## static 变量初始化只执行一次

```c
#include <stdio.h>

int main()
{
    for (int i = 0; i < 10; ++i)
    {
        static int a=0; //下次执行到这里，直接跳过这条语句
        printf("%d ",a);
        a++;
    }
    return 0;
}

```
实际上，static变量在程序开始执行时就已经初始化。但若在定义之前引用，则会报错。
static变量的生命期与全局变量相同，而作用域与局部变量相同。
```C
#include <stdio.h>

int main() {
    printf("hi"); //设置断点，观察到显示x=100
    static int x=100;
    return 0;
}
```

局部`static`变量的初始值也为0
```C
#include <iostream>
using namespace std;

int main(){
  int a;
  static int b;
  cout<<a<<endl<<b;
  return 0;
}
```
## 两种定义字符串的方法

method 1:

```cpp
#include <stdio.h>

int main()
{
	char *s1="hello"; //字符串存储在常量区，地址赋给s1，s1是指针变量
	printf("%s ",s1);
	printf("%c ",*(s1+1));
	printf("%c ",s1[2]);
	s1="world"; //s1指向另一字符串常量
	printf("%s ",s1); 	
	return 0;
}
```

s1可修改，字符串不准更改 

method 2:

```cpp
#include <stdio.h>

int main()
{
	char s1[]="hello"; //字符串存储在变量区，s1为指针常量，指向字符串
	printf("%s ",s1);
	printf("%c ",*(s1+1));
	printf("%c ",s1[2]);
	s1[4]='0'; //更改字符串
	printf("%s ",s1);	
	return 0;
}
```

字符串可修改，s1不可修改

## 定义常指针
```c
int * const p;//指向整型变量的常指针
const int * const p; //指向整型常量的常指针
```

>⚠️
>
>`const int *p` / `int const *p`定义的是指向整型常量的指针变量，整型常量本身不能修改，但指针可以修改，指向其他地址。例如，以下的这段代码能够正常运行：

```c
#include <stdio.h>
int main() {
    const char *p="12345";
    p++;
    printf("%c",*p);
    return 0;
}
```

## 增加属性与去除属性
指针可以增加属性，不可去除属性 (const, volatile)
```C
int a;
const int b=100;

int main(){
  const int * p=&a; //增加属性，OK
  int * q=&b; //去除属性const，ERROR

  *p=100; //不能通过p修改a，ERROR
  return 0;
}
```

## 无类型指针 void *

void指针可以指向任意类型的数据，如果要将void指针p赋给其他类型的指针，则需要强制类型转换。

void指针不应用于计算，否则将收到警告

```c
#include <stdio.h>
int a[]={1,2,3,4,5,6,7,8,9,10};
int *p=a;
void *q=a; //无类型指针
int main(){
    printf("*p=%d *q=%d\n",*p,*(int *)q);
    return 0;
}
```

各指针所占的空间:

```c
#include <stdio.h>
int *p1;
char *p2;
double *p3;
void *p4; //char＊和void＊指向空间均为1byte
int a[10][10];
int main(){
    printf("%d %d %d %d %d\n",(p1+1)-p1,(p2+1)-p2,(p3+1)-p3,(a+1)-a,(a[0]+1)-a[0]);
    printf("%d %d %d %d %d %d",(int)((char*)(p1+1)-(char*)p1),(char*)(p2+1)-(char*)p2,(char*)(p3+1)-(char*)p3,(char*)(p4+1)-(char*)p4,(char*)(a+1)-(char*)a,(char*)(a[0]+1)-(char*)a[0]);
    return 0;
}
```

输出：

```
1 1 1 1 1
4 1 8 1 40 4
```

## 复杂的指针声明
```c
int (*p[10])[20]; //p是长度为十的指针数组，每个指针指向长度为20的整数数组
int (*p[10])(int,int); //p 是一个包含 10 个元素的数组，数组中的每个元素都是指向一个函数的指针，这些函数接受两个 int 类型的参数，并返回一个 int 类型的值。

int (*p(int))[10]; //p 是一个函数，该函数接受一个 int 类型的参数，并返回一个指向包含 10 个 int 类型元素的数组的指针。
int *p(int)[10]; //p 是一个函数，该函数接受一个 int 类型的参数，并返回一个包含 10 个指向 int 类型的指针的数组。
int (*p(int))(int *,int); //p 是一个函数，接收一个int型参数，返回值为函数指针

int *(*p[10])(int,int); //指向的函数返回一个 int 类型的指针。
int (*p[10])(int,int)[5]; //函数返回一个包含 5 个 int 类型元素的数组。
int *(*p[10])(int,int)[5]; //函数返回一个包含 5 个 int 指针元素的数组。
int (*(*p[10])(int,int))[5]; //函数返回一个指向长度为 5 的 int 数组的指针。
int (*p)(char (*)(int *)); //p的参数是一个接受 int * 类型参数并返回 char 类型值的函数指针
```

## 函数指针的调用
即可直接调用`p(...)`，也可间接访问`(*p)(...)`
```c
#include <stdio.h>
void hello(int x){
    printf("hello, %d\n",x);
}
void (*pf)(int)=hello;

int main() {
    pf(1);
    (*pf)(2);
    return 0;
}
```
>ℹ️
>
>间接访问时，由于运算符的优先级顺序，`*pf`周围需要添加括号

## realloc()
当一个指针指向的内容需要更大的连续存储空间时，用
```c
void * realloc(void *ptr, size_t newsize)
```
将当前内存块复制到更大空间。

功能：先判断当前的指针是否有足够的连续空间，如果有，扩大ptr指向的地址，并且将ptr返回，如果空间不够，先按照newsize指定的大小分配空间，将原有数据从头到尾拷贝到新分配的内存区域，而后释放原来ptr所指内存区域（原来指针是自动释放），同时返回新分配的内存区域的首地址。即重新分配存储器块的地址。

# Array
## 开一个长度为*变量*的数组

```c
#include<stdio.h>
int main(){
    int n;
    scanf("%d",&n);
    int a[n];
    for (int i = 0; i < n; i++)
    {
        printf("%d ",a[i]);
    }
}
```

a[n]必须是**局部变量**，若在全局定义，会报错 `variably modified 'a' at file scope`

```c
#include<stdio.h>
int n=10; //在c中，即使改为const int 也会报错，改为cpp文件后正常
int a[n];

int main(){
    for (int i = 0; i < n; i++)
    {
        printf("%d ",a[i]);
    }
}
```


## 二维数组所占内存是连续的

```cpp
#include <stdio.h>

int main()
{
	int s[2][3]={{1,3,5},
				 {2,4,6}};
	for (int i = 0; i < 6; i++){
		printf("%d ",s[0][i]); //s[0]超出后进入s[1]
	}	
}
```

## 局部变量是未经初始化的，全局变量被初始化为零。

```c
#include<stdio.h>
int a[100];
int main(){
    for (int i = 0; i < 100; i++)
    {
        printf("%d ",a[i]);
    }
}
```

结果全为`0`

```c
#include<stdio.h>
int main(){
    int a[100];
    for (int i = 0; i < 100; i++)
    {
        printf("%d ",a[i]);
    }
}
```

结果为乱七八糟的数

## 数组的初始化
### 用空白列表初始化局部数组

```c
#include <stdio.h>
int main(){
    int arr[5] = {}; // Initialize all elements to 0
    for(int i = 0; i < 5; i++){
        printf("%d ", arr[i]);
    }
    return 0;
}
```
使用空白列表 `{}` 可以将局部数组的所有元素初始化为0。这比手动初始化每个元素更方便。

### 部分初始化数组
只有数组的第一维大小可以不填，自动确定。
```C
int A[][]={{1,2,3},{4,5,6},{7,8,9}};  //错误
int A[3][]={{1,2,3},{4,5,6},{7,8,9}}; //错误
int A[][3]={{1,2,3},{4,5,6},{7,8,9}}; //正确
```
初始化的顺序: Cross then down ➡️↙️➡️
```C
#include <stdio.h>

int main() {
    int A[3][3] = {1, 2, 3, 4, 5, 6, 7};
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", A[i][j]);
        }
        printf("\n");
    }

    return 0;
}
```
而`int A[3][3] = {{1, 2, 3, 4}};`会因超出长度报错

### 初始化指定下标的元素
>⚠️
>
>经过我的测试，使用本节的方法，在windows中的gcc、msvc运行均会报错，linux下的gcc能够正常运行

例如`int arr[8] = {[3]=4};`

也可混合使用（仔细观察此时初始化的顺序）
```C
#include <stdio.h> //课本例题
int main() {
    int arr[8] = {1,[3]=4,[1]=2,6,[6]=7,8};
    for (int i = 0; i < 8; i++) {
        printf("%d ",arr[i]);
    }
    return 0;
}
```
顺序：当未指定下标时，将初始化下一个元素。
若一个元素被多次初始化，最终的值为最后一次的结果。

二维数组也可以
```c
#include <stdio.h>

int main() {
    int arr[5][5] = {[2] = {[3] = 8}};

    for (int i = 0; i < 5; i++) {
        for (int j = 0; j < 5; j++) {
            printf("%d ", arr[i][j]);
        }
        printf("\n");
    }

    return 0;
}
```



# Structure
## 枚举 Enum

### 不出现枚举名

```c
enum {SUN,MON,TUE,WED,THU,FRI,SAT}week1,week2; //定义了两个枚举变量
```

由于没有名称，无法引用，不能再定义更多这种类型的枚举变量

### 指定枚举数值时重复

```c
enum week{SUN,MON,TUE,WED=0,THU,FRI,SAT};
```

值分别为 `0 1 2 0 1 2 3 4`

### 当枚举的数值不连续时枚举变量的范围

```c
#include <stdio.h>

enum week{SUN,MON,TUE,WED,THU,FRI,SAT=10};

int main()
{
    enum week week1;
    week1=6;
    return 0;
}
```

week 的值不能为6 `error: invalid conversion from 'int' to 'week' [-fpermissive]`


## 联合与字段

联合可以将同一段存储空间以多种类型的数据存取；字段可以将一段内存按位宽拆分。

💡可以利用联合与字段简便的实现01的枚举：

```cpp
#include <stdio.h>
union selection{
    struct {
        unsigned a: 1;
        unsigned b: 1;
        unsigned c: 1;
        unsigned d: 1;
    };
    unsigned D;
}e;

int main(){
    for (e.D=0; e.D<0xf; e.D++){
        printf("a:%d  b:%d  c:%d  d:%d\n",e.a,e.b,e.c,e.d);
    }
    return 0;
}
```

字段不能跨越一个字的边界

```cpp
#include <stdio.h>

union selection{
    struct {
        unsigned short a: 1;
        unsigned short b: 16; //存在下一个字中
    };
    unsigned long long D;
}e;

int main()
{
    e.a=1;
    e.b=1;
    printf("%x",e.D);
    return 0;
}
```

# Function
## 实参求值顺序由编译器决定

```c
#include <stdio.h>

void printab(int a,int b){
    printf("%d %d",a,b);
}

int main()
{
    int a=0;
    printab(a,a++);
    return 0;
}
```

或者，

```c
#include <stdio.h>

int main()
{
    int a=0;
    printf("%d %d",a,a++);
    return 0;
}

```

## 参数数目可变的函数

```c
#include <stdio.h>
#include <stdarg.h>

int my_max(int n, ...){
	int ans=-2147483648;
	va_list a;
	va_start(a,n);
	for (int i = 0; i < n; i++)	{
		int tmp=va_arg(a,int);
		if(tmp >= ans)	ans=tmp;
	}
	va_end(a);
	return ans;
}

int main(){
	int a,b,c;
	scanf("%d%d%d",&a,&b,&c);
	printf("max of abc is: %d\n",my_max(3,a,b,c));
	return 0;
}
```

C++ 风格：

```cpp
#include <iostream>
#include <initializer_list>
using namespace std;

int my_max(initializer_list<int>arr){
    int ans=INT32_MIN;
    for (auto i = arr.begin(); i!=arr.end() ; i++){
        ans=max(ans,*i);
    }
    return ans;
}

int main()
{
    int a,b,c;
    cin>>a>>b>>c;    
    cout<<my_max({a,b,c});
    return 0;
}

```



# Miscellaneous
## 宏

### 条件编译

重复定义宏时，编译预处理时从头到尾顺序操作，即每个位置a的值为上一次定义的值，但会收到一条警告

```c
#include <stdio.h>
#define a 1
int x = 1;
int main() {
		#if a
		    printf("a != %d\n", a);//执行
				#define a 10
		#else
		    printf("a == 0\n");
		#endif
		
		#if a == 10
		    printf("a == %d\n", a);//执行
		#else
		    printf("a != 10\n");
		#endif

    return 0;
}

```
### if 控制
if 可以接一些表达式，或是宏定义的“函数”，但是此时传入的实参必须在宏中定义

```c
#include <stdio.h>
#define ABS(x) (((x)>0)?(x):-(x))
#define a -1

int main()
{
    #if ABS(a)==1
    printf("abs if a is 1");
    #endif

    return 0;
}
```

若参数为在程序中定义的变量，将无法正确读取，被识别为0

```c
#include <stdio.h>
#define ABS(x) (((x)>0)?(x):-(x))
int a=-1;

int main()
{
    #if ABS(a)==1
    printf("abs if a is 1");
    #elif ABS(a)==0
    printf("abs if a is 0");  //executed
    #endif

    return 0;
}
```

### 预定义宏

```c
#include <stdio.h>

int main()
{
    printf("%s %s %d %s %s",__DATE__,__FILE__,__LINE__,__TIME__,__FUNCTION__);
    //将输出 当前日期，源文件路径和名称，行号，当前时间，函数名
    return 0;
}

```



## exit() 退出程序

`exit();` 可直接退出程序，在主程序中，效果与return类似，而在调用的函数中，可以直接退出程序而非返回。

```c
#include <stdio.h>
#include <stdlib.h> //exit()函数需要的头文件

void work(){
    printf("message from work 1\n");
    exit(0);
    printf("message from work 2\n");
}

int main(){
    work();
    printf("message from main\n");
}
```




## 伪随机数

***线性同余法：***

$$
a_0=seed, a_n=(A\times a_{n+1}+B)\%M.
$$

A,B,M`= RAND_MAX` 是产生器设定的常数。

设定种子：

```c
srand(time(NULL)); //用时间做种子，保证每次运行时不同
srand(a); //使用固定的种子，生成的序列是固定的
```

## 格式化输出

- char: %c;  short, int: %d; long：%ld; 其中%开始的输出格式符称为占位符。
- 输出无符号数用u代替d(十进制)，八进制数用o代替d，十六进制用x代替d
- 整数表示宽度如printf(“%5c”, ‘A’)打印字符占5格(右对齐)。%-5d表示左对齐。  
- float：%f; double：%lf。float, double：%e科学计数。%g自动选宽度小的e或f。
- 可对%f或%lf设定宽度和精度及对齐方式。“%-8.2f”表示左对齐、总宽度8(包括符号位和小数部分)，其中精度为2位小数。
- 字符串输出：%s。可设定宽度和对齐：printf(“%5s”,”abc”)。

## 数组名和索引可以换位

