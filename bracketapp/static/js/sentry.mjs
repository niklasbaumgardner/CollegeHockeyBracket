if (window.Sentry) {
  Sentry.onLoad(function () {
    Sentry.init({
      release: "nbbracketchallengefront@3.0.17",
      environment: "production",
      integrations: [Sentry.browserTracingIntegration()],
      tracesSampleRate: 1.0,
      sendDefaultPii: true,
    });
  });
}
