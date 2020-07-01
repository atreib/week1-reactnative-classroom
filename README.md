# 1# Week - React Native

[Bem vindo ao mobile](https://www.notion.so/Bem-vindo-ao-mobile-13e33131940e4308ab79db1964028c5e)

# O que é o React Native?

Basicamente, é uma versão do React, para mobile (um único código, multi plataforma). 

# Arquitetura

O Javascript passa pelo Metro Bundler (um packager que fica monitorando o nosso JS e gera o bundle.js - tipo o webpack no ReactJS). O nosso bundle, então, é repassado para a bridge, que transforma o código em Android (Java) e iOS (Objective-C).

# O que muda do ReactJS para o Native?

Primeiro, não usamos o HTML, usamos as tags do React Native. Além disto, nenhum elemento em estilo, ou seja, temos que criar todo o CSS - porém, não existe classe, ou ID, ou coisas do gênero, usa-se um objeto javascript que criamos e que possui as estilizações (que revemos mais adiante).

# Configurando nossa SDK

Para configurar o ambiente Android no Windows, iremos realizar 6 instalações principais:

- Chocolatey;
- Node.js LTS;
- Yarn 1;
- Python 2;
- JDK 8 (importante ser a versão 8 e não mais recente);
- Android Studio e dependências.

Comece instalando o Chocolatey, pois, através dele, vamos instalar os outros. Para isto, abra o seu Powershell em modo admin e execute o seguinte código:

```bash
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

Com o Chocolatey instalado, vamos instalar o Node.js, o Yarn, o Python e o JDK (também no Powershell admin):

```bash
choco install -y nodejs-lts yarn python2 jdk8
```

Agora, crie uma pasta para você armazenar as SDKs do Android que você for utilizar. Não use espaços e nem caracteres especiais. De preferência, guarde em um lugar de fácil acesso (por exemplo: "C:\android\sdk". 

Assim que criar o diretório, vamos arrumar os PATH do Sistema:

- ANDROID_HOME: C:\android\sdk
- JAVA_HOME: C:\Program Files\Java\jdk[SUA_VERSAO]
- PATH:

> %ANDROID_HOME%\emulator
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
%ANDROID_HOME%\platform-tools

A variável PATH já existe, então você só terá que editá-la adicionando os 4 diretórios.

Por último, vamos instalar o React Native CLI. Para isto, execute o seguinte comando (ainda no Powershell admin):

```bash
yarn global add react-native-cli
```

Agora termine a instalação e configuração do Android Studio (lembrando que já configuramos os PATHs acima) seguindo a própria documentação da RocketSeat: [https://react-native.rocketseat.dev/android/windows](https://react-native.rocketseat.dev/android/windows) 

# Começando o nosso projeto

Para iniciar um novo app, basta executar: `react-native init {nome}` 

- **View**: um container (tipo div, header, etc...)
- Nenhum campo tem valor semântico (nao existe "h1 pra titulo" e "p pra texto", é tudo Text)
- Text: qualquer tipo de texto (p, h1, span...)
- Tudo precisa ser feito através de CSS (usando o StyleSheet do react-native)
- Todos os elementos possuem display: flex

Como nossa API é localhost, para o device conseguir enxergar ela, temos que fazer uma regra para o adb (android) escutar as portas locais. Para isto, rode: `adb reverse tcp:{porta} tcp:{porta}`

Para executar o projeto, rode: `react-native run-android`

Para abrir o devtools/console do projeto, abra o context menu no aparelho e selecione a opção "debug".

### Qual a URL da minha API localhost?

- Android com emulador: Rodar o "adb reverse" e usar "localhost" na URL da API
- Android com device: Usar o IP da máquina
- iOS com emulador: Usar "localhost"
- iOS com device: Usar o IP da máquina
