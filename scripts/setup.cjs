/**
 * 首次安装时自动把 server/.env.example 复制为 server/.env
 * 保证 DailyHotApi 能读取到正确的端口配置（PORT=6688）
 */

const fs   = require('fs')
const path = require('path')

const root    = path.resolve(__dirname, '..')
const src     = path.join(root, 'server', '.env.example')
const dst     = path.join(root, 'server', '.env')

if (!fs.existsSync(src)) {
  console.warn('⚠️  server/.env.example 不存在，请检查 submodule 是否已初始化')
  console.warn('   运行: git submodule update --init')
  process.exit(1)
}

if (fs.existsSync(dst)) {
  console.log('✅ server/.env 已存在，跳过复制')
} else {
  fs.copyFileSync(src, dst)
  console.log('✅ 已从 server/.env.example 生成 server/.env（端口 6688）')
}
