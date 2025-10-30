# Elegant Codes

>🖐️
>
>This is a collection of perfectly written codes to perform a specific task. Each code snippet is designed to be efficient, easy to understand, and reusable. These examples will probably help you improve your coding skills and find a better practice to implement a function.
>
>If you have any questions or suggestions, feel free to share it with me!

## Hanoi
经典的汉诺塔问题(c++)
```c++
#include <bits/stdc++.h>
using namespace std;

int N;
int cnt=0;

int rod[3]={0,0,0};
char trans[]={'A','B','C'};
void movedisk(int n, int fr, int mi, int to){
    if (n==1){//边界条件
        rod[fr]--;rod[to]++;
        cnt++;
        cout<<"step "+to_string(cnt)+": movedisk "+trans[fr]+" to "+trans[to]<<"      ["+to_string(rod[0])+"] ["+to_string(rod[1])+"] ["+to_string(rod[2])+"]"<<endl;
        return;
    }
    movedisk(n-1,fr,to,mi);
    movedisk(1,fr,mi,to);
    movedisk(n-1,mi,fr,to);//每增加一个disk，需要的次数为原来*2+1.
    return;
}

int main()
{
    cout<<"number of disks: ";
    cin>>N;
    rod[0]=N;
    movedisk(N,0,1,2);
    return 0;
}
```

## 杨辉三角
打印杨辉三角
```c
#include <stdio.h>

int countWid(int num){
    return 4*num+1;
}

void giveSpace(int x){
    if(x/100)printf(" ");
    else if(x/10)printf("  ");
    else printf("   ");
}

int C(int i,int j){
    if(j==0)return 1;
    return C(i,j-1)*(i-j+1)/j;
}

int main()
{
    int N;
    scanf("%d",&N);
    int center=countWid(N)/2+1;

    for (int i = 0; i <= N; i++)
    {
        int spaces=center-countWid(i)/2-1;
        for (int j = 0; j < spaces; j++)printf(" ");
        for (int j = 0; j <= i; j++)
        {
            int tmp=C(i,j);
            printf("%d",tmp);
            giveSpace(tmp);
        }
        if(i!=N)printf("\n");                
    }
    return 0;
}
```




## 逆波兰表达式
一种后缀表达式，
e.g.  4 -13 5 / +  answer: 2

```c
#include <stdio.h>

int stoi(char *s){
	int ans=0, sgn=1;
	if(s[0]=='-'){
		sgn=-1;
	}
	else
		ans=s[0]-'0';
	for (int i = 1; s[i]!='\0'; i++){
		ans=ans*10+s[i]-'0';
	}
	return sgn*ans;
}

int main()
{
	char in[20];
	int stack[10010];
	int tail=-1;
	int a,b;
	while (scanf("%s",in)!=EOF)
	{
		switch (in[0])
		{
		case '+':
			a=stack[tail--], b=stack[tail--];
			stack[++tail]=a+b;
			break;
		case '-':
			if(in[1]!='\0'){
				stack[++tail]=stoi(in);
				break;
			}
			a=stack[tail--], b=stack[tail--];
			stack[++tail]=b-a;
			break;
		case '*':
			a=stack[tail--], b=stack[tail--];
			stack[++tail]=a*b;
			break;
		case '/':
			a=stack[tail--], b=stack[tail--];
			stack[++tail]=b/a;
			break;		
		default:
			stack[++tail]=stoi(in);
			break;
		}
	}
	printf("%d",(int)stack[0]);

	return 0;
}


```

## 矩阵运算
优雅的使用运算符进行矩阵运算(c++)

