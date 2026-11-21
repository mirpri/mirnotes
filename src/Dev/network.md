# Network

## pip
```
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

## huggingface
```
export HF_ENDPOINT=https://hf-mirror.com
```

## conda
```
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/
conda config --set show_channel_urls yes
```

## go
```
# 七牛 (推荐)
go env -w  GOPROXY=https://goproxy.cn,direct
# 阿里
go env -w GOPROXY=https://mirrors.aliyun.com/goproxy/,direct
```

## GitHub
```
# 配置 GitHub 镜像
git config --global url."https://ghfast.top/https://github.com/".insteadOf "https://github.com/"
# or
git config --global url."https://gh-proxy.com/https://github.com/".insteadOf "https://github.com/"

# 取消 GitHub 镜像
git config --global --unset url.https://ghfast.top/https://github.com/.insteadOf
git config --global url."https://gh-proxy.com/https://github.com/".insteadOf "https://github.com/"

# 查看当前配置
git config --global --get-regexp url
```

## 用ssh代理
本地clash监听7897端口，让远程主机也走本地代理
```
ssh -R 7890:127.0.0.1:7897 -N <host>
```
在远程主机的终端启用代理
```
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
```

相反的，将远程主机的端口映射到本地的ssh命令是：
```
ssh -L 5432:127.0.0.1:5432 <host>
```
可以用于本地访问远程主机的服务（如数据库、Web服务等）