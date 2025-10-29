import { useState } from "react";
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
민지는 웃지 못했어요.

가슴이 조금 아프게 톡 하고 울리는 느낌이 났거든요.`,
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
왜 다들 웃는 거야…?
나… 좀 속상해…"

슬픔,
창피함,
조금의 억울함이
조용히 피어났어요.`,
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
      content: `잠시 뒤, 민지는 용기를 꺼내 들었어요.
마음이 떨렸지만, 차분하게 말했어요.

민지:
"나를 따라하는 건…
나는 속상했어.
장난이어도… 내 마음이 아팠어."

친구는 잠시 멈춰 섰어요.
그리고 표정이 바뀌었어요.

친구:
"아… 그런 줄 몰랐어.
미안해. 다시는 안 그럴게."

두 사람의 사이에
조용히 따뜻한 공기가 돌아왔어요.`,
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

  const scene = STORY_DATA.scenes[currentScene];
  const isLastScene = currentScene === STORY_DATA.scenes.length - 1;

  const handleAnswerSubmit = () => {
    if (userAnswer.trim()) {
      setShowAnswer(true);
    }
  };

  const handleNext = () => {
    if (isLastScene) {
      // 동화 완료
      navigate("/");
    } else {
      setCurrentScene(currentScene + 1);
      setUserAnswer("");
      setShowAnswer(false);
    }
  };

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
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '2rem'
      }}>
        {/* Scene Content */}
        <div style={{
          background: 'white',
          padding: '2.5rem',
          borderRadius: '20px',
          boxShadow: 'var(--shadow-soft)',
          border: '1px solid var(--light-gray)',
          marginBottom: '2rem',
          animation: 'slide-up 0.6s ease-out'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--coral-pink)',
              marginBottom: '0.5rem'
            }}>
              장면 {scene.id} — {scene.title}
            </h2>
          </div>

          {/* Image Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <img
              src={scene.image}
              alt={`장면 ${scene.id}: ${scene.title}`}
              style={{
                width: '400px',
                height: '300px',
                borderRadius: '16px',
                objectFit: 'cover',
                boxShadow: 'var(--shadow-medium)',
                border: '2px solid var(--light-gray)'
              }}
            />
          </div>

          {/* Story Content */}
          <div style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: 'var(--navy-text)',
            whiteSpace: 'pre-line',
            textAlign: 'center',
            marginBottom: '2rem',
            fontWeight: '500'
          }}>
            {scene.content}
          </div>

          {/* Question Section */}
          <div style={{
            background: 'var(--warm-gray)',
            padding: '2rem',
            borderRadius: '16px',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: '700',
              color: 'var(--navy-text)',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              💭 생각해보기
            </h3>
            <p style={{
              fontSize: '1rem',
              color: 'var(--navy-text)',
              marginBottom: '1.5rem',
              textAlign: 'center',
              fontWeight: '600'
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
                    height: '120px',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid var(--light-gray)',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'none',
                    marginBottom: '1rem'
                  }}
                />
                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={handleAnswerSubmit}
                    disabled={!userAnswer.trim()}
                    style={{
                      padding: '0.8rem 2rem',
                      borderRadius: '12px',
                      border: 'none',
                      background: userAnswer.trim() ? 'var(--gradient-mint)' : 'var(--light-gray)',
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: '700',
                      cursor: userAnswer.trim() ? 'pointer' : 'not-allowed',
                      transition: 'all 0.3s'
                    }}
                  >
                    답변 제출하기
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  marginBottom: '1.5rem'
                }}>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: 'var(--coral-pink)',
                    marginBottom: '0.5rem'
                  }}>
                    내 답변:
                  </h4>
                  <p style={{
                    fontSize: '1rem',
                    color: 'var(--navy-text)',
                    lineHeight: '1.6'
                  }}>
                    {userAnswer}
                  </p>
                </div>
                
                <div style={{
                  background: 'rgba(126, 212, 173, 0.1)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid var(--mint-green)'
                }}>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: 'var(--mint-green)',
                    marginBottom: '1rem'
                  }}>
                    ✨ 다른 친구들의 생각들:
                  </h4>
                  {scene.answerExamples.map((example, index) => (
                    <p key={index} style={{
                      fontSize: '0.95rem',
                      color: 'var(--navy-text)',
                      marginBottom: '0.5rem',
                      fontWeight: '500'
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
              <button
                onClick={handleNext}
                style={{
                  padding: '1rem 2rem',
                  borderRadius: '16px',
                  border: 'none',
                  background: isLastScene ? 'var(--gradient-coral)' : 'var(--gradient-sky)',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: 'var(--shadow-medium)'
                }}
              >
                {isLastScene ? '🎉 동화 완료!' : '➡️ 다음 장면'}
              </button>
            </div>
          )}
        </div>

        {/* Final Message (마지막 장면에서만) */}
        {isLastScene && showAnswer && (
          <div style={{
            background: 'white',
            padding: '2.5rem',
            borderRadius: '20px',
            boxShadow: 'var(--shadow-soft)',
            border: '2px solid var(--sunshine-yellow)',
            textAlign: 'center',
            animation: 'slide-up 0.6s ease-out'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌟</div>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              color: 'var(--coral-pink)',
              marginBottom: '1.5rem'
            }}>
              따뜻한 마음의 메시지
            </h3>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: 'var(--navy-text)',
              whiteSpace: 'pre-line',
              fontWeight: '500'
            }}>
              {STORY_DATA.finalMessage}
            </p>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
