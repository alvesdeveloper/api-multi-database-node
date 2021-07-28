# api-multi-database-node
Construção de uma simples api que grava contatos em bases distintas, conforme identificação de chave JWT.


#instruções

Depois de clonar o projeto, você precisará seguir as etapas abaixo:

1 - Ter o docker instalado e executar "docker-compose up --build -d" para o arquivo docker-compose.yml. Isto criará o ambiente de banco de dados;

2 - Executar "yarn install", isso instalará todas as dependencias do projeto;

3 - Para levantar o serviço, basta executar o arquivo index.js;

4 - Para executar os endpoints, você precisa de um token de autorização. Para pegá-lo, basta executar o endpoint  "/authenticate", passando um cliente válido na requisição de envio, conforme mostra abaixo:

{
	"client": "varejão"
}




#Obs.:

1 - Só existem dois clientes válidos: macapá ou varejão.

2 - Os endpoins seguirão automaticamente o contexto de database, conforme identificação recebida através do token JWT. O cliente "macapá", consulta e pesiste dados no banco mysql e o cliente "varejão" no postegres.

3 - Na pasta "files", seguem dados do json para cada cliente, para uso no endpoint de inserção de dados. Também segue o template da api usada no Insomnia.

4 - As bases de dados são criadas automaticamente ao consumir algum endpoint.


