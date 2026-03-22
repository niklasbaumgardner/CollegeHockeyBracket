const REPLACEMENTS = [
  ["Mich.", "Michigan"],
  ["St.", "State"],
  ["U.", "University"],
  ["UConn", "Connecticut"],
  ["Minn. Duluth", "Minnesota-Duluth"],
];

export function getCHNName(teamName) {
  for (let [value, replacement] of REPLACEMENTS) {
    if (teamName.endsWith(value)) {
      return teamName.replace(value, replacement);
    }
  }
  return teamName;
}
