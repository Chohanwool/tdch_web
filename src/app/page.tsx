import Image from "next/image";

export default function Home() {
  return (
    <div className="section-shell flex w-full flex-col pb-16 pt-0 md:pb-20 md:pt-0">
      <section className="relative left-1/2 w-[min(2200px,122vw)] -translate-x-1/2 overflow-hidden rounded-b-[2rem] shadow-[0_20px_46px_rgba(16,33,63,0.2)]">
        <div className="relative min-h-[430px] md:min-h-[560px]">
          <Image
            src="/images/sample2.jpg"
            alt="더 제자교회 메인 히어로 이미지"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/78 via-ink/52 to-ink/18" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-transparent to-transparent" />

          <div className="relative z-10 flex min-h-[430px] items-end pb-8 pt-24 md:min-h-[560px] md:pb-10 md:pt-28">
            <div className="section-shell w-full">
              <div className="max-w-xl space-y-4 rounded-2xl bg-black/30 px-4 py-5 text-ivory backdrop-blur-[2px] md:space-y-5 md:px-5 md:py-6">
                <p className="chip w-fit bg-gold/30 text-ivory">VISION</p>
                <h1 className="font-serif text-4xl leading-[1.18] md:text-6xl">
                  성령으로
                  <br />
                  제자삼는 교회
                </h1>
                <p className="text-sm font-medium leading-relaxed text-ivory/90 md:text-base">
                  예수께서 나아와 말씀하여 이르시되 하늘과 땅의 모든 권세를 내게 주셨으니
                  <br />
                  너희는 가서 모든 민족을 제자로 삼아 아버지와 아들과 성령의 이름으로 세례를 베풀고
                  <br />
                  내가 너희에게 분부한 모든 것을 가르쳐 지키게 하라
                  <br />
                  볼지어다 내가 세상 끝날까지 너희와 항상 함께 있으리라
                </p>
                <p className="text-sm font-semibold tracking-wide text-white">마태복음 28:18-20</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
