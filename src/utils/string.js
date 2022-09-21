export function convertParamsToURLString(url, params) {
  if (Object.keys(params).length === 0) return url;

  const parameters = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) parameters.set(key, value);
  });

  return `${url}?${parameters.toString()}`;
}