export default function urlExtractor(string) {
  const reg = /(.*)\[(\S+)\]\((\S+)\)(.*)/;

  const [_, left, url, name, right] = string.match(reg);
  return [left, [url, name], right];
}
