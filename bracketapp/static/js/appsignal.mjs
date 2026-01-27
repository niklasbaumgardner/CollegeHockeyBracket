import Appsignal from "https://jspm.dev/@appsignal/javascript";
import { plugin } from "https://jspm.dev/@appsignal/plugin-window-events";

export const appsignal = new Appsignal({
  key: "d63002ab-9619-420b-8a7f-2fa2ebc5e6e4",
  namespace: "frontend",
  revision: "3.0.0",
});

appsignal.use(plugin());
