import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportToPDF(text: string, fileName = 'resume.pdf') {
  // Create a hidden div to hold the text
  const element = document.createElement('div');
  element.style.padding = '40px';
  element.style.fontFamily = 'Arial';
  element.style.fontSize = '14px';
  element.style.color = '#000';
  element.style.backgroundColor = '#fff';
  element.style.lineHeight = '1.4';
  element.style.whiteSpace = 'pre-wrap';
  element.innerText = text;
  document.body.appendChild(element);

  // Capture & generate PDF
  const canvas = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF();
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(fileName);

  document.body.removeChild(element);
}