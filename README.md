# 🌤️ Weather Forecast App

[![Vite](https://img.shields.io/badge/Vite-4.4.0-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/github/license/joy-zhou88/weather-project)](LICENSE)

基于和风天气API构建的现代化天气查询应用，具备实时数据展示和响应式设计。


## ✨ 核心功能

- 🔍 实时城市天气查询
- 📅 7天天气预报展示
- 🌡️ 温度、湿度、风速等多维度数据
- 📱 响应式设计（适配移动端和桌面端）
- ⚡ Vite驱动的极速开发体验

## 🚀 快速开始

### 前置要求
- Node.js ≥ 18
- npm ≥ 10
- 和风天气API Key（[免费注册](https://dev.qweather.com/)）

### 开发环境

```bash
# 克隆项目
git clone https://github.com/joy-zhou88/weather-project.git
cd weather-project

# 安装依赖
npm install

# 配置API密钥 (需先注册和风天气)
### 获取API Key
1. 访问[和风天气开发者平台](https://dev.qweather.com/)
2. 点击右上角"注册"创建账号
3. 登录后进入[控制台](https://console.qweather.com/)
4. 在「应用管理」中点击「创建应用」
   - 应用名称：填写您的应用名（如"WeatherApp"）
   - 应用类型：选择「普通应用」
   - 选择「Web API」作为平台
5. 创建成功后，在应用列表中查看您的API Key

# 复制环境模板文件
cp .env

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview

## 🖼️ 截图预览


<div align="center">
  <img src="https://github.com/joy-zhou88/weather-project/raw/main/screenshots/desktop.png" width="45%">
  <img src="https://github.com/joy-zhou88/weather-project/raw/main/screenshots/mobile.png" width="45%">
</div>