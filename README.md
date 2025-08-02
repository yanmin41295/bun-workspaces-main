commander : https://www.npmjs.com/package/commander

vitest 不使用bun相关的测试api可以使用

只用bun做包管理器，和mono项目架构，不使用bun相关的api，避免vitest无法运行


$env:HTTP_PROXY="http://127.0.0.1:7890"
$env:HTTPS_PROXY="http://127.0.0.1:7890"

export HTTPS_PROXY="http://127.0.0.1:7890"
export HTTP_PROXY="http://127.0.0.1:7890"