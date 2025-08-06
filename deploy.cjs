// deploy.cjs
const { execSync } = require('child_process')
const ghpages = require('gh-pages')

console.log('🛠️ 正在构建项目...')
execSync('pnpm run build', { stdio: 'inherit' })

console.log('🚀 正在部署到 https://github.com/DarkNightWalker/DarkNightWalker.github.io')

ghpages.publish(
    'dist', // 构建输出目录
    {
        branch: 'main', // 或 master，看你的 GitHub Pages 仓库的默认分支
        repo: 'git@github.com:DarkNightWalker/DarkNightWalker.github.io.git',
        user: {
            name: 'DarkNightWalker',
            email: '3060554224@qq.com',
        },
        message: 'deploy: 自动构建并部署 🚀',
    },
    (err) => {
        if (err) {
            console.error('❌ 部署失败', err)
        } else {
            console.log('✅ 部署成功！访问 https://DarkNightWalker.github.io')
        }
    }
)
