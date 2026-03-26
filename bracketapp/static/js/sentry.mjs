if (window.Sentry) {
  Sentry.onLoad(function () {
    Sentry.init({
      release: "nbbracketchallengefront@3.0.28",
      environment: "production",
      integrations: [Sentry.browserTracingIntegration()],
      tracesSampleRate: 1.0,
      sendDefaultPii: true,
    });
  });
}
