import { useNavigate } from "react-router-dom";

// 가상의 학생 데이터 (실제로는 API에서 가져올 예정)
const STUDENTS = [
  { id: 1, name: "김민지", age: 7, gender: "여자", interests: "공주, 그림 그리기", recentStory: "용기를 배우는 모험", storiesCount: 12 },
  { id: 2, name: "이준호", age: 9, gender: "남자", interests: "공룡, 로봇", recentStory: "공룡과 친구되기", storiesCount: 8 },
  { id: 3, name: "박서연", age: 6, gender: "여자", interests: "동물, 요리", recentStory: "요리하는 토끼", storiesCount: 15 },
  { id: 4, name: "최지우", age: 8, gender: "여자", interests: "책 읽기, 춤", recentStory: "마법의 도서관", storiesCount: 20 },
  { id: 5, name: "정우진", age: 7, gender: "남자", interests: "축구, 자동차", recentStory: "축구공의 모험", storiesCount: 6 },
];

const RECENT_ACTIVITIES = [
  { student: "이준호", action: "용기를 배우는 모험", time: "2시간 전", type: "story" },
  { student: "박민지", action: "5회차 세션 완료", time: "5시간 전", type: "session" },
  { student: "커뮤니티", action: "새 댓글이 달렸어요", time: "1일 전", type: "comment" },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  const handleCreateStory = (studentId: number) => {
    navigate(`/create-story?studentId=${studentId}`);
  };

  const handleAddNewStudent = () => {
    alert("학생 등록 기능을 구현해주세요!");
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
              StoryEdu
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--warm-gray)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}>
              🔔
            </button>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.4rem 0.4rem 0.4rem 1rem',
              background: 'var(--warm-gray)',
              borderRadius: '50px',
              cursor: 'pointer'
            }}>
              <span style={{ fontWeight: '600', color: 'var(--navy-text)' }}>김선생님</span>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--gradient-sky)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '700',
                fontSize: '0.85rem'
              }}>
                김
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '2rem'
      }}>
        {/* Page Header */}
        <div style={{ 
          marginBottom: '2.5rem',
          animation: 'slide-up 0.6s ease-out'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: 'var(--navy-text)',
            marginBottom: '0.5rem',
            letterSpacing: '-0.03em'
          }}>
            안녕하세요, 김선생님 👋
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--soft-text)',
            fontWeight: '500'
          }}>
            오늘 새로운 학생이 2명 등록되었어요. 이번 주 동화 생성이 15% 증가했습니다. ✨
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid var(--light-gray)',
            boxShadow: 'var(--shadow-soft)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'var(--gradient-sunshine)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                📈
              </div>
              <span style={{
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: '700',
                background: 'rgba(5,150,105,0.1)',
                color: '#059669'
              }}>
                +15%
              </span>
            </div>
            <div style={{
              fontSize: '2.25rem',
              fontWeight: '800',
              color: 'var(--navy-text)',
              marginBottom: '0.25rem'
            }}>
              23
            </div>
            <div style={{
              fontSize: '0.95rem',
              color: 'var(--soft-text)',
              fontWeight: '600'
            }}>
              이번 주 생성 동화
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid var(--light-gray)',
            boxShadow: 'var(--shadow-soft)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'var(--gradient-sky)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                👥
              </div>
            </div>
            <div style={{
              fontSize: '2.25rem',
              fontWeight: '800',
              color: 'var(--navy-text)',
              marginBottom: '0.25rem'
            }}>
              {STUDENTS.length}
            </div>
            <div style={{
              fontSize: '0.95rem',
              color: 'var(--soft-text)',
              fontWeight: '600'
            }}>
              활성 학생
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid var(--light-gray)',
            boxShadow: 'var(--shadow-soft)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'var(--gradient-mint)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                ✅
              </div>
            </div>
            <div style={{
              fontSize: '2.25rem',
              fontWeight: '800',
              color: 'var(--navy-text)',
              marginBottom: '0.25rem'
            }}>
              78%
            </div>
            <div style={{
              fontSize: '0.95rem',
              color: 'var(--soft-text)',
              fontWeight: '600'
            }}>
              학습 목표 달성률
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Recent Activities */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            border: '1px solid var(--light-gray)',
            boxShadow: 'var(--shadow-soft)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '1.5rem 2rem',
              borderBottom: '1px solid var(--light-gray)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{
                fontSize: '1.1rem',
                fontWeight: '700',
                color: 'var(--navy-text)',
                margin: 0
              }}>
                최근 활동
              </h2>
              <button style={{
                fontSize: '0.85rem',
                fontWeight: '600',
                color: 'var(--sky-blue)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(74,144,226,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
              }}>
                전체보기
              </button>
            </div>
            <div style={{ padding: '1.5rem 2rem' }}>
              {RECENT_ACTIVITIES.map((activity, index) => (
                <div key={index} style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1rem',
                  borderRadius: '12px',
                  marginBottom: index < RECENT_ACTIVITIES.length - 1 ? '0.75rem' : 0,
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  border: '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--warm-gray)';
                  e.currentTarget.style.borderColor = 'var(--light-gray)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: activity.type === 'story' ? 'var(--gradient-sunshine)' : 
                               activity.type === 'session' ? 'var(--gradient-sky)' : 'var(--gradient-coral)',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>
                    {activity.type === 'story' ? '📚' : activity.type === 'session' ? '⭐' : '💬'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      color: 'var(--navy-text)',
                      marginBottom: '0.25rem'
                    }}>
                      {activity.student} · {activity.action}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: 'var(--soft-text)',
                      fontWeight: '500'
                    }}>
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            border: '1px solid var(--light-gray)',
            boxShadow: 'var(--shadow-soft)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '1.5rem 2rem',
              borderBottom: '1px solid var(--light-gray)'
            }}>
              <h2 style={{
                fontSize: '1.1rem',
                fontWeight: '700',
                color: 'var(--navy-text)',
                margin: 0
              }}>
                빠른 실행
              </h2>
            </div>
            <div style={{ padding: '1.5rem 2rem' }}>
              <button 
                onClick={() => navigate('/create-story')}
                style={{
                width: '100%',
                padding: '1rem',
                background: 'var(--gradient-sunshine)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '0.95rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s',
                marginBottom: '0.75rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-yellow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                ✨ 새 동화 만들기
              </button>
              
              <button 
                onClick={handleAddNewStudent}
                style={{
                width: '100%',
                padding: '1rem',
                background: 'white',
                color: 'var(--sky-blue)',
                border: '1.5px solid var(--sky-blue)',
                borderRadius: '12px',
                fontSize: '0.95rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginBottom: '0.75rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--cream-white)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
              }}>
                👨‍🎓 학생 등록하기
              </button>
              
              <button style={{
                width: '100%',
                padding: '1rem',
                background: 'white',
                color: 'var(--purple-accent)',
                border: '1.5px solid var(--purple-accent)',
                borderRadius: '12px',
                fontSize: '0.95rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginBottom: '1.5rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--cream-white)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
              }}>
                💬 커뮤니티 보기
              </button>

              <div style={{
                padding: '1.25rem',
                background: 'rgba(126,212,173,0.08)',
                borderRadius: '12px',
                border: '1px solid rgba(126,212,173,0.3)'
              }}>
                <div style={{
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  color: '#059669',
                  marginBottom: '0.5rem'
                }}>
                  💡 오늘의 팁
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: '#047857',
                  lineHeight: 1.6
                }}>
                  학생의 관심사를 동화에 반영하면 집중도가 2배 높아져요!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Students Grid */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          border: '1px solid var(--light-gray)',
          boxShadow: 'var(--shadow-soft)',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '1.5rem 2rem',
            borderBottom: '1px solid var(--light-gray)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: 'var(--navy-text)',
              margin: 0
            }}>
              내 학생들
            </h2>
            <button style={{
              fontSize: '0.85rem',
              fontWeight: '600',
              color: 'var(--sky-blue)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem 0.75rem',
              borderRadius: '6px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(74,144,226,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
            }}>
              전체보기
            </button>
          </div>
          <div style={{ padding: '1.5rem 2rem' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              {STUDENTS.map((student) => (
                <div
                  key={student.id}
                  onClick={() => handleCreateStory(student.id)}
                  style={{
                    background: 'var(--warm-gray)',
                    padding: '1.5rem 1rem',
                    borderRadius: '14px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    border: '2px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.borderColor = 'var(--sunshine-yellow)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-yellow)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--warm-gray)';
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: student.gender === "남자" ? 'var(--gradient-sky)' : 'var(--gradient-coral)',
                    margin: '0 auto 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: 'white'
                  }}>
                    {student.name.slice(-1)}
                  </div>
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: 'var(--navy-text)',
                    marginBottom: '0.25rem'
                  }}>
                    {student.name}
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: 'var(--soft-text)',
                    fontWeight: '500',
                    marginBottom: '0.5rem'
                  }}>
                    {student.age}세 · {student.interests}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--sky-blue)',
                    fontWeight: '600'
                  }}>
                    동화 {student.storiesCount}개 · 최근: {student.recentStory}
                  </div>
                </div>
              ))}
              
              {/* Add New Student Card */}
              <div
                onClick={handleAddNewStudent}
                style={{
                  background: 'rgba(126,212,173,0.08)',
                  border: '2px dashed var(--mint-green)',
                  padding: '1.5rem 1rem',
                  borderRadius: '14px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(126,212,173,0.15)';
                  e.currentTarget.style.borderColor = '#5DCFB8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(126,212,173,0.08)';
                  e.currentTarget.style.borderColor = 'var(--mint-green)';
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'var(--mint-green)',
                  margin: '0 auto 0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  ➕
                </div>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: '700',
                  color: 'var(--mint-green)',
                  marginBottom: '0.25rem'
                }}>
                  새 학생
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: 'var(--mint-green)',
                  fontWeight: '500'
                }}>
                  등록하기
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Action Button */}
      <button 
        onClick={() => navigate('/create-story')}
        style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'var(--gradient-sunshine)',
        border: 'none',
        boxShadow: 'var(--shadow-yellow)',
        cursor: 'pointer',
        transition: 'all 0.3s',
        zIndex: 50,
        fontSize: '1.5rem'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = 'var(--shadow-strong)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'var(--shadow-yellow)';
      }}>
        ✨
      </button>
    </div>
  );
}