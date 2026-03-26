if (window.Sentry) {
  Sentry.onLoad(function () {
    Sentry.init({
      release: "nbbracketchallengefront@3.0.27",
      environment: "production",
      integrations: [Sentry.browserTracingIntegration()],
      tracesSampleRate: 1.0,
      sendDefaultPii: true,
    });
  });
}
