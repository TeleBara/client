import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

export function getApiDomain(): string {
  const apiPort: number = 7070;
  const apiUrl: string = `http://localhost:${apiPort}/auth/`;
  return apiUrl;
}

export function getWebsiteDomain(): string {
  const websitePort: number = 1420;
  const websiteUrl: string = `http://localhost:${websitePort}`;
  return websiteUrl;
}

export const SuperTokensConfig = {
  appInfo: {
    appName: "TeleBara",
    apiDomain: getApiDomain(),
    apiBasePath: "/auth/auth",
    websiteDomain: getWebsiteDomain(),
  },
  style: `[data-supertokens~=container] {
      --palette-background: 51, 51, 51;
      --palette-inputBackground: 41, 41, 41;
      --palette-inputBorder: 41, 41, 41;
      --palette-textTitle: 255, 255, 255;
      --palette-textLabel: 255, 255, 255;
      --palette-textPrimary: 255, 255, 255;
      --palette-error: 173, 46, 46;
      --palette-textInput: 169, 169, 169;
      --palette-textLink: 169, 169, 169;
    }`,
  useShadowDom: false,
  recipeList: [
    EmailPassword.init({
      signInAndUpFeature: {
        signUpForm: {
          formFields: [
            {
              id: "username",
              label: "Username",
              placeholder: "Choose a username",
            },
            {
              id: "email",
              label: "Email",
              placeholder: "Email address",
            },
            {
              id: "password",
              label: "Password",
              placeholder: "Password",
            },
          ],
        },
        signInForm: {
          formFields: [
            {
              id: "email",
              label: "Email",
              placeholder: "Email address",
            },
            {
              id: "password",
              label: "Password",
              placeholder: "Password",
            },
          ],
        },
      },
    }),
    Session.init(),
  ],
  getRedirectionURL: async (context: any) => {
    if (context.action === "SUCCESS" && context.newSessionCreated) {
      return "/";
    }
  },
};
