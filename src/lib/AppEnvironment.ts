interface EnvVariables {
    apiUrl: string;
  }
  
  interface Environments {
    development: EnvVariables;
    production: EnvVariables;
  }
  
  const appConfig: Environments = {
    development: {
        apiUrl: 'http://localhost:3000/api/trpc',
    },
    production: {
        apiUrl: 'https://legal-intellect.gpdev.me'
    },
  };

export const config: EnvVariables = appConfig["development"];
  