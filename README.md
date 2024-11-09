# Devel Task

Devel Task é uma plataforma robusta para registro e organização de Tasks. Ela oferece uma maneira eficiente de gerenciar e acompanhar suas Tasks, sendo ideal para organização e planejamento.

## Funcionalidades

- Interface amigável
- Tasks detalhadas com custo e data para melhor gerenciamento
- Registro de Fotos para os seus Pets
- Funcionalidade de busca para acesso rápido aos registros
- Design responsivo para uso perfeito em desktops e dispositivos móveis

## Stack Tecnológica

- **Frontend**: Vue.js
- **Backend**: Node.js com Nest
- **Banco de Dados**: PostgreeSQL
- **Conteinerização**: Docker
- **Hospedagem**: Google Cloud
- **Domínio e SSL**: Domínio personalizado (itmf.app.br) com criptografia SSL

## Arquitetura

Devel Task segue uma arquitetura de microsserviços:

1. **Serviço de Frontend**: Aplicação Vue.js que serve a interface do usuário
2. **Serviço de Backend**: API Node.js com Nest que lida com a lógica de negócios e gerenciamento de dados
3. **Serviço de Banco de Dados**: PostgreeSQL.

Todos os serviços são conteinerizados usando Docker para ambientes de desenvolvimento e implantação consistentes.

## Implantação

Devel Task está implantado em um Servidor Privado Virtual (VPS) na Google Cloud usando contêineres Docker. A aplicação é acessível através do domínio personalizado disponibilizado pelo próprio Desenvolvedor https://itmf.app.br, configurado com SSL para conexões seguras.

## Começando

Para executar o Capizoo localmente para desenvolvimento:

1. Clone o repositório:
   ```
   git clone https://github.com/lugafaell/devel-task.git
   cd devel-task
   ```

2. Instale as dependências:
   ```
   # Instale as dependências do frontend
   cd task-manager-frontend
   npm install

   # Instale as dependências do backend
   cd task-manager-backend
   npm install
   ```

3. Inicie os servidores de desenvolvimento:
   ```
   # Inicie o frontend
   cd task-manager-frontend
   npm run serve

   # Inicie o backend
   cd task-manager-backend
   npm run start
   ```
4. Caso opte por utilizar o docker, pode simplesmente executar o docker compose configurado na raiz do projeto para facilitar a execução e instalação de todas as dependências necessárias:
   ```
   # Construa e execute os containers
   docker compose up --build
   ```
5. Acesse a aplicação em `http://localhost:8080` (ou na porta especificada na sua configuração de frontend). Em caso de utilização do docker acesse a porta que está exposta o frontend da sua aplicação.


---

Desenvolvido com ❤️ por Rafael de Menezes
