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
    // Square format for better NFT display
    canvas.width = 800;
    canvas.height = 800;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(0.3, '#581c87');
    gradient.addColorStop(0.7, '#312e81');
    gradient.addColorStop(1, '#0f172a');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add stars
    ctx.fillStyle = '#6366f1';
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 3 + 1;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add mystical orbs
    ctx.fillStyle = 'rgba(139, 92, 246, 0.1)';
    ctx.beginPath();
    ctx.arc(150, 120, 60, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(99, 102, 241, 0.1)';
    ctx.beginPath();
    ctx.arc(canvas.width - 120, 150, 80, 0, Math.PI * 2);
    ctx.fill();

    // Title at the top
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Magic 8 Ball', canvas.width / 2, 80);

    // Decorative line
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 100, 100);
    ctx.lineTo(canvas.width / 2 + 100, 100);
    ctx.stroke();

    // Magic 8 Ball - centered and larger
    const ballCenterX = canvas.width / 2;
    const ballCenterY = 320;
    const ballRadius = 120;

    // Ball shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.arc(ballCenterX + 6, ballCenterY + 6, ballRadius, 0, Math.PI * 2);
    ctx.fill();

    // Ball gradient
    const ballGradient = ctx.createRadialGradient(
      ballCenterX - 40, ballCenterY - 40, 0,
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

    // Ball highlights
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.arc(ballCenterX - 50, ballCenterY - 50, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(ballCenterX - 35, ballCenterY - 35, 12, 0, Math.PI * 2);
    ctx.fill();

    // Answer window
    const windowRadius = 50;
    const windowCenterY = ballCenterY + 20;

    // Window glow
    ctx.fillStyle = 'rgba(99, 102, 241, 0.4)';
    ctx.beginPath();
    ctx.arc(ballCenterX, windowCenterY, windowRadius + 8, 0, Math.PI * 2);
    ctx.fill();

    // Window gradient
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

    // Answer text in window
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const words = answer.split(' ');
    const lines = [];
    let currentLine = '';
    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > windowRadius * 1.4 && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);

    const lineHeight = 16;
    const startY = windowCenterY - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, index) => {
      ctx.fillText(line, ballCenterX, startY + index * lineHeight);
    });

    // Question section below the ball
    const questionStartY = ballCenterY + ballRadius + 60;
    
    ctx.fillStyle = '#e5e7eb';
    ctx.font = 'bold 20px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Question:', canvas.width / 2, questionStartY);

    // Question text
    ctx.font = '16px Inter, sans-serif';
    ctx.fillStyle = '#f3f4f6';
    const questionWords = question.split(' ');
    const questionLines = [];
    let currentQuestionLine = '';
    const maxWidth = canvas.width - 80;
    
    for (const word of questionWords) {
      const testLine = currentQuestionLine + (currentQuestionLine ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentQuestionLine) {
        questionLines.push(currentQuestionLine);
        currentQuestionLine = word;
      } else {
        currentQuestionLine = testLine;
      }
    }
    if (currentQuestionLine) questionLines.push(currentQuestionLine);
    
    questionLines.forEach((line, index) => {
      ctx.fillText(`"${line}"`, canvas.width / 2, questionStartY + 35 + index * 20);
    });

    // Answer section
    const answerStartY = questionStartY + 35 + questionLines.length * 20 + 30;
    
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 20px Inter, sans-serif';
    ctx.fillText('Answer:', canvas.width / 2, answerStartY);

    ctx.font = 'bold 22px Inter, sans-serif';
    ctx.fillStyle = '#ffffff';
    const answerWords = answer.split(' ');
    const answerLines = [];
    let currentAnswerLine = '';
    
    for (const word of answerWords) {
      const testLine = currentAnswerLine + (currentAnswerLine ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentAnswerLine) {
        answerLines.push(currentAnswerLine);
        currentAnswerLine = word;
      } else {
        currentAnswerLine = testLine;
      }
    }
    if (currentAnswerLine) answerLines.push(currentAnswerLine);
    
    answerLines.forEach((line, index) => {
      ctx.fillText(`"${line}"`, canvas.width / 2, answerStartY + 35 + index * 25);
    });

    // Bottom text
    ctx.font = '14px Inter, sans-serif';
    ctx.fillStyle = '#6366f1';
    ctx.fillText('Ask the universe your questions! 🔮', canvas.width / 2, canvas.height - 30);

    return new Promise((resolve) => {
      canvas.toBlob(resolve, 'image/png', 0.95);
    });
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
};