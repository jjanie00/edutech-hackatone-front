import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

// 가상의 학생 데이터 (실제로는 API에서 가져올 예정)
const STUDENTS = [
  { id: 1, name: "김민지", age: 7, gender: "여자", interests: "공주, 그림 그리기" },
  { id: 2, name: "이준호", age: 9, gender: "남자", interests: "공룡, 로봇" },
  { id: 3, name: "박서연", age: 6, gender: "여자", interests: "동물, 요리" },
  { id: 4, name: "최지우", age: 8, gender: "여자", interests: "책 읽기, 춤" },
  { id: 5, name: "정우진", age: 7, gender: "남자", interests: "축구, 자동차" },
];

const PREDEFINED_SCENARIOS = [
  {
    id: "friendship_conflict",
    title: "친구가 장난감을 뺏어간 상황",
    emoji: "🧸",
    description: "친구와의 갈등 해결 능력을 기르는 동화"
  },
  {
    id: "social_inclusion",
    title: "친구들이 나 빼고 놀고 있는 상황", 
    emoji: "👥",
    description: "사회적 포용과 소통 능력을 배우는 동화"
  },
  {
    id: "making_friends",
    title: "새로운 친구를 사귀고 싶은 상황",
    emoji: "🤝", 
    description: "새로운 관계 형성과 용기를 배우는 동화"
  }
];

type FormValues = {
  studentId: number;
  storyType: "scenario" | "custom";
  // 시나리오 기반
  selectedScenario?: string;
  // 자유 형식
  customTheme?: string;
  learningGoals?: string;
  additionalElements?: string;
  storyLength?: "short" | "medium" | "long";
};

