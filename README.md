# WisGate 2.0 Extension Boilerplate
### This is a repository for storing extension template used by [create-rak-ext tool](https://git.rak-internal.net/product-rd/gateway/forge/sig/extension/create-rak-ext)
### Please, keep in mind that you have to follow existing directory structure and follow the naming conventions.

## Build and deploy example extensions
All the commands provided have to be run from directory which contains your extension repository because commands are taking directory name as an argument.

```shell
 phobos@skytech-linux  ~  tree -L 1
.
├── com_rak_spectral_scan
├── projects
├── snap
└── tools
```
Build an extension
```shell
 phobos@skytech-linux  ~  create-rak-ext build com_rak_spectral_scan
```
Deploy an extension
```shell
 phobos@skytech-linux  ~  create-rak-ext deploy com_rak_spectral_scan
```
