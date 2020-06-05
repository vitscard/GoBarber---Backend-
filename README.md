# Recuperação de senha

**Requisitos Funcionais** //funcionalidades do sistema

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**Requisitos não funcionais** // não ligadas a regra de negócio

- Utilizar Mailtrap para testar envio de e-mails em ambiente de desenvolvimento;
- Utilizar amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano(Background job);

**Regras de Negócio** //

- O link enviado por e-mail para resetar senha deve expirar em (x)horas;
- O usuário precisa confirmar a nova senha ao resetar;

# Atualização de Perfil

**RF**

- o usuário deve poder atualizar seu nome, e-mail e senha;

**RN**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do Prestador

**RF**
-O usuário deve poder listar seus agendamentos de um dia especifico;
-O prestador deve receber uma notificação sempre que houver um novo agendamento;
-O prestador deve poder visualizar as notificações não lidas;

**RNF**
-Os agendamentos do prestador no dia devem ser armazenados em cache;
-As notificações do prestador devem ser armazenadas no mongoDB;
-As notificações do prestador devem ser enviadas em tempo real utilizando o socket.io;

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponivel de um determinado prestador;
- O usuário deve poder listar horários disponiveis em um dia especifico de um prestador;
- O usuário deve poder listar um novo agendamento com um prestador;

**RNF**
-A listagem de prestadores deve ser armazenada em cache;

**RN**

- cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponivel entre 8h e 18h (Primeiro às 8h, último às 17h)
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