export default function FormPage() {
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // URL 파라미터에서 학생 ID 가져오기
  const studentIdFromUrl = searchParams.get('studentId');
  const preSelectedStudent = studentIdFromUrl 
    ? STUDENTS.find(s => s.id === parseInt(studentIdFromUrl))
    : null;

  useEffect(() => {
    if (preSelectedStudent) {
      setValue('studentId', preSelectedStudent.id);
    }
  }, [preSelectedStudent, setValue]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    const selectedStudent = STUDENTS.find(s => s.id === data.studentId);
    
    // TODO: 제출 데이터로 AI 동화 생성 API 호출 또는 라우팅 연결
    // eslint-disable-next-line no-console
    console.log("Form Submit:", {
      ...data,
      studentInfo: selectedStudent
    });
    
    // 로딩 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert(`${selectedStudent?.name}을 위한 동화 생성이 완료되었습니다!`);
    setIsSubmitting(false);
    
    // 동화 페이지로 이동
    navigate('/story');
  };

  const selectedStudentId = watch("studentId");
  const selectedStoryType = watch("storyType");
  const selectedScenario = watch("selectedScenario");
  
  const selectedStudent = STUDENTS.find(s => s.id === selectedStudentId);

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
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => navigate('/')}
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
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--light-gray)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--warm-gray)';
              }}
            >
              ←
            </button>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'var(--gradient-sunshine)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              fontWeight: '800',
              color: 'white'
            }}>
              📚
            </div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: '800',
              color: 'var(--navy-text)',
              margin: 0,
              letterSpacing: '-0.02em'
            }}>
              StoryMaker
            </h1>
          </div>
          
          {/* 선택된 학생 정보 표시 */}
          {selectedStudent && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.5rem 1rem',
              background: 'var(--warm-gray)',
              borderRadius: '50px',
              border: '1px solid var(--light-gray)'
            }}>
              <span style={{ fontSize: '1.2rem' }}>
                {selectedStudent.gender === "남자" ? "👦" : "👧"}
              </span>
              <span style={{
                fontWeight: '600',
                color: 'var(--navy-text)',
                fontSize: '0.9rem'
              }}>
                {selectedStudent.name} ({selectedStudent.age}세)
              </span>
            </div>
          )}
        </div>
      </div>

      <div style={{ 
        maxWidth: '640px', 
        margin: '0 auto', 
        padding: '2rem',
        animation: 'slide-up 0.6s ease-out'
      }}>
        {/* Page Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '2.5rem',
          animation: 'bounce-in 0.8s ease-out'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            background: 'var(--gradient-sunshine)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem',
            letterSpacing: '-0.03em'
          }}>
            맞춤형 동화 만들기
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--soft-text)',
            fontWeight: '500'
          }}>
            아이의 정보를 입력하면 특별한 동화를 만들어드려요! ✨
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* 학생 선택 */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '20px',
            boxShadow: 'var(--shadow-soft)',
            border: '1px solid var(--light-gray)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
          }}>
            <label style={{
              display: 'block',
              fontSize: '1.1rem',
              fontWeight: '700',
              color: 'var(--navy-text)',
              marginBottom: '1rem'
            }}>
              👨‍🎓 학생 선택
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {STUDENTS.map((student) => (
                <label
                  key={student.id}
                  style={{
                    cursor: 'pointer',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: selectedStudentId === student.id ? '2px solid var(--sunshine-yellow)' : '2px solid var(--light-gray)',
                    background: selectedStudentId === student.id ? 'var(--gradient-sunshine)' : 'var(--warm-gray)',
                    color: selectedStudentId === student.id ? 'white' : 'var(--navy-text)',
                    fontWeight: '600',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    transform: selectedStudentId === student.id ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: selectedStudentId === student.id ? 'var(--shadow-yellow)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedStudentId !== student.id) {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.background = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedStudentId !== student.id) {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.background = 'var(--warm-gray)';
                    }
                  }}
                >
                  <input
                    type="radio"
                    value={student.id}
                    style={{ display: 'none' }}
                    {...register("studentId", { valueAsNumber: true })}
                  />
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                    {student.gender === "남자" ? "👦" : "👧"}
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                    {student.name}
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    {student.age}세 · {student.interests}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* 동화 유형 선택 */}
          {selectedStudent && (
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '20px',
              boxShadow: 'var(--shadow-soft)',
              border: '1px solid var(--light-gray)',
              transition: 'all 0.3s ease',
              animation: 'slide-up 0.4s ease-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
            }}>
              <label style={{
                display: 'block',
                fontSize: '1.1rem',
                fontWeight: '700',
                color: 'var(--navy-text)',
                marginBottom: '1rem'
              }}>
                📚 동화 유형
              </label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {(['scenario', 'custom'] as const).map((type) => (
                  <label
                    key={type}
                    style={{
                      flex: 1,
                      cursor: 'pointer',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: selectedStoryType === type ? '2px solid var(--sky-blue)' : '2px solid var(--light-gray)',
                      background: selectedStoryType === type ? 'var(--gradient-sky)' : 'var(--warm-gray)',
                      color: selectedStoryType === type ? 'white' : 'var(--navy-text)',
                      fontWeight: '700',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      transform: selectedStoryType === type ? 'scale(1.05)' : 'scale(1)',
                      boxShadow: selectedStoryType === type ? 'var(--shadow-blue)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedStoryType !== type) {
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.background = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedStoryType !== type) {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.background = 'var(--warm-gray)';
                      }
                    }}
                  >
                    <input
                      type="radio"
                      value={type}
                      style={{ display: 'none' }}
                      {...register("storyType")}
                    />
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                      {type === 'scenario' ? '🎭' : '🎨'}
                    </div>
                    <div>{type === 'scenario' ? '시나리오 기반' : '자유 주제'}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '0.5rem' }}>
                      {type === 'scenario' ? '정해진 상황에서 학습' : '창의적인 주제로 학습'}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* 시나리오 선택 (시나리오 기반일 때만) */}
          {selectedStoryType === 'scenario' && (
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '20px',
              boxShadow: 'var(--shadow-soft)',
              border: '1px solid var(--light-gray)',
              transition: 'all 0.3s ease',
              animation: 'slide-up 0.4s ease-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
            }}>
              <label style={{
                display: 'block',
                fontSize: '1.1rem',
                fontWeight: '700',
                color: 'var(--navy-text)',
                marginBottom: '1rem'
              }}>
                🎭 학습 시나리오
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {PREDEFINED_SCENARIOS.map((scenario) => (
                  <label key={scenario.id} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: selectedScenario === scenario.id ? '2px solid var(--sunshine-yellow)' : '2px solid var(--light-gray)',
                    background: selectedScenario === scenario.id ? 'var(--gradient-sunshine)' : 'var(--warm-gray)',
                    color: selectedScenario === scenario.id ? 'white' : 'var(--navy-text)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: selectedScenario === scenario.id ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: selectedScenario === scenario.id ? 'var(--shadow-yellow)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedScenario !== scenario.id) {
                      e.currentTarget.style.transform = 'scale(1.01)';
                      e.currentTarget.style.background = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedScenario !== scenario.id) {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.background = 'var(--warm-gray)';
                    }
                  }}>
                    <input 
                      type="radio" 
                      value={scenario.id} 
                      style={{ display: 'none' }}
                      {...register("selectedScenario")} 
                    />
                    <span style={{ fontSize: '2rem', flexShrink: 0 }}>{scenario.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.5rem' }}>
                        {scenario.title}
                      </div>
                      <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                        {scenario.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* 자유 주제 입력 (자유 주제일 때만) */}
          {selectedStoryType === 'custom' && (
            <>
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '20px',
                boxShadow: 'var(--shadow-soft)',
                border: '1px solid var(--light-gray)',
                transition: 'all 0.3s ease',
                animation: 'slide-up 0.4s ease-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
              }}>
                <label style={{
                  display: 'block',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: 'var(--navy-text)',
                  marginBottom: '1rem'
                }}>
                  🎨 동화 주제
                </label>
                <input
                  type="text"
                  placeholder="어떤 주제의 동화를 만들고 싶나요? (예: 우주 여행, 마법의 숲, 바다 탐험)"
                  style={{
                    width: '100%',
                    padding: '1rem 1.5rem',
                    borderRadius: '12px',
                    border: '2px solid var(--light-gray)',
                    fontSize: '1rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    background: 'var(--warm-gray)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--coral-pink)';
                    e.target.style.background = 'white';
                    e.target.style.boxShadow = '0 4px 12px rgba(255, 107, 157, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--light-gray)';
                    e.target.style.background = 'var(--warm-gray)';
                    e.target.style.boxShadow = 'none';
                  }}
                  {...register("customTheme")}
                />
              </div>

              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '20px',
                boxShadow: 'var(--shadow-soft)',
                border: '1px solid var(--light-gray)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
              }}>
                <label style={{
                  display: 'block',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: 'var(--navy-text)',
                  marginBottom: '1rem'
                }}>
                  📖 학습 목표
                </label>
                <input
                  type="text"
                  placeholder="이 동화를 통해 무엇을 배우고 싶나요? (예: 용기, 친구의 소중함, 정직함)"
                  style={{
                    width: '100%',
                    padding: '1rem 1.5rem',
                    borderRadius: '12px',
                    border: '2px solid var(--light-gray)',
                    fontSize: '1rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    background: 'var(--warm-gray)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--purple-accent)';
                    e.target.style.background = 'white';
                    e.target.style.boxShadow = '0 4px 12px rgba(155, 89, 182, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--light-gray)';
                    e.target.style.background = 'var(--warm-gray)';
                    e.target.style.boxShadow = 'none';
                  }}
                  {...register("learningGoals")}
                />
              </div>

              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '20px',
                boxShadow: 'var(--shadow-soft)',
                border: '1px solid var(--light-gray)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
              }}>
                <label style={{
                  display: 'block',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: 'var(--navy-text)',
                  marginBottom: '1rem'
                }}>
                  ✨ 추가 요소 (선택사항)
                </label>
                <input
                  type="text"
                  placeholder="동화에 포함하고 싶은 특별한 요소가 있나요? (예: 특정 캐릭터, 배경, 상황)"
                  style={{
                    width: '100%',
                    padding: '1rem 1.5rem',
                    borderRadius: '12px',
                    border: '2px solid var(--light-gray)',
                    fontSize: '1rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    background: 'var(--warm-gray)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--mint-green)';
                    e.target.style.background = 'white';
                    e.target.style.boxShadow = '0 4px 12px rgba(126, 212, 173, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--light-gray)';
                    e.target.style.background = 'var(--warm-gray)';
                    e.target.style.boxShadow = 'none';
                  }}
                  {...register("additionalElements")}
                />
              </div>
            </>
          )}

          {/* 동화 길이 선택 */}
          {(selectedStoryType === 'scenario' || selectedStoryType === 'custom') && (
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '20px',
              boxShadow: 'var(--shadow-soft)',
              border: '1px solid var(--light-gray)',
              transition: 'all 0.3s ease',
              animation: 'slide-up 0.4s ease-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
            }}>
              <label style={{
                display: 'block',
                fontSize: '1.1rem',
                fontWeight: '700',
                color: 'var(--navy-text)',
                marginBottom: '1rem'
              }}>
                📏 동화 길이
              </label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {(['short', 'medium', 'long'] as const).map((length) => {
                  const lengthInfo = {
                    short: { emoji: '⚡', label: '짧게', desc: '5분 내외' },
                    medium: { emoji: '⭐', label: '보통', desc: '10분 내외' },
                    long: { emoji: '📚', label: '길게', desc: '15분 내외' }
                  };
                  const selectedLength = watch("storyLength");
                  
                  return (
                    <label
                      key={length}
                      style={{
                        flex: 1,
                        cursor: 'pointer',
                        padding: '1rem',
                        borderRadius: '12px',
                        border: selectedLength === length ? '2px solid var(--mint-green)' : '2px solid var(--light-gray)',
                        background: selectedLength === length ? 'var(--gradient-mint)' : 'var(--warm-gray)',
                        color: selectedLength === length ? 'white' : 'var(--navy-text)',
                        fontWeight: '700',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        transform: selectedLength === length ? 'scale(1.05)' : 'scale(1)',
                        boxShadow: selectedLength === length ? '0 4px 12px rgba(126, 212, 173, 0.3)' : 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedLength !== length) {
                          e.currentTarget.style.transform = 'scale(1.02)';
                          e.currentTarget.style.background = 'white';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedLength !== length) {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.background = 'var(--warm-gray)';
                        }
                      }}
                    >
                      <input
                        type="radio"
                        value={length}
                        style={{ display: 'none' }}
                        {...register("storyLength")}
                      />
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                        {lengthInfo[length].emoji}
                      </div>
                      <div>{lengthInfo[length].label}</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '0.25rem' }}>
                        {lengthInfo[length].desc}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* 제출 버튼 */}
          <div style={{ paddingTop: '1rem' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '1.5rem',
                borderRadius: '16px',
                border: 'none',
                background: isSubmitting 
                  ? 'var(--soft-text)' 
                  : 'var(--gradient-sunshine)',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: '800',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isSubmitting ? 'none' : 'var(--shadow-yellow)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-strong)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-yellow)';
                }
              }}
            >
              {isSubmitting ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <span style={{ 
                    width: '20px', 
                    height: '20px', 
                    border: '2px solid white',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></span>
                  동화 생성 중...
                </span>
              ) : (
                <span>✨ 동화 만들기 ✨</span>
              )}
            </button>
          </div>
        </form>
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
