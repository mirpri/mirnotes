# Set up Linux

## Choose your favorite distro
作为开源系统，Linux有诸多发行版本。选择你喜欢的版本或最受欢迎的版本即可。

> [Omarchy](https://omarchy.org/) is an elegant, ready-to-use, **arch**-based linux setup with deep customization and super-easy installation.

### 选择桌面环境
桌面环境即是你将直接看到的图形界面。无论选择何种发行版本，KDE和Gnome都是最受欢迎的选项。比较它们不同的风格做出选择。

> Hyprland是一种现代化轻量型Wayland窗口管理器，核心理念是“动态平铺”，带来与PC完全不同的操作体验。


## Start installation
### 制作安装介质
在官方网站或镜像站（清华源：https://mirrors.tuna.tsinghua.edu.cn）下载iso映像文件
![sreenshot](image.png)

iso文件分为在线安装版和离线安装版。
- 在线安装版体积较小，安装时选项较多，但要求安装时联网。而且由于你需要在进入系统前联网，你不能进行复杂的设置，很可能需要有线网络连接。
- 离线安装版体积较大，下载时可能需要选择相应的桌面环境，仍然建议安装时联网以便获取更新、配置源以及安装额外软件。

准备一个至少8GB的U盘，下载刻录工具（免费免安装的rufus： https://rufus.ie/）
![alt text](image-1.png)

选择U盘和刚下载的iso文件，点击开始，稍等片刻，当进度条显示ready时制作完成，弹出U盘。

### 开始安装
开机时按F1-12，进入BIOS/UEFI,通过U盘启动，按照安装向导完成安装

## Install neccessary software

>⚠️ 不同发行版使用不同的包管理器，命令和包名称有所不同，需查询。

### 中文输入法
最流行的方式：Fcitx5

1. 安装fcixt5:
    ```bash
    sudo pacman -S fcitx5-im fcitx5-chinese-addons fcitx5-pinyin-zhwiki
    ```
    **fcitx5-im**: Installs the main daemon and the configuration GUI.  
    **fcitx5-chinese-addons**: Includes the actual Pinyin engine.  
    **fcitx5-pinyin-zhwiki**: Adds a massive dictionary based on Chinese Wikipedia to improve word association.

2. 在 `/etc/environment` 添加：
    ```Plaintext
    GTK_IM_MODULE=fcitx
    QT_IM_MODULE=fcitx
    XMODIFIERS=@im=fcitx
    ```
3. 设置自动启动
    **KDE Plasma**: Go to System Settings > Input & Output > Keyboard > Virtual Keyboard and select Fcitx 5. This is the most stable method for Wayland.

    **GNOME**: Use the "AppIndicator and KStatusNotifierItem Support" extension to see the tray icon.

    **Window Managers (Hyprland, etc.)**: Add `fcitx5 -d` to your startup script (e.g., `exec-once = fcitx5 -d` in Hyprland).

4. 设置输入法
    运行`fcixt5-configtool`，在图形界面中添加汉语拼音

重新启动后才可以成功打出汉字

### 开机自动挂载磁盘
当你的系统有多个硬盘或分区时，可能需要在开机时自动挂载它们。Linux通过`/etc/fstab`文件来配置开机自动挂载。

#### 查看硬盘信息
首先查看系统中的硬盘和分区信息

```bash
lsblk
```

查看UUID信息（推荐使用UUID挂载，更稳定）

```bash
sudo blkid
```

#### 创建挂载点
为要挂载的硬盘创建目录

```bash
sudo mkdir /mnt/data  #data可改为你喜欢的硬盘名称
```

#### 编辑fstab文件
编辑`/etc/fstab`文件来配置自动挂载

```bash
sudo nano /etc/fstab
```

在文件末尾添加挂载配置，格式如下：
```
UUID=your-disk-uuid /mnt/data ext4 defaults 0 2
```

参数说明：
- `UUID=your-disk-uuid`: 硬盘的UUID（从blkid命令获取）
- `/mnt/data`: 挂载点路径，应与之前创建的目录一致
- `ext4`: 文件系统类型（根据实际情况可能是ntfs、fat32等，但建议将硬盘格式化为ext4）
- `defaults`: 挂载选项
- `0`: dump选项（通常为0）
- `2`: fsck检查顺序（根分区为1，其他为2，不检查为0）

#### 测试挂载配置
保存文件后，测试配置是否正确

```bash
sudo mount -a
```

如果没有错误信息，说明配置正确。可以用以下命令查看挂载状态：

```bash
df -h
```

重启系统后，硬盘将自动挂载到指定位置。


### winscp (optional)
使用你的windows电脑查看/linux上的文件，或将新的文件复制进来。
接下来需要进入到Ubuntu中，查看一下是否开启OpenSSH服务

```bash
sudo systemctl status sshd
```

如果未安装ssh，需要安装ssh服务

```bash
sudo apt install openssh-server # Ubuntu
sudo pacman -S openssh # arch

sudo systemctl start sshd #启动服务
```
然后再检查一下ssh服务状态，显示active就说明已经安装成功

如果localhost可以连接，从其它机器也能ping通，但还是无法连接，可能是防火墙设置：
```bash
ufw status  # 查看状态，确认22端口放行
# 未放行则执行：
ufw allow 22/tcp && ufw reload
```

此时从windows端WinSCP新建连接，选择**SFTP**协议，输入linux设备的ip和用户名密码即可进入linux文件系统。

## Handling problems

### 界面显示异常
睡眠唤醒后屏幕画面撕裂或花屏，重启显示管理器：

想办法进入终端，执行以下命令之一：
```bash
#KDE 通常采用SDDM：
sudo systemctl restart sddm 

#Gnome 通常采用GDM
sudo systemctl restart gdm 

#其他可能采用lightdm
sudo systemctl restart lightdm
```

### chrome/vscode 显示异常
禁用硬件加速。
chrome在设置中搜索，vscode编辑配置文件：

- 按下 Ctrl+Shift+P 打开命令面板。

- 输入 Preferences: Configure Runtime Arguments 并回车。

- 在打开的 argv.json 文件中添加：
    ```
    "disable-hardware-acceleration": true，如下：
    ```
- 重启 VSCode。

## Tips
- For arch users, 如果需要的软件厂商没有提供对应的版本，自己编译又会遇到错误(如源代码依赖很古老的版本的工具链)，AUR上可能可以找到一键安装脚本。