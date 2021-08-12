export default function taskStringParser(string) {
  const reg = /\[(\S+)\]\((\S+)\)/;

  const result = string.split(reg);

  if (result === null) {
    return [string];
  }

  // ToDo refactor
  const ret = [];

  for (let i = 0; i < result.length; i += 1) {
    if (result[i].startsWith('http')) {
      const [url, name] = [result[i], result[i + 1]];
      i += 1;

      ret.push([url, name]);
    } else {
      ret.push(result[i]);
    }
  }

  return ret;
}
