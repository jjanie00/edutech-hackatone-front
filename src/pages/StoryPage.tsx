import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 이미지 import
import scene1Image from "../Gemini_Generated_Image_fbwc1ffbwc1ffbwc.png";
import scene2Image from "../Gemini_Generated_Image_jro21fjro21fjro2.png";
import scene3Image from "./Gemini_Generated_Image_k5po28k5po28k5po.png";

// 동화 데이터
const STORY_DATA = {
  title: "내 마음을 알아줄래?",
  scenario: "친구에게 놀림 받았을 때",
  child: "김민지",
  scenes: [
    {
      id: 1,
      title: "상황",
      content: `쉬는 시간, 복도에서 아이들이 이야기하며 웃고 있었어요.
그때 친구 하나가 갑자기 민지의 말투를 흉내내기 시작했어요.

친구: "야~ 이렇게 말하던데~ 하하하!"

주변 아이들은 깔깔 웃었지만,
민지는 웃지 못했어요.`,
      image: scene1Image,
      question: "민지는 이 순간 어떤 감정을 느꼈을까요?",
      answerExamples: [
        "속상했을 것 같아요.",
        "놀림 받아서 기분이 안 좋았을 것 같아요.",
        "창피하고 화났을 것 같아요."
      ]
    },
    {
      id: 2,
      title: "감정 장면",
      content: `민지는 마음속에 여러 감정이 뒤섞여 올라오는 걸 느꼈어요.

민지 속마음:
"나는 장난친 게 아닌데…
왜 다들 웃는 거야…?"

슬픔과 창피함이 조용히 피어났어요.`,
      image: scene2Image,
      question: "너라면 이런 상황에서 어떤 기분이 들었을 것 같나요?",
      answerExamples: [
        "저도 슬플 것 같아요.",
        "창피했을 것 같아요.",
        "그냥 놀린 게 싫었을 것 같아요."
      ]
    },
    {
      id: 3,
      title: "해결 장면",
      content: `잠시 뒤, 민지는 용기를 내어 말했어요.

민지:
"나를 따라하는 건 속상했어.
내 마음이 아팠어."

친구는 잠시 멈춰 섰어요.

친구:
"아… 미안해. 몰랐어."

두 사람은 다시 웃으며 놀기 시작했어요.`,
      image: scene3Image,
      question: "친구가 왜 '미안해'라고 말했을까요?",
      answerExamples: [
        "민지가 속상한 마음을 말했으니까요.",
        "친구도 그게 상처 준 줄 몰랐던 것 같아요.",
        "상대의 마음을 알게 되니까 미안해졌을 것 같아요."
      ]
    }
  ],
  finalMessage: `너는 정말 소중한 마음을 잘 바라보고 말해준 용기 있는 아이야.
속상한 마음을 이야기하는 건 쉬운 일이 아니에요.
그런데 너는 네 마음을 조용하고 따뜻하게 표현할 수 있었어.
그건 정말 멋진 능력이야.

앞으로도 누군가가 너의 마음을 다치게 했을 때,
너는 오늘처럼 너의 감정을 표현해도 괜찮아.
네 감정은 소중해. 🌙`
};

