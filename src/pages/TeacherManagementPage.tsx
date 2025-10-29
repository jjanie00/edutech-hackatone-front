import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 학생 데이터 (진도 및 상태 포함)
const STUDENTS_DATA = [
  {
    id: 1,
    name: "김민지",
    age: 7,
    gender: "여자",
    avatar: "👧",
    interests: "공주, 그림 그리기",
    parentName: "김○○ 어머니",
    parentPhone: "010-1234-5678",
    enrollDate: "2024-03-15",
    totalSessions: 12,
    completedSessions: 8,
    currentLevel: 5,
    progress: {
      emotionalRegulation: 75,
      socialSkills: 60,
      problemSolving: 80,
      confidence: 70
    },
    recentActivities: [
      { date: "2024-10-25", activity: "친구와의 갈등 해결하기", score: 85, notes: "적극적으로 참여함" },
      { date: "2024-10-22", activity: "용기를 배우는 모험", score: 90, notes: "창의적인 해결책 제시" },
      { date: "2024-10-18", activity: "감정 표현하기", score: 75, notes: "조금 더 연습 필요" }
    ],
    assignedScenarios: [
      { id: 1, title: "친구가 장난감을 뺏어간 상황", status: "completed", assignDate: "2024-10-20" },
      { id: 2, title: "새로운 친구 사귀기", status: "in-progress", assignDate: "2024-10-25" }
    ],
    parentComments: [
      { date: "2024-10-26", message: "집에서도 친구들과 더 잘 어울리는 것 같아요. 감사합니다!", isRead: true },
      { date: "2024-10-20", message: "다음 주 일정 변경 가능한지 문의드립니다.", isRead: true }
    ]
  },
  {
    id: 2,
    name: "이준호",
    age: 9,
    gender: "남자",
    avatar: "👦",
    interests: "공룡, 로봇",
    parentName: "이○○ 아버지",
    parentPhone: "010-9876-5432",
    enrollDate: "2024-02-20",
    totalSessions: 15,
    completedSessions: 12,
    currentLevel: 7,
    progress: {
      emotionalRegulation: 85,
      socialSkills: 70,
      problemSolving: 90,
      confidence: 80
    },
    recentActivities: [
      { date: "2024-10-26", activity: "리더십 발휘하기", score: 95, notes: "훌륭한 리더십 보여줌" },
      { date: "2024-10-23", activity: "팀워크 게임", score: 80, notes: "협동 능력 향상됨" }
    ],
    assignedScenarios: [
      { id: 3, title: "친구들과 협력하기", status: "completed", assignDate: "2024-10-15" }
    ],
    parentComments: [
      { date: "2024-10-27", message: "준호가 요즘 형이 되었다며 동생을 많이 도와주네요!", isRead: false }
    ]
  },
  {
    id: 3,
    name: "박서연",
    age: 6,
    gender: "여자",
    avatar: "👧",
    interests: "동물, 요리",
    parentName: "박○○ 어머니",
    parentPhone: "010-5555-7777",
    enrollDate: "2024-04-01",
    totalSessions: 8,
    completedSessions: 5,
    currentLevel: 3,
    progress: {
      emotionalRegulation: 60,
      socialSkills: 65,
      problemSolving: 55,
      confidence: 50
    },
    recentActivities: [
      { date: "2024-10-24", activity: "감정 인식하기", score: 70, notes: "꾸준한 향상 보임" }
    ],
    assignedScenarios: [
      { id: 4, title: "처음 만나는 친구와 인사하기", status: "in-progress", assignDate: "2024-10-24" }
    ],
    parentComments: [
      { date: "2024-10-25", message: "서연이가 집에서 동생과 더 잘 놀아주고 있어요.", isRead: false }
    ]
  }
];

// 시나리오 템플릿
const SCENARIO_TEMPLATES = [
  {
    id: "friendship_conflict",
    title: "친구가 장난감을 뺏어간 상황",
    category: "갈등해결",
    description: "친구와의 갈등을 평화롭게 해결하는 방법을 배웁니다",
    targetSkills: ["감정조절", "의사소통", "문제해결"],
    difficulty: "초급",
    ageRange: "5-8세"
  },
  {
    id: "new_friend",
    title: "새로운 친구 사귀기",
    category: "사회성",
    description: "새로운 환경에서 친구를 사귀는 용기와 방법을 익힙니다",
    targetSkills: ["자신감", "사회성", "의사소통"],
    difficulty: "중급",
    ageRange: "6-10세"
  },
  {
    id: "sharing",
    title: "나누어 쓰기",
    category: "협력",
    description: "다른 사람과 물건을 나누어 쓰는 즐거움을 배웁니다",
    targetSkills: ["공감능력", "협력", "배려"],
    difficulty: "초급",
    ageRange: "4-7세"
  },
  {
    id: "leadership",
    title: "친구들을 이끌어주기",
    category: "리더십",
    description: "친구들과 함께 활동할 때 리더 역할을 수행합니다",
    targetSkills: ["리더십", "책임감", "의사소통"],
    difficulty: "고급",
    ageRange: "8-12세"
  },
  {
    id: "emotion_regulation",
    title: "화가 날 때 마음 다스리기",
    category: "감정조절",
    description: "화가 날 때 건강한 방법으로 감정을 조절하는 법을 배웁니다",
    targetSkills: ["감정조절", "자기조절", "스트레스관리"],
    difficulty: "중급",
    ageRange: "6-10세"
  }
];

