
export const useResultFormatting = () => {
  // Format lab result for better display
  const formatLabResult = (resultText: string) => {
    // Try to identify patterns in the result text
    const lines = resultText.split('\n');
    
    // Attempt to extract test items with values, units, and reference ranges
    const parsedResults = lines.map(line => {
      // Skip empty lines
      if (!line.trim()) return null;
      
      // Try to parse lines with common patterns
      const matches = line.match(/^([\w\s\-\(\)]+):\s*([\d\.<>]+)\s*([\w\/\%\[\]]+)?\s*(?:\(([\w\s\-<>\/\d\.]+)\))?/);
      
      if (matches) {
        return {
          test: matches[1]?.trim() || '',
          value: matches[2]?.trim() || '',
          units: matches[3]?.trim() || '',
          referenceRange: matches[4]?.trim() || ''
        };
      }
      
      // For lines that don't match the pattern
      return { text: line.trim() };
    }).filter(Boolean);
    
    return parsedResults;
  };

  // Determine if a value is abnormal based on reference range
  const isValueAbnormal = (value: string | number, refRange: string) => {
    if (!refRange) return false;
    
    const numValue = typeof value === 'number' ? value : parseFloat(value.replace(/[<>]/g, ''));
    if (isNaN(numValue)) return false;
    
    // Check different reference range formats
    if (refRange.includes('-')) {
      // Range format: "3.5-5.0"
      const [min, max] = refRange.split('-').map(v => parseFloat(v));
      return numValue < min || numValue > max;
    } else if (refRange.includes('<')) {
      // Format: "< 200"
      const max = parseFloat(refRange.replace(/[<\s]/g, ''));
      return numValue >= max;
    } else if (refRange.includes('>')) {
      // Format: "> 60"
      const min = parseFloat(refRange.replace(/[>\s]/g, ''));
      return numValue <= min;
    }
    
    return false;
  };

  return {
    formatLabResult,
    isValueAbnormal
  };
};
