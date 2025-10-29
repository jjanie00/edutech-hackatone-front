import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 동화 기반 논리질문들
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "민지가 친구들의 놀림을 받았을 때, 어떤 감정을 느꼈을까요?",
    options: [
      "기쁨 - 친구들이 관심을 가져줘서 좋았어요",
      "속상함 - 자신을 따라하는 것이 마음이 아팠어요", 
      "화남 - 친구들에게 소리치고 싶었어요",
      "무관심 - 별로 신경쓰지 않았어요"
    ],
    correctAnswer: 1,
    explanation: "맞아요! 민지는 친구들이 자신을 따라할 때 속상하고 마음이 아팠어요. 누군가 우리를 놀릴 때는 상처받는 것이 자연스러운 감정이에요."
  },
  {
    id: 2,
    question: "민지가 친구에게 자신의 감정을 말한 이유는 무엇일까요?",
    options: [
      "친구를 혼내주려고",
      "자신의 마음을 알려주려고",
      "더 큰 소리로 말하려고", 
      "선생님께 말하려고"
    ],
    correctAnswer: 1,
    explanation: "정말 잘했어요! 민지는 친구에게 자신의 마음이 어떤지 솔직하게 말했어요. 우리 마음을 상대방에게 표현하는 것은 매우 용기있는 일이에요."
  },
  {
    id: 3,
    question: "친구가 '미안해'라고 말한 이유는 무엇일까요?",
    options: [
      "선생님이 보고 있어서",
      "민지의 마음을 이해했기 때문에",
      "다른 친구들이 시켜서",
      "습관적으로 말해서"
    ],
    correctAnswer: 1,
    explanation: "훌륭해요! 친구는 민지의 마음을 듣고 자신이 상처를 줬다는 것을 깨달았어요. 상대방의 마음을 이해하면 자연스럽게 미안한 마음이 들어요."
  },
  {
    id: 4,
    question: "이 상황에서 가장 좋은 해결방법은 무엇일까요?",
    options: [
      "참고 넘어가기",
      "똑같이 놀려주기",
      "솔직하게 마음 표현하기",
      "친구와 말 안하기"
    ],
    correctAnswer: 2,
    explanation: "정답이에요! 민지처럼 자신의 마음을 솔직하고 차분하게 표현하는 것이 가장 좋은 방법이에요. 서로의 마음을 이해하면 더 좋은 친구가 될 수 있어요."
  }
];

