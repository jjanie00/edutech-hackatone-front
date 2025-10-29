import { useForm } from "react-hook-form";

type FormValues = {
  childName: string;
  gender: "남자" | "여자";
  age: number;
  favorites: string;
  subject: string;
  scenario:
    | "친구가 장난감을 뺏어간 상황"
    | "친구들이 나 빼고 놀고 있는 상황"
    | "새로운 친구를 사귀고 싶은 상황";
};

const AGE_OPTIONS = [3, 4, 5, 6, 7, 8, 9, 10];
const SCENARIO_OPTIONS: FormValues["scenario"][] = [
  "친구가 장난감을 뺏어간 상황",
  "친구들이 나 빼고 놀고 있는 상황",
  "새로운 친구를 사귀고 싶은 상황",
];

export default function FormPage() {
  const { register, handleSubmit, watch } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    // TODO: 제출 데이터로 AI 동화 생성 API 호출 또는 라우팅 연결
    // 현재는 확인을 위해 콘솔 출력만 합니다.
    // eslint-disable-next-line no-console
    console.log("Form Submit:", data);
    alert("입력 완료! 콘솔에서 제출 데이터를 확인하세요.");
    // reset(); // 필요 시 초기화
  };

  const selectedGender = watch("gender");
  const selectedAge = watch("age");

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-2xl font-semibold">맞춤형 동화 만들기</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 아이 이름 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">아이 이름</label>
          <input
            type="text"
            placeholder="아이 이름을 입력하세요"
            className="w-full rounded-md border px-3 py-2"
            {...register("childName")}
          />
        </div>

        {/* 성별 (토글) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">성별</label>
          <div className="flex gap-2">
            {(["남자", "여자"] as const).map((g) => (
              <label
                key={g}
                className={`cursor-pointer rounded-md border px-4 py-2 ${
                  selectedGender === g ? "bg-blue-500 text-white" : "bg-white"
                }`}
              >
                <input
                  type="radio"
                  value={g}
                  className="hidden"
                  {...register("gender")}
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        {/* 나이 (토글) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">나이</label>
          <div className="flex flex-wrap gap-2">
            {AGE_OPTIONS.map((age) => (
              <label
                key={age}
                className={`cursor-pointer rounded-md border px-3 py-2 ${
                  Number(selectedAge) === age
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
              >
                <input
                  type="radio"
                  value={age}
                  className="hidden"
                  {...register("age", { valueAsNumber: true })}
                />
                {age}세
              </label>
            ))}
          </div>
        </div>

        {/* 좋아하는 것 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">좋아하는 것</label>
          <input
            type="text"
            placeholder="예: 공룡, 공주, 자동차"
            className="w-full rounded-md border px-3 py-2"
            {...register("favorites")}
          />
        </div>

        {/* 공부하고 싶은 내용 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            공부하고 싶은 내용
          </label>
          <input
            type="text"
            placeholder="공부하고 싶은 내용을 구체적으로 입력해주세요"
            className="w-full rounded-md border px-3 py-2"
            {...register("subject")}
          />
        </div>

        {/* 시나리오 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">시나리오</label>
          <div className="flex flex-col gap-2">
            {SCENARIO_OPTIONS.map((s) => (
              <label key={s} className="flex cursor-pointer items-center gap-2">
                <input type="radio" value={s} {...register("scenario")} />
                <span>{s}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            동화 만들기
          </button>
        </div>
      </form>
    </div>
  );
}
