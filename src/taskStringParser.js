export default function taskStringParser(string) {
  const reg = /(.*)\[(\S+)\]\((\S+)\)(.*)/;

  const result = string.match(reg);

  if (result === null) {
    return [string];
  }

  const [_, left, url, name, right] = result;
  return [left, [url, name], right];
}
