import Appsignal from "https://jspm.dev/@appsignal/javascript";
import { plugin } from "https://jspm.dev/@appsignal/plugin-window-events";

export const appsignal = new Appsignal({
  key: "124822cf-78b5-4b6b-8105-f525313d458f",
  namespace: "frontend",
  revision: "3.0.0",
});

appsignal.use(plugin());
