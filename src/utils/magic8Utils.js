import { ANSWERS } from './constants';

export const getRandomAnswer = () => {
  const index = Math.floor(Math.random() * ANSWERS.length);
  return ANSWERS[index];
};

export const createCastTextOptions = (question, answer) => [
  `🔮 The mystical forces have spoken! I asked, "${question}" and got "${answer}" ✨\n\nWhat question would you ask the Magic 8 Ball? 🎱`,
  `✨ Just consulted the digital oracle! My question: "${question}"\n🎱 The answer: "${answer}"\n\nTry your luck with the Magic 8 Ball! 🔮`,
  `🌟 The cosmic energies revealed: "${answer}" when I asked "${question}"\n\nWhat wisdom would you seek? Ask the Magic 8 Ball! 🎱✨`,
  `🎱 Magic 8 Ball wisdom of the day!\n\nQ: "${question}"\nA: "${answer}"\n\nThe universe has spoken! What's your question? 🔮`,
  `🔮 Seeking guidance from the digital oracle...\n\n"${question}" → "${answer}"\n\nYour turn to unlock the mysteries! 🎱✨`
];

export const generateResultImage = async (ref, answer, question) => {
  if (!ref.current) return null;

  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1200;
    canvas.height = 630;

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(0.3, '#581c87');
    gradient.addColorStop(0.7, '#312e81');
    gradient.addColorStop(1, '#0f172a');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#6366f1';
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 3 + 1;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(139, 92, 246, 0.1)';
    ctx.beginPath();
    ctx.arc(200, 150, 80, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(99, 102, 241, 0.1)';
    ctx.beginPath();
    ctx.arc(canvas.width - 150, canvas.height - 120, 100, 0, Math.PI * 2);
    ctx.fill();

    const ballCenterX = 300;
    const ballCenterY = canvas.height / 2;
    const ballRadius = 140;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.arc(ballCenterX + 8, ballCenterY + 8, ballRadius, 0, Math.PI * 2);
    ctx.fill();

    const ballGradient = ctx.createRadialGradient(
      ballCenterX - 50, ballCenterY - 50, 0,
      ballCenterX, ballCenterY, ballRadius
    );
    ballGradient.addColorStop(0, '#4b5563');
    ballGradient.addColorStop(0.3, '#374151');
    ballGradient.addColorStop(0.8, '#111827');
    ballGradient.addColorStop(1, '#000000');

    ctx.fillStyle = ballGradient;
    ctx.beginPath();
    ctx.arc(ballCenterX, ballCenterY, ballRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.arc(ballCenterX - 60, ballCenterY - 60, 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(ballCenterX - 40, ballCenterY - 40, 15, 0, Math.PI * 2);
    ctx.fill();

    const windowRadius = 55;
    const windowCenterY = ballCenterY + 25;

    ctx.fillStyle = 'rgba(99, 102, 241, 0.4)';
    ctx.beginPath();
    ctx.arc(ballCenterX, windowCenterY, windowRadius + 10, 0, Math.PI * 2);
    ctx.fill();

    const windowGradient = ctx.createRadialGradient(
      ballCenterX, windowCenterY, 0,
      ballCenterX, windowCenterY, windowRadius
    );
    windowGradient.addColorStop(0, '#4338ca');
    windowGradient.addColorStop(0.6, '#3730a3');
    windowGradient.addColorStop(1, '#1e1b4b');

    ctx.fillStyle = windowGradient;
    ctx.beginPath();
    ctx.arc(ballCenterX, windowCenterY, windowRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const words = answer.split(' ');
    const lines = [];
    let currentLine = '';
    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > windowRadius * 1.6 && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);

    const lineHeight = 18;
    const startY = windowCenterY - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, index) => {
      ctx.fillText(line, ballCenterX, startY + index * lineHeight);
    });

    const contentStartX = ballCenterX + ballRadius + 60;
    const contentWidth = canvas.width - contentStartX - 60;

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('✨ Magic 8 Ball', contentStartX, 120);

    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(contentStartX, 150);
    ctx.lineTo(contentStartX + 200, 150);
    ctx.stroke();

    ctx.fillStyle = '#e5e7eb';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.fillText('Question:', contentStartX, 220);

    ctx.font = '20px Inter, sans-serif';
    ctx.fillStyle = '#f3f4f6';
    const questionWords = question.split(' ');
    const questionLines = [];
    let currentQuestionLine = '';
    for (const word of questionWords) {
      const testLine = currentQuestionLine + (currentQuestionLine ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > contentWidth - 20 && currentQuestionLine) {
        questionLines.push(currentQuestionLine);
        currentQuestionLine = word;
      } else {
        currentQuestionLine = testLine;
      }
    }
    if (currentQuestionLine) questionLines.push(currentQuestionLine);
    questionLines.forEach((line, index) => {
      ctx.fillText(`"${line}"`, contentStartX, 260 + index * 25);
    });

    const answerStartY = 260 + questionLines.length * 25 + 40;
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.fillText('Answer:', contentStartX, answerStartY);

    ctx.font = 'bold 28px Inter, sans-serif';
    ctx.fillStyle = '#ffffff';
    const answerWords = answer.split(' ');
    const answerLines = [];
    let currentAnswerLine = '';
    for (const word of answerWords) {
      const testLine = currentAnswerLine + (currentAnswerLine ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > contentWidth - 20 && currentAnswerLine) {
        answerLines.push(currentAnswerLine);
        currentAnswerLine = word;
      } else {
        currentAnswerLine = testLine;
      }
    }
    if (currentAnswerLine) answerLines.push(currentAnswerLine);
    answerLines.forEach((line, index) => {
      ctx.fillText(`"${line}"`, contentStartX, answerStartY + 40 + index * 32);
    });

    ctx.font = '40px Inter, sans-serif';
    ctx.fillStyle = '#a855f7';
    ctx.textAlign = 'center';

    ctx.fillStyle = '#6366f1';
    ctx.font = '16px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Ask the universe your questions! 🔮', canvas.width / 2, canvas.height - 30);

    return new Promise((resolve) => {
      canvas.toBlob(resolve, 'image/png', 0.95);
    });
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
};
