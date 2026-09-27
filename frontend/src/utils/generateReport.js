import { jsPDF } from 'jspdf';

export function generatePerformanceReport({
  algorithmName,
  categoryName,
  complexity,
  totalSteps,
  comparisons,
  elapsedMs,
  inputSummary,
}) {
  const doc = new jsPDF();
  const marginX = 20;
  let y = 20;

  function line(text, size = 11, gap = 8, bold = false) {
    doc.setFontSize(size);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.text(String(text), marginX, y);
    y += gap;
  }

  line('Algorithm Simulation Performance Report', 16, 12, true);
  doc.setDrawColor(58, 99, 247);
  doc.line(marginX, y - 6, 190, y - 6);

  line(`Category: ${categoryName}`, 12, 8, true);
  line(`Algorithm: ${algorithmName}`, 12, 10, true);

  line('Complexity Analysis', 12, 8, true);
  line(`Best case: ${complexity.best}`);
  line(`Average case: ${complexity.average}`);
  line(`Worst case: ${complexity.worst}`);
  line(`Space complexity: ${complexity.space}`, 11, 10);

  line('Execution Summary', 12, 8, true);
  line(`Total simulation steps: ${totalSteps}`);
  line(`Comparison operations: ${comparisons}`);
  line(`Generation time: ${elapsedMs} ms`, 11, 10);

  line('Input Data', 12, 8, true);
  const wrapped = doc.splitTextToSize(inputSummary, 170);
  doc.setFontSize(10);
  doc.setFont('courier', 'normal');
  doc.text(wrapped, marginX, y);
  y += wrapped.length * 6 + 10;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(150);
  doc.text(`Generated on ${new Date().toLocaleString()}`, marginX, 280);

  doc.save(`${algorithmName.replace(/\s+/g, '_')}_report.pdf`);
}
