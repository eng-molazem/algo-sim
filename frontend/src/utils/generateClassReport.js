import { jsPDF } from 'jspdf';

export function generateClassReport({ totalStudents, averageCompleted, totalAlgorithms, topAlgorithms, assignments, quizzes }) {
  const doc = new jsPDF();
  const marginX = 20;
  let y = 20;

  function line(text, size = 11, gap = 8, bold = false) {
    if (y > 275) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(size);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.text(String(text), marginX, y);
    y += gap;
  }

  line('Class-Wide Progress Report', 16, 12, true);
  doc.setDrawColor(58, 99, 247);
  doc.line(marginX, y - 6, 190, y - 6);

  line('Overview', 13, 9, true);
  line(`Total students: ${totalStudents}`);
  line(`Average algorithms completed per student: ${averageCompleted} / ${totalAlgorithms}`, 11, 10);

  line('Most Completed Algorithms', 13, 9, true);
  if (topAlgorithms.length === 0) {
    line('No completions recorded yet.', 11, 10);
  } else {
    topAlgorithms.forEach((a, i) => {
      line(`${i + 1}. ${a.algorithm} — completed by ${a.completedByCount} student(s)`);
    });
    y += 4;
  }

  line('Assignments', 13, 9, true);
  if (assignments.length === 0) {
    line('No assignments created yet.', 11, 10);
  } else {
    assignments.forEach((a) => {
      const rate = totalStudents ? Math.round((a.submissionCount / totalStudents) * 100) : 0;
      line(`${a.title} (${a.algorithm}): ${a.submissionCount}/${totalStudents} students completed (${rate}%)`);
    });
    y += 4;
  }

  line('Quizzes', 13, 9, true);
  if (quizzes.length === 0) {
    line('No quizzes created yet.', 11, 10);
  } else {
    quizzes.forEach((q) => {
      const avg = q.avgScorePercent === null ? 'N/A' : `${q.avgScorePercent}%`;
      line(`${q.title} (${q.algorithm}): ${q.attemptCount} attempt(s), average score ${avg}`);
    });
  }

  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(150);
  doc.text(`Generated on ${new Date().toLocaleString()}`, marginX, 288);

  doc.save('class_progress_report.pdf');
}
