# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

cd を指定するときは必ず下記の場所に移動してください！！！
cd my-react-app
npm run dev

html ショートカットキー
html:5 + Tab または Enter

localStorage に token を保存する作業は Login.jsx で setItem しているよ！！

'Content-Type': 'application/json'は put,delete,post,patch のときに必要

lighthouse で直したこと
1.meta タグの付与
2.url を改行させる
javascript kiB だから大丈夫かな、MB だとさすがに疑うレベルかな
javascript 系はデプロイしたら治ることがある
