# Rocketshoes

### Application to simulate a shoe store.

#### Status: Finished

[About](#about) | [Installation](#installation) | [Development setup](#development-setup) | [Technologies](#technologies) | [License](#license)

## About

This application is a simulation of a shoe store that uses data from a fake API. **This is not a fully functional application and its only purpose is to learn the technologies listed in the [Technologies](#technologies) section.** This is a challenge made by [RocketSeat](https://rocketseat.com.br/) in the Ignite acceleration program.

## Installation

To run this project you will need to have the following tools:

### Node.js

Node.js is a JavaScript runtime environment and the base for this application.

#### Linux (Ubuntu based distributions):
```bash
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install -y nodejs
```
#### Linux (Debian based distributions):
```bash
curl -sL https://deb.nodesource.com/setup_14.x | bash -
apt install -y nodejs
```
#### macOS (using [Homebrew](https://brew.sh/)):
```bash
brew install node@14
```
#### Windows (using [Chocolatey](https://chocolatey.org/)):
```powershell
cinst nodejs-lts
```
To verify if the installation was successful, just type `node -v` to get the Node.js version and `npm -v` to get the npm version.

### Yarn package manager

The `yarn` package manager is an alternative to `npm`.

#### Linux (Ubuntu/Debian based distributions):

Configuring the repository:
```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

Installing Yarn:
```bash
sudo apt update
sudo apt install --no-install-recommends yarn
```

Add the following to your `.bashrc` or `.zshrc` file:
```bash
export PATH="$PATH:`yarn global bin`"
```

#### macOS (using [Homebrew](https://brew.sh/)):

Installing Yarn:
```bash
brew install yarn
```

Add the following to your `.bashrc` or `.zshrc` file:
```bash
export PATH="$PATH:`yarn global bin`"
```

#### Windows (using [Chocolatey](https://chocolatey.org/)):
```powershell
cinst yarn
```

Chosse the option `[A]ll - yes to all`.

Reopen the terminal or run `source ~/.bashrc` or `source ~/.zshrc` for the changes to take effect. To verify if the installation was successful, just type `yarn --version` to get the Yarn version.

## Development setup

To run the application and/or start working on it, you first have to set up the development environment.

### Installing dependencies

In the folder `rocketshoes`, execute the following command to install all dependencies of the project:

```bash
yarn
```

### Running the server (fake API)

To run the server (fake API), execute the following command:

```bash
yarn server
```

After running the above command, you will see that the server is running on `localhost:3333`.

### Running the web client

To run the web client execute the following command:

```bash
yarn start
```

After running the above command, open a browser and go to:

```
http://localhost:3000/
```

### Running the application tests

To run the application tests, execute the following command:

```bash
yarn test
```

After running the command above, the results should be shown in the terminal.

## Technologies

- [React](https://reactjs.org/), [Typescript](https://www.typescriptlang.org/)
- [JSON server](https://github.com/typicode/json-server)
- See [package.json](package.json) file.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
