import * as amplitude from '@amplitude/analytics-browser';
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser';

let initialized = false;

export function initAnalytics() {
  if(import.meta.env.ENABLE_ANALYTICS !== 'true') {
    console.log('Analytics disabled via environment variable');
    return;
  }
  if (initialized) return;

  amplitude.init('be7769bf5f16270a6d589ba750d165d9', {
    autocapture: {
      attribution: true,
      fileDownloads: true,
      formInteractions: true,
      pageViews: true,
      sessions: true,
      elementInteractions: true,
      networkTracking: true,
      webVitals: true,
      frustrationInteractions: true,
    },
    serverZone: 'EU',
  });

  const sessionReplayTracking = sessionReplayPlugin({
    sampleRate: 1, // 100% for initial validation; lower after testing or control via Remote Config
    forceSessionTracking: true,
    privacyConfig: {
      defaultMaskLevel: 'medium',
    },
  });
  amplitude.add(sessionReplayTracking);

  initialized = true;
}

export function track(event: string, properties?: Record<string, unknown>) {
  if (!initialized) initAnalytics();
  amplitude.track(event, properties);
}

export function optOutAnalytics(optOut: boolean) {
  // Mirrors Browser SDK optOut; Session Replay plugin follows this automatically
  amplitude.setOptOut(optOut);
}
