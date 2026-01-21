import { useEffect, useState, useRef } from 'react';

export default function ScoreDonut({ score = 80, animated = true }) {
  // For 40px circle with 2.5px stroke: center at 20, radius = 20 - 2.5/2 = 18.75
  const radius = 18.75;
  const circumference = 2 * Math.PI * radius;
  const [animatedScore, setAnimatedScore] = useState(animated ? 0 : score);
  const animationRef = useRef(null);
  
  // Calculate stroke-dashoffset: when score is 0, offset = full circumference (hidden)
  // when score is 100, offset = 0 (fully visible)
  const strokeDashoffset = circumference * (1 - animatedScore / 100);

  useEffect(() => {
    if (animated) {
      // Animate from 0 to target score using requestAnimationFrame (matching standalone)
      let currentProgress = 0;
      
      const animate = () => {
        if (currentProgress < score) {
          currentProgress += 2; // Increment by 2 (matching standalone)
          const newScore = Math.min(currentProgress, score);
          setAnimatedScore(Math.floor(newScore));
          
          if (currentProgress < score) {
            animationRef.current = requestAnimationFrame(animate);
          }
        }
      };
      
      // Start animation after a brief delay (matching standalone)
      const timeoutId = setTimeout(() => {
        animationRef.current = requestAnimationFrame(animate);
      }, 100);
      
      return () => {
        clearTimeout(timeoutId);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    } else {
      setAnimatedScore(score);
    }
  }, [score, animated]);

  return (
    <div className="result-score-circle">
      <svg 
        viewBox="0 0 40 40" 
        width="40" 
        height="40"
        style={{ 
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <circle
          className="donut-ring-bg"
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke="#E0E0E0"
          strokeWidth={2.5}
          style={{ display: 'block' }}
        />
        <circle
          className="donut-ring-progress"
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke="#4F46E5"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 20 20)"
        />
      </svg>
      <span className="result-score-value">{animatedScore}</span>
    </div>
  );
}
