// 아이용 대시보드 페이지

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 가상의 아이 데이터 (실제로는 로그인된 아이 정보)
const CHILD_INFO = {
  id: 1,
  name: "김민지",
  age: 7,
  avatar: "👧",
  level: 5,
  points: 280,
  nextLevelPoints: 350
};

// 선생님이 배정한 미션들
const ASSIGNED_MISSIONS = [
  {
    id: 1,
    title: "친구와 사이좋게 지내기",
    type: "scenario",
    scenario: "친구가 장난감을 뺏어간 상황",
    description: "친구가 내 장난감을 가져갔을 때 어떻게 해야 할지 배워보아요",
    icon: "🧸",
    difficulty: "쉬움",
    points: 50,
    isCompleted: false,
    assignedBy: "김선생님"
  },
  {
    id: 2,
    title: "용기를 배우는 모험",
    type: "story",
    description: "용기있는 주인공이 되어 모험을 떠나보아요!",
    icon: "🦸‍♀️",
    difficulty: "보통",
    points: 70,
    isCompleted: true,
    assignedBy: "김선생님"
  },
  {
    id: 3,
    title: "새 친구 사귀기",
    type: "scenario",
    scenario: "새로운 친구를 사귀고 싶은 상황",
    description: "새로운 환경에서 친구를 사귀는 방법을 알아보아요",
    icon: "🤝",
    difficulty: "어려움", 
    points: 100,
    isCompleted: false,
    assignedBy: "이상담사님"
  }
];

// 다른 활동들
const OTHER_ACTIVITIES = [
  {
    id: "puzzle",
    title: "재미있는 퍼즐",
    description: "두뇌를 키우는 퍼즐 게임이에요",
    icon: "🧩",
    color: "var(--gradient-mint)"
  },
  {
    id: "drawing",
    title: "그림 그리기",
    description: "상상력을 키우는 그림 그리기",
    icon: "🎨", 
    color: "var(--gradient-coral)"
  },
  {
    id: "reading",
    title: "책 읽기",
    description: "재미있는 책을 읽어보아요",
    icon: "📚",
    color: "var(--gradient-sky)"
  },
  {
    id: "music",
    title: "음악 듣기",
    description: "신나는 음악과 함께 춤춰요",
    icon: "🎵",
    color: "var(--gradient-sunshine)"
  }
];

export default function StudentDashBoardPage() {
  const navigate = useNavigate();
  const [showTeacherMode, setShowTeacherMode] = useState(false);

  const handleMissionClick = (mission: typeof ASSIGNED_MISSIONS[0]) => {
    if (mission.isCompleted) {
      alert(`${mission.title} 미션을 이미 완료했어요! 🎉`);
    } else {
      // 동화 생성 페이지로 이동
      navigate('/create-story');
    }
  };

  const handleActivityClick = (activity: typeof OTHER_ACTIVITIES[0]) => {
    alert(`${activity.title}은(는) 곧 만날 수 있어요! 🚀`);
  };

  const handleSwitchToTeacher = () => {
    setShowTeacherMode(true);
    // 실제로는 선생님 모드 페이지로 이동
    alert("선생님 모드로 전환합니다!");
  };

  const progressPercent = (CHILD_INFO.points / CHILD_INFO.nextLevelPoints) * 100;

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
              🌟
            </div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: '800',
              color: 'var(--navy-text)',
              margin: 0,
              letterSpacing: '-0.02em'
            }}>
              팅커벨
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* 아이 프로필 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.4rem 0.4rem 0.4rem 1rem',
              background: 'var(--warm-gray)',
              borderRadius: '50px',
              cursor: 'pointer'
            }}>
              <span style={{ fontWeight: '600', color: 'var(--navy-text)', fontSize: '0.9rem' }}>
                {CHILD_INFO.name}
              </span>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--gradient-coral)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem'
              }}>
                {CHILD_INFO.avatar}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '2rem'
      }}>
        {/* Welcome Section */}
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
            안녕하세요, {CHILD_INFO.name}! 👋
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--soft-text)',
            fontWeight: '500',
            marginBottom: '1.5rem'
          }}>
            오늘도 재미있는 모험을 떠나볼까요? ✨
          </p>
          
          {/* Progress Bar */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid var(--light-gray)',
            boxShadow: 'var(--shadow-soft)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontWeight: '700', color: 'var(--navy-text)' }}>
                레벨 {CHILD_INFO.level} 🌟
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--soft-text)' }}>
                {CHILD_INFO.points} / {CHILD_INFO.nextLevelPoints} 포인트
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '12px',
              background: 'var(--light-gray)',
              borderRadius: '6px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: 'var(--gradient-sunshine)',
                borderRadius: '6px',
                transition: 'width 0.5s ease'
              }} />
            </div>
          </div>
        </div>

        {/* Assigned Missions */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--navy-text)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🎯 나의 미션
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {ASSIGNED_MISSIONS.map((mission) => (
              <div
                key={mission.id}
                onClick={() => handleMissionClick(mission)}
                style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  border: '1px solid var(--light-gray)',
                  boxShadow: 'var(--shadow-soft)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  opacity: mission.isCompleted ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
                }}
              >
                {mission.isCompleted && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--success-green)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem'
                  }}>
                    ✅
                  </div>
                )}
                
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {mission.icon}
                </div>
                
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  color: 'var(--navy-text)',
                  marginBottom: '0.5rem'
                }}>
                  {mission.title}
                </h3>
                
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--soft-text)',
                  lineHeight: 1.5,
                  marginBottom: '1rem'
                }}>
                  {mission.description}
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{
                      fontSize: '0.8rem',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px',
                      background: mission.difficulty === '쉬움' ? 'rgba(16, 185, 129, 0.1)' :
                                mission.difficulty === '보통' ? 'rgba(255, 193, 7, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: mission.difficulty === '쉬움' ? '#10B981' :
                             mission.difficulty === '보통' ? '#F59E0B' : '#EF4444',
                      fontWeight: '600'
                    }}>
                      {mission.difficulty}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--soft-text)' }}>
                      by {mission.assignedBy}
                    </span>
                  </div>
                  
                  <div style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    background: 'var(--gradient-sunshine)',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: '700'
                  }}>
                    +{mission.points}p
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Activities */}
        <div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--navy-text)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🎮 다른 놀이
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {OTHER_ACTIVITIES.map((activity) => (
              <div
                key={activity.id}
                onClick={() => handleActivityClick(activity)}
                style={{
                  background: activity.color,
                  padding: '2rem 1.5rem',
                  borderRadius: '16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {activity.icon}
                </div>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem'
                }}>
                  {activity.title}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  opacity: 0.9,
                  lineHeight: 1.4
                }}>
                  {activity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}