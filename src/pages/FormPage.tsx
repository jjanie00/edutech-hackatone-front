import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

// 가상의 학생 데이터 (실제로는 API에서 가져올 예정)
const STUDENTS = [
  {
    id: 1,
    name: "김민지",
    age: 7,
    gender: "여자",
    interests: "공주, 그림 그리기",
  },
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
    description: "친구와의 갈등 해결 능력을 기르는 동화",
  },
  {
    id: "social_inclusion",
    title: "친구들이 나 빼고 놀고 있는 상황",
    emoji: "👥",
    description: "사회적 포용과 소통 능력을 배우는 동화",
  },
  {
    id: "making_friends",
    title: "새로운 친구를 사귀고 싶은 상황",
    emoji: "🤝",
    description: "새로운 관계 형성과 용기를 배우는 동화",
  },
  {
    id: "apologizing_for_mistake",
    title: "내가 실수해서 친구에게 미안한 상황",
    emoji: "💦",
    description: "잘못을 인정하고 사과하는 용기를 배우는 동화",
  },
];

type FormValues = {
  favorite?: string; // 좋아하는 것 추가
  studentId: number;
  favoriteThings?: string; // 좋아하는 것 추가
  storyType: "scenario" | "custom";
  // 시나리오 기반
  selectedScenario?: string;
  // 자유 형식
  customTheme?: string;
  learningGoals?: string;
};