```c++
#include <bits/stdc++.h>
using namespace std;

struct matrix {
    int s_i, s_j;
    vector<vector<double>> data;
};

struct vectors {
    int s;
    vector<double> data;
};

matrix operator*(const matrix& a, const matrix& b) {
    assert(a.s_j == b.s_i);

    matrix c;
    c.s_i = a.s_i;
    c.s_j = b.s_j;
    for (int i = 0; i < c.s_i; i++) {
        c.data.push_back(vector<double>());
        for (int j = 0; j < c.s_j; j++) {
            double sum = 0;
            for (int k = 0; k < a.s_j; k++) {
                sum += a.data[i][k] * b.data[k][j];
            }
            c.data[i].push_back(sum);
        }
    }
    return c;
}

matrix operator*(const vectors& a, const matrix& b) {
    matrix c;
    c.s_i = b.s_i;
    c.s_j = b.s_j;
    for (int i = 0; i < b.s_i; i++) {
        c.data.push_back(vector<double>());
        for (int j = 0; j < b.s_j; j++) {
            c.data[i].push_back(a.data[i] * b.data[i][j]);
        }
    }
    return c;
}

matrix operator~(const matrix& a) {  // Transpose
    matrix b;
    b.s_i = a.s_j;
    b.s_j = a.s_i;
    for (int i = 0; i < b.s_i; i++) {
        b.data.push_back(vector<double>());
        for (int j = 0; j < b.s_j; j++) {
            b.data[i].push_back(a.data[j][i]);
        }
    }
    return b;
}

void inputMatrix(matrix* p, int si, int sj) {
    p->s_i = si;
    p->s_j = sj;
    for (int i = 0; i < si; i++) {
        p->data.push_back(vector<double>());
        for (int j = 0; j < sj; j++) {
            p->data[i].push_back(0);
            cin >> p->data[i][j];
        }
    }
}

void inputVectors(vectors* p, int si) {
    p->s = si;
    for (int i = 0; i < si; i++) {
        p->data.push_back(0);
        cin >> p->data[i];
    }
}

void outputMatrix(const matrix& p) {
    for (int i = 0; i < p.s_i; i++) {
        for (int j = 0; j < p.s_j; j++) {
            cout << p.data[i][j] << ' ';
        }
        cout << endl;
    }
}

int main() {
    matrix Q, K, V, ans;
    vectors W;
    int n, d;
    cin >> n >> d;

    inputMatrix(&Q, n, d);
    inputMatrix(&K, n, d);
    inputMatrix(&V, n, d);
    inputVectors(&W, n);

    ans = (W * (Q * ~K)) * V;

    outputMatrix(ans);

    return 0;
}
```

## 高精度四则运算
重载运算符实现输入、输出+、-、*
```c++
#include <bits/stdc++.h>
using namespace std;

const int mm=10010;

struct lll{
    short d[mm];
    int l;
    lll(){
        memset(d,0,sizeof(d));
        l=0;
    } 
};

lll operator+ (lll a,lll b){
    lll c;
    short tmp=0;
    int dts=max(a.l,b.l);
    for (int i = 0; i < dts; i++)
    {
        c.d[i]=a.d[i]+b.d[i]+tmp;
        if(c.d[i]>=10){
            c.d[i]-=10;
            tmp=1;
        }
        else{
            tmp=0;
        }
    }
    if (tmp){
        c.d[dts]=1;
        c.l=dts+1;
    }
    else{
        c.l=dts;
    }
    return c;
}

lll operator* (lll a,int b){
    for (int i = 0; i < a.l; i++)
    {
        a.d[i]*=b;
    }
    int i;
    for (i = 0; i < a.l || a.d[i]; i++)
    {
        a.d[i+1]+=a.d[i]/10;
        a.d[i]%=10;
    }
    a.l=i;
    return a;    
}

lll operator* (lll a,lll b){
    lll c;
    for (int i = 0; i < a.l; i++)
    {
        for (int j = 0; j < b.l; j++)
        {
            c.d[i+j]+=a.d[i]*b.d[j];
            int k;
            for (k = 0; k < c.l || c.d[k]; k++)
            {
                c.d[k+1]+=c.d[k]/10;
                c.d[k]%=10;
            }
            c.l=max(c.l,k);       
        }        
    }
    return c;
}



ostream & operator<< (ostream &o,lll a){
    string s;
    for (int i = a.l-1; i >= 0; i--)
    {
        s.push_back(a.d[i]+'0');
    }
    o<<s;
    return o;
}

istream & operator>> (istream &in,lll &b){
    string s;
    in>>s;
    int len=s.length();
    for (int i = 0; i < len; i++)
    {
        b.d[i]=s[len-i-1]-'0';
    }
    b.l=len;
    return in;
}


int main()
{
    lll n1,n2,n3;
    cin>>n1>>n2;
    n3=(n1*n2)*2;
    cout<<n3;

    return 0;
}
```


