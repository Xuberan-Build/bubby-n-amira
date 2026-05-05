declare global {
  interface Window {
    _learnq: unknown[][];
  }
}

function push(args: unknown[]) {
  if (typeof window === "undefined") return;
  window._learnq = window._learnq || [];
  window._learnq.push(args);
}

export type KlaviyoIdentifyProps = {
  email: string;
  first_name?: string;
  last_name?: string;
};

export function klaviyoIdentify(props: KlaviyoIdentifyProps) {
  push(["identify", { $email: props.email, $first_name: props.first_name, $last_name: props.last_name }]);
}

export function klaviyoTrack(event: string, props: Record<string, unknown>) {
  push(["track", event, props]);
}
