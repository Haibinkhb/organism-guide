export function sleep(timeout: number): Promise<void> {
  return new Promise((reslove) => {
    setTimeout(reslove, timeout);
  });
}

interface obj {
  [key: string]: any;
}

export function formUrlEncoded(x: obj) {
  return Object.keys(x).reduce(
    (p, c) => p + `&${c}=${encodeURIComponent(x[c])}`,
    '',
  );
}
