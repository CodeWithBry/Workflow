function sanitizeBackticks(text: string, threshold: number) {
  const inlineTicks = (text.match(/`[^`]+`/g) || []).length;
  if (inlineTicks > threshold) {
    return text.replace(/`([^`\n]+)`/g, "$1");
  }
  return text;
}

export default sanitizeBackticks;