export default function QuizPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const question = QUIZ_QUESTIONS[currentQuestion];
  const isLastQuestion = currentQuestion === QUIZ_QUESTIONS.length - 1;

  // 페이지 로드 시 3초 로딩
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // 퀴즈 완료 - 메인페이지로 이동
      navigate("/");
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ background: 'var(--cream-white)', minHeight: '100vh' }}>
        {/* Header */}
        <div style={{ 
          background: 'white', 
          borderBottom: '1px solid var(--light-gray)',
          boxShadow: 'var(--shadow-soft)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{ 
            maxWidth: '600px', 
            margin: '0 auto', 
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'var(--gradient-coral)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: '800',
                color: 'white'
              }}>
                🧠
              </div>
              <h1 style={{
                fontSize: '1.3rem',
                fontWeight: '800',
                color: 'var(--navy-text)',
                margin: 0
              }}>
                논리 문제 풀기
              </h1>
            </div>
          </div>
        </div>

        <div style={{ 
          maxWidth: '600px', 
          margin: '0 auto', 
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh'
        }}>
          <div style={{
            background: 'white',
            padding: '3rem 2rem',
            borderRadius: '20px',
            boxShadow: 'var(--shadow-soft)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* 반짝이는 효과 */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
              animation: 'shimmer 2s infinite'
            }}></div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--coral-pink)',
                animation: 'bounce 1.4s infinite ease-in-out both'
              }}></div>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--sky-blue)',
                animation: 'bounce 1.4s infinite ease-in-out both',
                animationDelay: '0.16s'
              }}></div>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--mint-green)',
                animation: 'bounce 1.4s infinite ease-in-out both',
                animationDelay: '0.32s'
              }}></div>
            </div>
            
            <div style={{
              fontSize: '4rem',
              marginBottom: '1.5rem',
              animation: 'float 3s ease-in-out infinite'
            }}>🤔</div>
            
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--coral-pink)',
              marginBottom: '1rem',
              animation: 'pulse 2s infinite'
            }}>
              문제를 준비하고 있어요!
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--soft-text)',
              fontWeight: '500'
            }}>
              동화 내용을 바탕으로 한 재미있는 문제들이에요 ✨
            </p>
          </div>
        </div>

        <style>
          {`
            @keyframes shimmer {
              0% { left: -100%; }
              100% { left: 100%; }
            }
            
            @keyframes bounce {
              0%, 80%, 100% { 
                transform: scale(0); 
              }
              40% { 
                transform: scale(1); 
              }
            }
            
            @keyframes float {
              0%, 100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-10px);
              }
            }
            
            @keyframes pulse {
              0%, 100% {
                opacity: 1;
              }
              50% {
                opacity: 0.7;
              }
            }
            
            @keyframes fadeIn {
              from { 
                opacity: 0; 
                transform: scale(0.95); 
              }
              to { 
                opacity: 1; 
                transform: scale(1); 
              }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--cream-white)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ 
        background: 'white', 
        borderBottom: '1px solid var(--light-gray)',
        boxShadow: 'var(--shadow-soft)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ 
          maxWidth: '600px', 
          margin: '0 auto', 
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => navigate("/")}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'var(--warm-gray)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                fontSize: '1.2rem'
              }}
            >
              ←
            </button>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'var(--gradient-coral)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              fontWeight: '800',
              color: 'white'
            }}>
              🧠
            </div>
            <h1 style={{
              fontSize: '1.3rem',
              fontWeight: '800',
              color: 'var(--navy-text)',
              margin: 0
            }}>
              논리 문제 풀기
            </h1>
          </div>
          
          <div style={{
            padding: '0.5rem 1rem',
            background: 'var(--warm-gray)',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: 'var(--navy-text)'
          }}>
            {currentQuestion + 1} / {QUIZ_QUESTIONS.length}
          </div>
        </div>
      </div>

      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        padding: '1.5rem'
      }}>
        {/* Question Content */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '20px',
          boxShadow: 'var(--shadow-soft)',
          border: '1px solid var(--light-gray)',
          marginBottom: '1.5rem',
          animation: 'fadeIn 0.5s ease-in'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              color: 'var(--coral-pink)',
              marginBottom: '0.5rem'
            }}>
              문제 {question.id}
            </h2>
          </div>

          {/* Question */}
          <div style={{
            background: 'linear-gradient(135deg, var(--warm-gray) 0%, rgba(255, 255, 255, 0.7) 100%)',
            padding: '1.5rem',
            borderRadius: '16px',
            marginBottom: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.6',
              color: 'var(--navy-text)',
              fontWeight: '600',
              margin: 0
            }}>
              {question.question}
            </p>
          </div>

          {/* Options */}
          <div style={{ marginBottom: '1.5rem' }}>
            {question.options.map((option, index) => (
              <div
                key={index}
                onClick={() => !showResult && handleAnswerSelect(index)}
                style={{
                  padding: '1rem',
                  marginBottom: '0.8rem',
                  borderRadius: '12px',
                  border: `2px solid ${
                    showResult 
                      ? (index === question.correctAnswer ? 'var(--success-green)' : 
                         index === selectedAnswer ? 'var(--error-red)' : 'var(--light-gray)')
                      : (selectedAnswer === index ? 'var(--sky-blue)' : 'var(--light-gray)')
                  }`,
                  background: showResult 
                    ? (index === question.correctAnswer ? 'rgba(16, 185, 129, 0.1)' : 
                       index === selectedAnswer ? 'rgba(239, 68, 68, 0.1)' : 'white')
                    : (selectedAnswer === index ? 'rgba(74, 144, 226, 0.1)' : 'white'),
                  cursor: showResult ? 'default' : 'pointer',
                  transition: 'all 0.3s',
                  position: 'relative'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem'
                }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: `2px solid ${
                      showResult 
                        ? (index === question.correctAnswer ? 'var(--success-green)' : 
                           index === selectedAnswer ? 'var(--error-red)' : 'var(--light-gray)')
                        : (selectedAnswer === index ? 'var(--sky-blue)' : 'var(--light-gray)')
                    }`,
                    background: selectedAnswer === index ? 
                      (showResult 
                        ? (index === question.correctAnswer ? 'var(--success-green)' : 'var(--error-red)')
                        : 'var(--sky-blue)')
                      : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    color: 'white',
                    fontWeight: '700'
                  }}>
                    {selectedAnswer === index && (showResult ? (index === question.correctAnswer ? '✓' : '✗') : '✓')}
                  </div>
                  <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--navy-text)',
                    margin: 0,
                    fontWeight: '500',
                    lineHeight: '1.4'
                  }}>
                    {option}
                  </p>
                </div>
                
                {showResult && index === question.correctAnswer && (
                  <div style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '1.2rem'
                  }}>
                    ✨
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Result and Explanation */}
          {showResult && (
            <div style={{
              background: 'rgba(126, 212, 173, 0.08)',
              padding: '1.2rem',
              borderRadius: '12px',
              border: '1px solid var(--mint-green)',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.8rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>💡</span>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '700',
                  color: 'var(--mint-green)',
                  margin: 0
                }}>
                  따뜻한 설명
                </h4>
              </div>
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--navy-text)',
                lineHeight: '1.6',
                margin: 0,
                fontWeight: '500'
              }}>
                {question.explanation}
              </p>
            </div>
          )}

          {/* Action Button */}
          <div style={{ textAlign: 'center' }}>
            {!showResult ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                style={{
                  padding: '0.8rem 2rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: selectedAnswer !== null ? 'var(--gradient-sky)' : 'var(--light-gray)',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: selectedAnswer !== null ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s'
                }}
              >
                💭 답변 확인하기
              </button>
            ) : (
              <button
                onClick={handleNext}
                style={{
                  padding: '0.8rem 2rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: isLastQuestion ? 'var(--gradient-coral)' : 'var(--gradient-mint)',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: 'var(--shadow-medium)'
                }}
              >
                {isLastQuestion ? '🎉 완료하기!' : '➡️ 다음 문제'}
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          background: 'white',
          padding: '1rem',
          borderRadius: '12px',
          boxShadow: 'var(--shadow-soft)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem'
          }}>
            <span style={{
              fontSize: '0.9rem',
              fontWeight: '600',
              color: 'var(--navy-text)'
            }}>
              진행상황
            </span>
            <span style={{
              fontSize: '0.8rem',
              color: 'var(--soft-text)'
            }}>
              {Math.round(((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100)}%
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            background: 'var(--light-gray)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%`,
              height: '100%',
              background: 'var(--gradient-sky)',
              borderRadius: '4px',
              transition: 'width 0.5s ease'
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}