export default function FormPage() {
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      storyType: "scenario", // 기본값을 시나리오로 설정
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // URL 파라미터에서 학생 ID 가져오기
  const studentIdFromUrl = searchParams.get("studentId");
  const preSelectedStudent = studentIdFromUrl
    ? STUDENTS.find((s) => s.id === parseInt(studentIdFromUrl))
    : null;

  useEffect(() => {
    if (preSelectedStudent) {
      setValue("studentId", preSelectedStudent.id);
    }
  }, [preSelectedStudent, setValue]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    const selectedStudent = STUDENTS.find((s) => s.id === data.studentId);

    // TODO: 제출 데이터로 AI 동화 생성 API 호출 또는 라우팅 연결
    // eslint-disable-next-line no-console
    console.log("Form Submit:", {
      ...data,
      studentInfo: selectedStudent,
    });

    // 로딩 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);

    // 동화 페이지로 이동
    navigate("/story");
  };

  const selectedStudentId = watch("studentId");
  const selectedStoryType = watch("storyType");
  const selectedScenario = watch("selectedScenario");

  const selectedStudent = STUDENTS.find((s) => s.id === selectedStudentId);

  return (
    <div style={{ background: "var(--cream-white)", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          background: "white",
          borderBottom: "1px solid var(--light-gray)",
          boxShadow: "var(--shadow-soft)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "1rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={() => navigate("/")}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "var(--warm-gray)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                fontSize: "1.2rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--light-gray)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--warm-gray)";
              }}
            >
              ←
            </button>
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "var(--gradient-sunshine)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                fontWeight: "800",
                color: "white",
              }}
            >
              📚
            </div>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "800",
                color: "var(--navy-text)",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              StoryMaker
            </h1>
          </div>

          {/* 선택된 학생 정보 표시 */}
          {selectedStudent && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.5rem 1rem",
                background: "var(--warm-gray)",
                borderRadius: "50px",
                border: "1px solid var(--light-gray)",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>
                {selectedStudent.gender === "남자" ? "👦" : "👧"}
              </span>
              <span
                style={{
                  fontWeight: "600",
                  color: "var(--navy-text)",
                  fontSize: "0.9rem",
                }}
              >
                {selectedStudent.name} ({selectedStudent.age}세)
              </span>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          padding: "2rem",
          animation: "slide-up 0.6s ease-out",
        }}
      >
        {/* Page Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "2.5rem",
            animation: "bounce-in 0.8s ease-out",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              background: "var(--gradient-sunshine)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "0.5rem",
              letterSpacing: "-0.03em",
            }}
          >
            민지의 동화 만들기
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--soft-text)",
              fontWeight: "500",
            }}
          >
            마법처럼 이야기가 태어나요 ✨
            <br />
            마음속 이야기를 들려주면 멋진 동화로 만들어드릴게요!✨
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
          {/* Favorite 입력 */}
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "20px",
              boxShadow: "var(--shadow-soft)",
              border: "1px solid var(--light-gray)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "var(--shadow-medium)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "var(--shadow-soft)";
            }}
          >
            <label
              style={{
                display: "block",
                fontSize: "1.1rem",
                fontWeight: "700",
                color: "var(--navy-text)",
                marginBottom: "1rem",
              }}
            >
              💝 좋아하는 것
            </label>
            <input
              type="text"
              placeholder="좋아하는 것을 입력해주세요 (예: 토끼, 무지개, 딸기, 놀이터)"
              style={{
                width: "100%",
                padding: "1rem 1.5rem",
                borderRadius: "12px",
                border: "2px solid var(--light-gray)",
                fontSize: "1rem",
                fontWeight: "500",
                transition: "all 0.3s ease",
                background: "var(--warm-gray)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--coral-pink)";
                e.target.style.background = "white";
                e.target.style.boxShadow =
                  "0 4px 12px rgba(255, 107, 157, 0.2)";
              }}
              {...register("favorite", {
                onBlur: (e) => {
                  e.target.style.borderColor = "var(--light-gray)";
                  e.target.style.background = "var(--warm-gray)";
                  e.target.style.boxShadow = "none";
                },
              })}
            />
          </div>

          {/* 동화 유형 선택 */}
          {
            <div
              style={{
                background: "white",
                padding: "2rem",
                borderRadius: "20px",
                boxShadow: "var(--shadow-soft)",
                border: "1px solid var(--light-gray)",
                transition: "all 0.3s ease",
                animation: "slide-up 0.4s ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "var(--shadow-medium)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-soft)";
              }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  color: "var(--navy-text)",
                  marginBottom: "1rem",
                }}
              >
                📚 동화 유형
              </label>
              <div style={{ display: "flex", gap: "1rem" }}>
                {(["scenario", "custom"] as const).map((type) => (
                  <label
                    key={type}
                    style={{
                      flex: 1,
                      cursor: "pointer",
                      padding: "1.5rem",
                      borderRadius: "12px",
                      border:
                        selectedStoryType === type
                          ? "2px solid var(--sky-blue)"
                          : "2px solid var(--light-gray)",
                      background:
                        selectedStoryType === type
                          ? "var(--gradient-sky)"
                          : "var(--warm-gray)",
                      color:
                        selectedStoryType === type
                          ? "white"
                          : "var(--navy-text)",
                      fontWeight: "700",
                      textAlign: "center",
                      transition: "all 0.3s ease",
                      transform:
                        selectedStoryType === type ? "scale(1.05)" : "scale(1)",
                      boxShadow:
                        selectedStoryType === type
                          ? "var(--shadow-blue)"
                          : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (type !== selectedStoryType) {
                        e.currentTarget.style.transform = "scale(1.02)";
                        e.currentTarget.style.background = "white";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (type !== selectedStoryType) {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.background = "var(--warm-gray)";
                      }
                    }}
                  >
                    <input
                      type="radio"
                      value={type}
                      style={{ display: "none" }}
                      {...register("storyType")}
                    />
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                      {type === "scenario" ? "🎭" : "🎨"}
                    </div>
                    <div>
                      {type === "scenario" ? "시나리오 기반" : "자유 주제"}
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        opacity: 0.8,
                        marginTop: "0.5rem",
                      }}
                    >
                      {type === "scenario"
                        ? "정해진 상황에서 학습"
                        : "창의적인 주제로 학습"}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          }

          {/* 시나리오 선택 (시나리오 기반일 때만) */}
          {selectedStoryType === "scenario" && (
            <div
              style={{
                background: "white",
                padding: "2rem",
                borderRadius: "20px",
                boxShadow: "var(--shadow-soft)",
                border: "1px solid var(--light-gray)",
                transition: "all 0.3s ease",
                animation: "slide-up 0.4s ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "var(--shadow-medium)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-soft)";
              }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  color: "var(--navy-text)",
                  marginBottom: "1.5rem",
                }}
              >
                🎭 시나리오를 선택해주세요
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "1rem",
                }}
              >
                {PREDEFINED_SCENARIOS.map((scenario) => (
                  <label
                    key={scenario.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      padding: "1.5rem",
                      borderRadius: "16px",
                      border:
                        selectedScenario === scenario.id
                          ? "3px solid var(--sunshine-yellow)"
                          : "2px solid var(--light-gray)",
                      background:
                        selectedScenario === scenario.id
                          ? "var(--gradient-sunshine)"
                          : "white",
                      color:
                        selectedScenario === scenario.id
                          ? "white"
                          : "var(--navy-text)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      transform:
                        selectedScenario === scenario.id
                          ? "scale(1.05)"
                          : "scale(1)",
                      boxShadow:
                        selectedScenario === scenario.id
                          ? "var(--shadow-yellow)"
                          : "var(--shadow-soft)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      if (selectedScenario !== scenario.id) {
                        e.currentTarget.style.transform =
                          "translateY(-4px) scale(1.02)";
                        e.currentTarget.style.boxShadow =
                          "var(--shadow-medium)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedScenario !== scenario.id) {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "var(--shadow-soft)";
                      }
                    }}
                  >
                    <input
                      type="radio"
                      value={scenario.id}
                      style={{ display: "none" }}
                      {...register("selectedScenario")}
                    />
                    {/* 선택된 카드 체크 마크 */}
                    {selectedScenario === scenario.id && (
                      <div
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          width: "24px",
                          height: "24px",
                          background: "white",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                        }}
                      >
                        ✓
                      </div>
                    )}
                    <div
                      style={{
                        fontSize: "3rem",
                        marginBottom: "1rem",
                        filter:
                          selectedScenario === scenario.id
                            ? "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                            : "none",
                      }}
                    >
                      {scenario.emoji}
                    </div>
                    <div
                      style={{
                        fontWeight: "700",
                        fontSize: "1rem",
                        marginBottom: "0.75rem",
                        lineHeight: "1.4",
                      }}
                    >
                      {scenario.title}
                    </div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        opacity: selectedScenario === scenario.id ? 0.95 : 0.7,
                        lineHeight: "1.3",
                      }}
                    >
                      {scenario.description}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* 자유 주제 입력 (자유 주제일 때만) */}
          {selectedStoryType === "custom" && (
            <>
              <div
                style={{
                  background: "white",
                  padding: "2rem",
                  borderRadius: "20px",
                  boxShadow: "var(--shadow-soft)",
                  border: "1px solid var(--light-gray)",
                  transition: "all 0.3s ease",
                  animation: "slide-up 0.4s ease-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-medium)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--shadow-soft)";
                }}
              >
                <label
                  style={{
                    display: "block",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    color: "var(--navy-text)",
                    marginBottom: "1rem",
                  }}
                >
                  🎨 동화 주제
                </label>
                <input
                  type="text"
                  placeholder="어떤 주제의 동화를 만들고 싶나요? (예: 우주 여행, 마법의 숲, 바다 탐험)"
                  style={{
                    width: "100%",
                    padding: "1rem 1.5rem",
                    borderRadius: "12px",
                    border: "2px solid var(--light-gray)",
                    fontSize: "1rem",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                    background: "var(--warm-gray)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--coral-pink)";
                    e.target.style.background = "white";
                    e.target.style.boxShadow =
                      "0 4px 12px rgba(255, 107, 157, 0.2)";
                  }}
                  {...register("customTheme", {
                    onBlur: (e) => {
                      e.target.style.borderColor = "var(--light-gray)";
                      e.target.style.background = "var(--warm-gray)";
                      e.target.style.boxShadow = "none";
                    },
                  })}
                />
              </div>

              <div
                style={{
                  background: "white",
                  padding: "2rem",
                  borderRadius: "20px",
                  boxShadow: "var(--shadow-soft)",
                  border: "1px solid var(--light-gray)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-medium)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--shadow-soft)";
                }}
              >
                <label
                  style={{
                    display: "block",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    color: "var(--navy-text)",
                    marginBottom: "1rem",
                  }}
                >
                  📖 학습 목표
                </label>
                <input
                  type="text"
                  placeholder="이 동화를 통해 무엇을 배우고 싶나요? (예: 용기, 친구의 소중함, 정직함)"
                  style={{
                    width: "100%",
                    padding: "1rem 1.5rem",
                    borderRadius: "12px",
                    border: "2px solid var(--light-gray)",
                    fontSize: "1rem",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                    background: "var(--warm-gray)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--purple-accent)";
                    e.target.style.background = "white";
                    e.target.style.boxShadow =
                      "0 4px 12px rgba(155, 89, 182, 0.2)";
                  }}
                  {...register("learningGoals", {
                    onBlur: (e) => {
                      e.target.style.borderColor = "var(--light-gray)";
                      e.target.style.background = "var(--warm-gray)";
                      e.target.style.boxShadow = "none";
                    },
                  })}
                />
              </div>
            </>
          )}

          {/* 제출 버튼 */}
          <div style={{ paddingTop: "1rem" }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "1.5rem",
                borderRadius: "16px",
                border: "none",
                background: isSubmitting
                  ? "var(--soft-text)"
                  : "var(--gradient-sunshine)",
                color: "white",
                fontSize: "1.2rem",
                fontWeight: "800",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                boxShadow: isSubmitting ? "none" : "var(--shadow-yellow)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform =
                    "translateY(-2px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "var(--shadow-strong)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "var(--shadow-yellow)";
                }
              }}
            >
              {isSubmitting ? (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      width: "20px",
                      height: "20px",
                      border: "2px solid white",
                      borderTop: "2px solid transparent",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  ></span>
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
