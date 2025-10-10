export function parseCvMarkdown(markdown: string) {
  const lines = markdown.split("\n").map((l) => l.trim()).filter(Boolean);

  const scoreMatch = markdown.match(/Skor Keseluruhan:\s*(\d+)\s*\/\s*(\d+)/);
  const score = scoreMatch ? Number(scoreMatch[1]) : 0;

  const sections: Record<string, number> = {};
  const sectionRegex = /\*\*(.*?)\*\*\s*`.*?`\s*(\d+)\/100/;

  lines.forEach((line) => {
    const match = line.match(sectionRegex);
    if (match) {
      sections[match[1]] = Number(match[2]);
    }
  });

  const goodPoints: string[] = [];
  const badPoints: string[] = [];
  let collectingGood = false;
  let collectingBad = false;

  for (const line of lines) {
    if (line.startsWith("**✅")) {
      collectingGood = true;
      collectingBad = false;
      continue;
    }
    if (line.startsWith("**💡")) {
      collectingGood = false;
      collectingBad = true;
      continue;
    }
    if (line.startsWith("-")) {
      if (collectingGood) goodPoints.push(line.replace(/^- /, ""));
      if (collectingBad) badPoints.push(line.replace(/^- /, ""));
    }
  }

  return { score, sections, goodPoints, badPoints };
}