export default function TeacherManagementPage() {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState<typeof STUDENTS_DATA[0] | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'scenarios' | 'communication'>('overview');
  const [showScenarioModal, setShowScenarioModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState<any>(null);

  const handleAssignScenario = (scenarioId: string) => {
    if (selectedStudent) {
      alert(`"${SCENARIO_TEMPLATES.find(s => s.id === scenarioId)?.title}" 시나리오를 ${selectedStudent.name}에게 배정했습니다!`);
      setShowScenarioModal(false);
    }
  };

  const handleSendReply = () => {
    if (replyMessage.trim() && selectedComment) {
      alert(`"${replyMessage}" 답장을 ${selectedStudent?.parentName}에게 전송했습니다!`);
      setReplyMessage('');
      setShowReplyModal(false);
      setSelectedComment(null);
    }
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'var(--success-green)';
    if (score >= 60) return 'var(--sunshine-yellow)';
    return 'var(--coral-pink)';
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
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
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
            >
              ←
            </button>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'var(--gradient-sky)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              color: 'white'
            }}>
              👩‍🏫
            </div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: '800',
              color: 'var(--navy-text)',
              margin: 0
            }}>
              학생 관리 센터
            </h1>
          </div>
          
          <div style={{
            padding: '0.5rem 1rem',
            background: 'var(--warm-gray)',
            borderRadius: '20px',
            fontWeight: '600',
            color: 'var(--navy-text)'
          }}>
            김선생님
          </div>
        </div>
      </div>

      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '2rem',
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '2rem'
      }}>
        {/* 학생 목록 사이드바 */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          border: '1px solid var(--light-gray)',
          boxShadow: 'var(--shadow-soft)',
          padding: '1.5rem',
          height: 'fit-content'
        }}>
          <h2 style={{
            fontSize: '1.2rem',
            fontWeight: '700',
            color: 'var(--navy-text)',
            marginBottom: '1rem'
          }}>
            담당 학생 ({STUDENTS_DATA.length}명)
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {STUDENTS_DATA.map((student) => (
              <div
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  border: selectedStudent?.id === student.id ? '2px solid var(--sky-blue)' : '1px solid var(--light-gray)',
                  background: selectedStudent?.id === student.id ? 'rgba(74,144,226,0.05)' : 'var(--warm-gray)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{student.avatar}</span>
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--navy-text)' }}>
                      {student.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--soft-text)' }}>
                      {student.age}세 · 레벨 {student.currentLevel}
                    </div>
                  </div>
                </div>
                
                {/* 읽지 않은 메시지 표시 */}
                {student.parentComments.some(c => !c.isRead) && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.8rem',
                    color: 'var(--coral-pink)',
                    fontWeight: '600'
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--coral-pink)' }}></span>
                    새 메시지
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        {selectedStudent ? (
          <div>
            {/* 학생 정보 헤더 */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              border: '1px solid var(--light-gray)',
              boxShadow: 'var(--shadow-soft)',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: selectedStudent.gender === '남자' ? 'var(--gradient-sky)' : 'var(--gradient-coral)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem'
                  }}>
                    {selectedStudent.avatar}
                  </div>
                  <div>
                    <h1 style={{
                      fontSize: '2rem',
                      fontWeight: '800',
                      color: 'var(--navy-text)',
                      marginBottom: '0.5rem'
                    }}>
                      {selectedStudent.name}
                    </h1>
                    <div style={{ fontSize: '1rem', color: 'var(--soft-text)', marginBottom: '0.5rem' }}>
                      {selectedStudent.age}세 · {selectedStudent.interests}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--soft-text)' }}>
                      등록일: {selectedStudent.enrollDate} · 총 {selectedStudent.totalSessions}회 중 {selectedStudent.completedSessions}회 완료
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => setShowScenarioModal(true)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '12px',
                      background: 'var(--gradient-sunshine)',
                      color: 'white',
                      border: 'none',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    🎯 시나리오 배정
                  </button>
                  <button
                    onClick={() => navigate(`/create-story?studentId=${selectedStudent.id}`)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '12px',
                      background: 'white',
                      color: 'var(--sky-blue)',
                      border: '2px solid var(--sky-blue)',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    📚 동화 만들기
                  </button>
                </div>
              </div>
            </div>

            {/* 탭 네비게이션 */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              border: '1px solid var(--light-gray)',
              boxShadow: 'var(--shadow-soft)',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', borderBottom: '1px solid var(--light-gray)' }}>
                {[
                  { id: 'overview', label: '📊 개요', icon: '📊' },
                  { id: 'progress', label: '📈 진도', icon: '📈' },
                  { id: 'scenarios', label: '🎭 시나리오', icon: '🎭' },
                  { id: 'communication', label: '💬 소통', icon: '💬' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      border: 'none',
                      background: activeTab === tab.id ? 'var(--sky-blue)' : 'transparent',
                      color: activeTab === tab.id ? 'white' : 'var(--soft-text)',
                      fontWeight: '600',
                      cursor: 'pointer',
                      borderRadius: activeTab === tab.id ? '12px 12px 0 0' : '0',
                      transition: 'all 0.2s'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* 탭 콘텐츠 */}
              <div style={{ padding: '2rem' }}>
                {activeTab === 'overview' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    {/* 최근 활동 */}
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--navy-text)' }}>
                        최근 활동
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {selectedStudent.recentActivities.map((activity, index) => (
                          <div key={index} style={{
                            padding: '1rem',
                            background: 'var(--warm-gray)',
                            borderRadius: '12px',
                            border: '1px solid var(--light-gray)'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <span style={{ fontWeight: '600', color: 'var(--navy-text)' }}>
                                {activity.activity}
                              </span>
                              <span style={{
                                padding: '0.25rem 0.75rem',
                                borderRadius: '12px',
                                background: getProgressColor(activity.score),
                                color: 'white',
                                fontSize: '0.8rem',
                                fontWeight: '700'
                              }}>
                                {activity.score}점
                              </span>
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--soft-text)', marginBottom: '0.5rem' }}>
                              {activity.date}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--navy-text)' }}>
                              {activity.notes}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 진행률 요약 */}
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--navy-text)' }}>
                        영역별 진행률
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {Object.entries(selectedStudent.progress).map(([key, value]) => {
                          const labels: Record<string, string> = {
                            emotionalRegulation: '감정조절',
                            socialSkills: '사회성',
                            problemSolving: '문제해결',
                            confidence: '자신감'
                          };
                          
                          return (
                            <div key={key}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: '600', color: 'var(--navy-text)' }}>
                                  {labels[key]}
                                </span>
                                <span style={{ color: 'var(--soft-text)' }}>{value}%</span>
                              </div>
                              <div style={{
                                width: '100%',
                                height: '8px',
                                background: 'var(--light-gray)',
                                borderRadius: '4px',
                                overflow: 'hidden'
                              }}>
                                <div style={{
                                  width: `${value}%`,
                                  height: '100%',
                                  background: getProgressColor(value),
                                  borderRadius: '4px',
                                  transition: 'width 0.5s ease'
                                }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'communication' && (
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--navy-text)' }}>
                      학부모 소통
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {selectedStudent.parentComments.map((comment, index) => (
                        <div key={index} style={{
                          padding: '1.5rem',
                          background: comment.isRead ? 'var(--warm-gray)' : 'rgba(255,217,61,0.1)',
                          borderRadius: '12px',
                          border: comment.isRead ? '1px solid var(--light-gray)' : '2px solid var(--sunshine-yellow)'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div>
                              <div style={{ fontWeight: '700', color: 'var(--navy-text)', marginBottom: '0.25rem' }}>
                                {selectedStudent.parentName}
                              </div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--soft-text)' }}>
                                {comment.date}
                              </div>
                            </div>
                            {!comment.isRead && (
                              <span style={{
                                padding: '0.25rem 0.5rem',
                                borderRadius: '12px',
                                background: 'var(--coral-pink)',
                                color: 'white',
                                fontSize: '0.7rem',
                                fontWeight: '700'
                              }}>
                                NEW
                              </span>
                            )}
                          </div>
                          <div style={{
                            padding: '1rem',
                            background: 'white',
                            borderRadius: '8px',
                            marginBottom: '1rem',
                            fontSize: '0.95rem',
                            lineHeight: 1.5
                          }}>
                            {comment.message}
                          </div>
                          <button
                            onClick={() => {
                              setSelectedComment(comment);
                              setShowReplyModal(true);
                            }}
                            style={{
                              padding: '0.5rem 1rem',
                              borderRadius: '8px',
                              background: 'var(--sky-blue)',
                              color: 'white',
                              border: 'none',
                              fontSize: '0.8rem',
                              fontWeight: '600',
                              cursor: 'pointer'
                            }}
                          >
                            💬 답장하기
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'scenarios' && (
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--navy-text)' }}>
                      배정된 시나리오
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {selectedStudent.assignedScenarios.map((scenario) => {
                        const template = SCENARIO_TEMPLATES.find(t => t.id === scenario.title.toLowerCase().replace(/\s+/g, '_'));
                        return (
                          <div key={scenario.id} style={{
                            padding: '1.5rem',
                            background: 'var(--warm-gray)',
                            borderRadius: '12px',
                            border: '1px solid var(--light-gray)'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <div>
                                <h4 style={{ fontWeight: '700', color: 'var(--navy-text)', marginBottom: '0.5rem' }}>
                                  {scenario.title}
                                </h4>
                                <div style={{ fontSize: '0.8rem', color: 'var(--soft-text)' }}>
                                  배정일: {scenario.assignDate}
                                </div>
                              </div>
                              <span style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                background: scenario.status === 'completed' ? 'var(--success-green)' : 'var(--sunshine-yellow)',
                                color: 'white',
                                fontSize: '0.8rem',
                                fontWeight: '700'
                              }}>
                                {scenario.status === 'completed' ? '✅ 완료' : '🔄 진행중'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '400px',
            color: 'var(--soft-text)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👈</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>학생을 선택해주세요</h2>
            <p>좌측에서 관리할 학생을 선택하면 상세 정보를 확인할 수 있습니다.</p>
          </div>
        )}
      </div>

      {/* 시나리오 배정 모달 */}
      {showScenarioModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--navy-text)' }}>
              {selectedStudent?.name}에게 시나리오 배정하기
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {SCENARIO_TEMPLATES.map((scenario) => (
                <div key={scenario.id} style={{
                  padding: '1.5rem',
                  border: '1px solid var(--light-gray)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--sky-blue)';
                  e.currentTarget.style.background = 'rgba(74,144,226,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--light-gray)';
                  e.currentTarget.style.background = 'white';
                }}
                onClick={() => handleAssignScenario(scenario.id)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontWeight: '700', color: 'var(--navy-text)' }}>
                      {scenario.title}
                    </h3>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px',
                      background: scenario.difficulty === '초급' ? 'var(--success-green)' : 
                                scenario.difficulty === '중급' ? 'var(--sunshine-yellow)' : 'var(--coral-pink)',
                      color: 'white',
                      fontSize: '0.7rem',
                      fontWeight: '700'
                    }}>
                      {scenario.difficulty}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--soft-text)', marginBottom: '0.5rem' }}>
                    {scenario.description}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    {scenario.targetSkills.map((skill) => (
                      <span key={skill} style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px',
                        background: 'var(--warm-gray)',
                        fontSize: '0.7rem',
                        color: 'var(--navy-text)'
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--soft-text)' }}>
                    대상연령: {scenario.ageRange}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button
                onClick={() => setShowScenarioModal(false)}
                style={{
                  flex: 1,
                  padding: '1rem',
                  borderRadius: '12px',
                  background: 'var(--warm-gray)',
                  color: 'var(--navy-text)',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 답장 모달 */}
      {showReplyModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--navy-text)' }}>
              {selectedStudent?.parentName}에게 답장하기
            </h2>
            
            {selectedComment && (
              <div style={{
                padding: '1rem',
                background: 'var(--warm-gray)',
                borderRadius: '8px',
                marginBottom: '1rem',
                fontSize: '0.9rem'
              }}>
                "{selectedComment.message}"
              </div>
            )}
            
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="답장 내용을 입력해주세요..."
              style={{
                width: '100%',
                height: '120px',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--light-gray)',
                fontSize: '0.9rem',
                resize: 'none',
                marginBottom: '1rem'
              }}
            />
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setShowReplyModal(false)}
                style={{
                  flex: 1,
                  padding: '1rem',
                  borderRadius: '12px',
                  background: 'var(--warm-gray)',
                  color: 'var(--navy-text)',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                취소
              </button>
              <button
                onClick={handleSendReply}
                style={{
                  flex: 1,
                  padding: '1rem',
                  borderRadius: '12px',
                  background: 'var(--sky-blue)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                전송
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}