## 小数的进制转换

```c
#include<iostream>
using namespace std;

string trans="0123456789ABCDEFGHIJKLMNOP";

double convertto10(string s, int base){
    size_t i;
    int ansi=0; double ansf=0;
    for (i = 0; i < s.size(); i++)
    {
        if(s[i]=='.')break;
        ansi*=base;
        ansi+=trans.find(s[i]);
    }
    for (size_t j=s.size()-1; j>i; j--)
    {
        ansf+=trans.find(s[j]);
        ansf/=base;
    }
    return ansi+ansf;
}

string convertfrom10(double x, int base){
    int xi; double xf;
    xi=int(x); xf=x-xi;

    string ans="";

    while (xi){
        ans=trans[xi%base]+ans;
        xi/=base;
    }
    if(xf==0)return ans;
    ans+='.';
    int tmpcnt=0;
    while (xf && tmpcnt++<100)
    {
        xf*=base;
        int tmp=int(xf);
        ans+=trans[tmp];
        xf-=tmp;
    }
    return ans;
}

int main(){
    string x; int b1,b2;
    cout<<"Input number, source base, target base.\n";
    cin>>x>>b1>>b2;
    cout<<"answer: "<<convertfrom10(convertto10(x,b1),b2);
    return 0;
}
```




## 文件读写模式实现替换

```c
#include <stdio.h>

FILE *fp;

void freplace(char _from, char _to) {  // 字符替换
    rewind(fp);                        // 定位到文件开始，清除标志
    while (!feof(fp)) {
        char tmp = fgetc(fp);
        long tmppos= ftell(fp);
        if (tmp == _from) {
            fseek(fp, -1, SEEK_CUR);
            fputc(_to, fp);
            fseek(fp,-1,SEEK_CUR);
        }
        printf("%c %d %d\n",tmp, ftell(fp), feof(fp));
    }
}

int main() {
    if (!(fp = fopen("..\\a.txt", "r+"))) {
        printf("failed to open");
        return 0;
    }
    freplace('p', 'd');

    fclose(fp);
    return 0;
}
```

## 无中间变量交换变量
```c
#include <iostream>
using namespace std;

int main() {
    int a=1234567,b=8901234;
    a=a^b;
    b=a^b;
    a=a^b;
    cout<<a<<" "<<b<<endl;    
    return 0;
}
```
其中，异或运算也可以用加减或乘除替代，但数据过大时可能溢出，乘除时要避免包含0。


# Algorithms

Instances below are with advanced algorithms involved.

## KMP 字符串匹配
```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;
string s, txt;
vector<int> lsp;  // LSP: longest suffix which is also a prefix

void initlsp() {
    int n = s.size();
    lsp.clear();
    for (int i = 0; i < n; i++) {
        lsp.push_back(0);
    }
    int len = 0;
    for (int i = 1; i < n; i++) {  // NOTE: i start from 1
        while (len > 0 && s[i] != s[len]) {
            len = lsp[len - 1];  // fallback
        }
        if (s[i] == s[len]) {
            len++;  // increment len when match
        }
        lsp[i] = len;
    }
}

int match() {
    int n = s.length(), m = txt.length();
    int p = 0;
    for (int i = 0; i < m; i++) {
        while (p && txt[i] != s[p]) {
            p=lsp[p-1];
        }
        if(txt[i]==s[p]){
            p++;
        }
        if(p==n){
            return i-p+1;
        }
    }

    return -1;
}

int main() {
    cout << "input pattern string: ";
    cin >> s;
    initlsp();

    cout << "LSP: ";
    for (int i : lsp) {
        cout << i << ' ';
    }
    cout << endl;

    cout << "input text string: ";
    cin >> txt;
    int ans = match();
    if (ans >= 0) {
        cout << "index: " << match() << endl;
        cout << txt << endl;
        for (int i = 0; i < ans; i++) {
            cout << ' ';
        }
        for (int i = 0; i < s.length(); i++) {
            cout << '^';
        }
    } else {
        cout << "not found";
    }
    return 0;
}
```