export default function StoryPage() {
  const navigate = useNavigate();
  const [currentScene, setCurrentScene] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isQuizLoading, setIsQuizLoading] = useState(false);

  const scene = STORY_DATA.scenes[currentScene];
  const isLastScene = currentScene === STORY_DATA.scenes.length - 1;

  const handleAnswerSubmit = () => {
    if (userAnswer.trim()) {
      setShowAnswer(true);
    }
  };

  const handleNext = () => {
    if (isLastScene) {
      // 문제풀기 로딩 시작
      setIsQuizLoading(true);
      setTimeout(() => {
        navigate("/quiz");
      }, 3000);
    } else {
      setCurrentScene(currentScene + 1);
      setUserAnswer("");
      setShowAnswer(false);
      setIsImageLoading(true);
      setImageLoaded(false);
    }
  };

  const handleImageLoad = () => {
    // 3초 후에 이미지 로딩 완료
    setTimeout(() => {
      setIsImageLoading(false);
      setImageLoaded(true);
    }, 3000);
  };

  // 새로운 장면이 시작될 때마다 이미지 로딩 시작
  useEffect(() => {
    setIsImageLoading(true);
    setImageLoaded(false);
    handleImageLoad();
  }, [currentScene]);

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
          maxWidth: '800px', 
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
              📖
            </div>
            <h1 style={{
              fontSize: '1.3rem',
              fontWeight: '800',
              color: 'var(--navy-text)',
              margin: 0
            }}>
              {STORY_DATA.title}
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
            {currentScene + 1} / {STORY_DATA.scenes.length}
          </div>
        </div>
      </div>

      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        padding: '1.5rem'
      }}>
        {/* Scene Content */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '20px',
          boxShadow: 'var(--shadow-soft)',
          border: '1px solid var(--light-gray)',
          marginBottom: '1.5rem',
          animation: 'slide-up 0.6s ease-out'
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
              장면 {scene.id} — {scene.title}
            </h2>
          </div>

          {/* Image Section */}
          <div style={{
            marginBottom: '1.5rem',
            position: 'relative'
          }}>
            {isImageLoading ? (
              <div style={{
                width: '100%',
                height: '350px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, var(--cream-white) 0%, var(--warm-gray) 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid var(--light-gray)',
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
                  gap: '1rem',
                  marginBottom: '1rem'
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
                  fontSize: '2.5rem',
                  marginBottom: '1rem',
                  animation: 'float 3s ease-in-out infinite'
                }}>🎨</div>
                
                <p style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  color: 'var(--coral-pink)',
                  marginBottom: '0.5rem',
                  animation: 'pulse 2s infinite'
                }}>
                  동화 장면을 그리고 있어요~
                </p>
                <p style={{
                  fontSize: '1rem',
                  color: 'var(--soft-text)',
                  fontWeight: '500'
                }}>
                  잠깐만 기다려주세요 ✨
                </p>
              </div>
            ) : (
              <img
                src={scene.image}
                alt={`장면 ${scene.id}: ${scene.title}`}
                style={{
                  width: '100%',
                  height: '350px',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  boxShadow: 'var(--shadow-medium)',
                  border: '2px solid var(--light-gray)',
                  animation: 'fadeIn 0.5s ease-in'
                }}
              />
            )}
          </div>

          {/* Story Content */}
          <div style={{
            background: 'linear-gradient(135deg, var(--warm-gray) 0%, rgba(255, 255, 255, 0.7) 100%)',
            padding: '1.5rem',
            borderRadius: '16px',
            marginBottom: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 2px 8px rgba(0, 0, 0, 0.05)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* 배경 패턴 */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 20% 80%, rgba(255, 182, 193, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(135, 206, 250, 0.1) 0%, transparent 50%)',
              pointerEvents: 'none'
            }}></div>
            
            <div style={{
              position: 'relative',
              zIndex: 1,
              fontSize: '1rem',
              lineHeight: '1.6',
              color: 'var(--navy-text)',
              whiteSpace: 'pre-line',
              textAlign: 'center',
              fontWeight: '500',
              letterSpacing: '0.01em'
            }}>
              {scene.content}
            </div>
          </div>

          {/* Question Section */}
          <div style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '1rem',
            border: '2px solid var(--mint-green)',
            boxShadow: '0 4px 12px rgba(126, 212, 173, 0.15)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '0.8rem'
            }}>
              <span style={{ fontSize: '1.3rem' }}>💭</span>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '700',
                color: 'var(--mint-green)',
                margin: 0
              }}>
                생각해보기
              </h3>
            </div>
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--navy-text)',
              marginBottom: '0.8rem',
              textAlign: 'center',
              fontWeight: '600',
              lineHeight: '1.5'
            }}>
              {scene.question}
            </p>
            
            {!showAnswer ? (
              <div>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="자유롭게 생각을 적어보세요..."
                  style={{
                    width: '100%',
                    height: '60px',
                    padding: '0.6rem',
                    borderRadius: '8px',
                    border: '2px solid var(--light-gray)',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit',
                    resize: 'none',
                    marginBottom: '0.6rem',
                    transition: 'all 0.3s',
                    background: 'var(--warm-gray)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--mint-green)';
                    e.target.style.background = 'white';
                    e.target.style.boxShadow = '0 2px 8px rgba(126, 212, 173, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--light-gray)';
                    e.target.style.background = 'var(--warm-gray)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={handleAnswerSubmit}
                    disabled={!userAnswer.trim()}
                    style={{
                      padding: '0.5rem 1.2rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: userAnswer.trim() ? 'var(--gradient-mint)' : 'var(--light-gray)',
                      color: 'white',
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      cursor: userAnswer.trim() ? 'pointer' : 'not-allowed',
                      transition: 'all 0.3s'
                    }}
                  >
                    💬 답변하기
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{
                  background: 'rgba(255, 107, 157, 0.08)',
                  padding: '0.8rem',
                  borderRadius: '8px',
                  marginBottom: '0.8rem',
                  border: '1px solid rgba(255, 107, 157, 0.2)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ fontSize: '1.2rem' }}>💭</span>
                    <h4 style={{
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      color: 'var(--coral-pink)',
                      margin: 0
                    }}>
                      내 답변
                    </h4>
                  </div>
                  <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--navy-text)',
                    lineHeight: '1.5',
                    margin: 0
                  }}>
                    "{userAnswer}"
                  </p>
                </div>
                
                <div style={{
                  background: 'rgba(126, 212, 173, 0.08)',
                  padding: '0.8rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(126, 212, 173, 0.3)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.8rem'
                  }}>
                    <span style={{ fontSize: '1.2rem' }}>✨</span>
                    <h4 style={{
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      color: 'var(--mint-green)',
                      margin: 0
                    }}>
                      다른 친구들의 생각
                    </h4>
                  </div>
                  {scene.answerExamples.map((example, index) => (
                    <p key={index} style={{
                      fontSize: '0.9rem',
                      color: 'var(--navy-text)',
                      marginBottom: index < scene.answerExamples.length - 1 ? '0.4rem' : '0',
                      fontWeight: '500',
                      padding: '0.3rem 0',
                      borderBottom: index < scene.answerExamples.length - 1 ? '1px solid rgba(126, 212, 173, 0.2)' : 'none'
                    }}>
                      • {example}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Next Button */}
          {showAnswer && (
            <div style={{ textAlign: 'center' }}>
              {isQuizLoading ? (
                <div style={{
                  padding: '1rem 2rem',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, var(--coral-pink) 0%, var(--warm-orange) 100%)',
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
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
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    animation: 'shimmer 2s infinite'
                  }}></div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem'
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'white',
                      animation: 'bounce 1.4s infinite ease-in-out both'
                    }}></div>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'white',
                      animation: 'bounce 1.4s infinite ease-in-out both',
                      animationDelay: '0.16s'
                    }}></div>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'white',
                      animation: 'bounce 1.4s infinite ease-in-out both',
                      animationDelay: '0.32s'
                    }}></div>
                  </div>
                  
                  <div style={{
                    fontSize: '2rem',
                    animation: 'float 3s ease-in-out infinite'
                  }}>🧠</div>
                  
                  <p style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    margin: 0,
                    animation: 'pulse 2s infinite'
                  }}>
                    문제를 준비하고 있어요!
                  </p>
                  <p style={{
                    fontSize: '0.9rem',
                    margin: 0,
                    opacity: 0.9
                  }}>
                    조금만 기다려주세요 ✨
                  </p>
                </div>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={isQuizLoading}
                  style={{
                    padding: '1rem 2rem',
                    borderRadius: '16px',
                    border: 'none',
                    background: isLastScene ? 'var(--gradient-coral)' : 'var(--gradient-sky)',
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    cursor: isQuizLoading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: 'var(--shadow-medium)'
                  }}
                >
                  {isLastScene ? '🧠 문제풀기!' : '➡️ 다음 장면'}
                </button>
              )}
            </div>
          )}
        </div>

      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
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
