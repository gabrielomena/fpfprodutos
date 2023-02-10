<div align="center">
	<img src="https://fpftech.com/assets/img/icons/favicon.png" with="600"/>
	<h1>FPF - Desafio FullStack</h1>
</div>

![Badge](https://img.shields.io/badge/Version-1.0.0-%23542F61?style=for-the-badge&logo=appveyor)
![Badge](https://img.shields.io/badge/React-%233570B2?style=for-the-badge&logo=react)

## 🛠 Ferramentas

-   [ReactJs](https://pt-br.reactjs.org/)
-   [Vite](https://vitejs.dev/)
-   [NodeJs](https://nodejs.org/en/)


## 💻 Padronização de código

-   [Eslint](https://eslint.org/)
-   [Prettier](https://prettier.io/)
-   [EditorConfig](https://editorconfig.org/)

## 📦 Requisitos para rodar o sistema

-   [NODEJS]
-   [YARN / NPM]
-   [SEQUELIZE]

## 🚀 Executando o projeto
### 1. Abra o terminal e clone o projeto para sua máquina
```bash
git clone https://github.com/gabrielomena/fpfprodutos.git
```
### 2. BACKEND
#### 2.1 Acesse o projeto backend
```bash
cd fpfprodutos/backnode
```
#### 2.2 Copie o .env-example para .env
```bash
cp .env-example .env
```
#### 2.3 Edite conforme suas configurações do banco de dados Mysql
```bash
PORT = //porta do servidor node que será usada
DB_USER = 
DB_PASSWORD = 
DB_NAME = 
DB_HOST = 
DB_DIALECT = mysql
```
#### 2.4 Instale as dependências
```bash
yarn 
```
ou 
```bash
npm install
```
#### 2.5 Start o servidor
```bash
yarn dev 
```
ou 
```bash
npm run dev
```


