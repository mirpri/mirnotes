# My Favorite Softwares

## Neovim

Try out my configuration of Neovim based on LazyVim:  
https://github.com/mirpri/MyLazyVim


### clangd config
Clangd is the C/C++ language server. In windows, it can be configured globally in `C:\Users\xxx\AppData\Local\clangd\config.yaml`. You need to adjust the settings based your default compiler. Basically, if you are using the latest version of `mingw`, set to:
```yaml
CompileFlags:
  Add:
    - -std=c++17 # set standard
    - --target=x86_64-w64-windows-gnu # Universal Headers will work
```

## nushell
I use Nushell on Windows as it is much faster than PowerShell and behaves more (though not exactly) like a Unix shell. It fast, beautiful and flexible.

### conda
`conda init`  doesn't support nushell. You will need script from https://github.com/nushell/nu_scripts/blob/main/modules/virtual_environments/conda.nu. and use it in `config.nu`:
```
use ./conda.nu
```

### oh-my-posh
omp can work seemlessly with nushell.