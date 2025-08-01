import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, Beaker, Thermometer, Zap, TestTube, BookOpen, Brain } from "lucide-react";

const Index = () => {
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const quizQuestions = [
    {
      question: "아레니우스의 산 정의에 따르면, 산은 수용액에서 무엇을 내놓는가?",
      options: ["OH⁻ 이온", "H⁺ 이온", "Na⁺ 이온", "Cl⁻ 이온"],
      correct: "H⁺ 이온"
    },
    {
      question: "염기의 수용액에서 리트머스 시험지의 색깔 변화는?",
      options: ["빨간색→파란색", "파란색→빨간색", "무색→빨간색", "변화 없음"],
      correct: "빨간색→파란색"
    },
    {
      question: "중화반응에서 일어나는 현상이 아닌 것은?",
      options: ["온도 상승", "전기전도도 감소", "pH 변화", "기체 발생"],
      correct: "기체 발생"
    },
    {
      question: "일상생활에서 중화반응의 예가 아닌 것은?",
      options: ["제산제 복용", "산성비 중화", "위산과다 치료", "설탕 용해"],
      correct: "설탕 용해"
    },
    {
      question: "산과 염기의 수용액이 전기를 잘 통하는 이유는?",
      options: ["분자가 많아서", "이온이 존재해서", "온도가 높아서", "색깔 때문에"],
      correct: "이온이 존재해서"
    }
  ];

  const submitQuiz = () => {
    let score = 0;
    quizQuestions.forEach((question, index) => {
      if (quizAnswers[index] === question.correct) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizCompleted(true);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizCompleted(false);
    setQuizScore(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Beaker className="h-8 w-8" />
            <h1 className="text-4xl font-bold">산과 염기</h1>
          </div>
          <p className="text-xl opacity-90">고등학교 1학년 화학 학습</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="properties">성질</TabsTrigger>
            <TabsTrigger value="definition">정의</TabsTrigger>
            <TabsTrigger value="conductivity">전도성</TabsTrigger>
            <TabsTrigger value="indicators">지시약</TabsTrigger>
            <TabsTrigger value="neutralization">중화반응</TabsTrigger>
            <TabsTrigger value="daily-life">일상생활</TabsTrigger>
            <TabsTrigger value="quiz">퀴즈</TabsTrigger>
          </TabsList>

          {/* 산과 염기의 성질 */}
          <TabsContent value="properties">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="h-5 w-5 text-red-500" />
                    산(Acid)의 성질
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Badge variant="destructive">신맛</Badge>
                    <p>레몬, 식초와 같은 신맛을 가집니다.</p>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="destructive">리트머스 시험지</Badge>
                    <p>파란색 리트머스 시험지를 빨간색으로 변화시킵니다.</p>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="destructive">금속과 반응</Badge>
                    <p>아연, 철 등과 반응하여 수소 기체를 발생시킵니다.</p>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="destructive">부식성</Badge>
                    <p>농도가 진할 때 금속이나 피부를 부식시킵니다.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="h-5 w-5 text-blue-500" />
                    염기(Base)의 성질
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Badge variant="secondary">쓴맛</Badge>
                    <p>쓴맛을 가지며, 미끄러운 느낌이 납니다.</p>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary">리트머스 시험지</Badge>
                    <p>빨간색 리트머스 시험지를 파란색으로 변화시킵니다.</p>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary">단백질 분해</Badge>
                    <p>단백질을 분해하는 성질이 있습니다.</p>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary">부식성</Badge>
                    <p>강염기는 피부나 옷을 손상시킬 수 있습니다.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 아레니우스 정의 */}
          <TabsContent value="definition">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  아레니우스의 산-염기 정의
                </CardTitle>
                <CardDescription>
                  스웨덴의 화학자 아레니우스(Arrhenius)가 제시한 정의
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 border-2 border-red-200 rounded-lg bg-red-50">
                    <h3 className="text-xl font-bold mb-3 text-red-700">산 (Acid)</h3>
                    <p className="text-lg mb-4">수용액에서 <strong>수소 이온(H⁺)</strong>을 내놓는 물질</p>
                    <div className="space-y-2">
                      <p className="font-mono text-sm bg-white p-2 rounded">HCl → H⁺ + Cl⁻</p>
                      <p className="font-mono text-sm bg-white p-2 rounded">HNO₃ → H⁺ + NO₃⁻</p>
                      <p className="font-mono text-sm bg-white p-2 rounded">H₂SO₄ → 2H⁺ + SO₄²⁻</p>
                    </div>
                  </div>
                  
                  <div className="p-6 border-2 border-blue-200 rounded-lg bg-blue-50">
                    <h3 className="text-xl font-bold mb-3 text-blue-700">염기 (Base)</h3>
                    <p className="text-lg mb-4">수용액에서 <strong>수산화 이온(OH⁻)</strong>을 내놓는 물질</p>
                    <div className="space-y-2">
                      <p className="font-mono text-sm bg-white p-2 rounded">NaOH → Na⁺ + OH⁻</p>
                      <p className="font-mono text-sm bg-white p-2 rounded">KOH → K⁺ + OH⁻</p>
                      <p className="font-mono text-sm bg-white p-2 rounded">Ca(OH)₂ → Ca²⁺ + 2OH⁻</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-bold mb-2">💡 핵심 포인트</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>산: H⁺ 이온을 내놓음 (수소 공여체)</li>
                    <li>염기: OH⁻ 이온을 내놓음 (수소 받개체)</li>
                    <li>물의 존재가 필수적 (수용액에서만 정의)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 전기 전도성 */}
          <TabsContent value="conductivity">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  산과 염기의 전기 전도성
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="border-gray-300">
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg">순수한 물</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                        <div className="bg-gray-400 h-4 rounded-full" style={{width: "5%"}}></div>
                      </div>
                      <p className="text-sm text-muted-foreground">전기전도도: 매우 낮음</p>
                      <p className="text-xs mt-2">이온이 거의 없음</p>
                    </CardContent>
                  </Card>

                  <Card className="border-red-300">
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg text-red-600">산 용액</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                        <div className="bg-red-500 h-4 rounded-full" style={{width: "80%"}}></div>
                      </div>
                      <p className="text-sm text-muted-foreground">전기전도도: 높음</p>
                      <p className="text-xs mt-2">H⁺와 음이온 존재</p>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-300">
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg text-blue-600">염기 용액</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                        <div className="bg-blue-500 h-4 rounded-full" style={{width: "75%"}}></div>
                      </div>
                      <p className="text-sm text-muted-foreground">전기전도도: 높음</p>
                      <p className="text-xs mt-2">OH⁻와 양이온 존재</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-bold mb-3">🔬 전기 전도성의 원리</h4>
                  <div className="space-y-2">
                    <p><strong>1. 이온화:</strong> 산과 염기가 물에 녹으면서 이온으로 분리됩니다.</p>
                    <p><strong>2. 전하 이동:</strong> 이온들이 전기를 운반하는 역할을 합니다.</p>
                    <p><strong>3. 농도 관계:</strong> 농도가 진할수록 이온이 많아져 전기전도도가 높아집니다.</p>
                    <p><strong>4. 온도 영향:</strong> 온도가 높을수록 이온의 움직임이 활발해집니다.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 지시약 */}
          <TabsContent value="indicators">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TestTube className="h-5 w-5" />
                  지시약의 색 변화
                </CardTitle>
                <CardDescription>
                  산성과 염기성을 구별하는 지시약들의 색 변화
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center font-bold p-2 bg-muted rounded">지시약</div>
                    <div className="text-center font-bold p-2 bg-red-100 rounded text-red-700">산성 용액</div>
                    <div className="text-center font-bold p-2 bg-blue-100 rounded text-blue-700">염기성 용액</div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 items-center">
                    <div className="p-3 bg-background rounded border">
                      <strong>리트머스 시험지</strong>
                      <p className="text-sm text-muted-foreground">가장 기본적인 지시약</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded border border-red-200 text-center">
                      <span className="text-red-600 font-bold">빨간색</span>
                    </div>
                    <div className="p-3 bg-blue-50 rounded border border-blue-200 text-center">
                      <span className="text-blue-600 font-bold">파란색</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 items-center">
                    <div className="p-3 bg-background rounded border">
                      <strong>페놀프탈레인</strong>
                      <p className="text-sm text-muted-foreground">염기성에서만 색 변화</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded border border-gray-200 text-center">
                      <span className="text-gray-600 font-bold">무색</span>
                    </div>
                    <div className="p-3 bg-pink-50 rounded border border-pink-200 text-center">
                      <span className="text-pink-600 font-bold">붉은색</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 items-center">
                    <div className="p-3 bg-background rounded border">
                      <strong>메틸오렌지</strong>
                      <p className="text-sm text-muted-foreground">산성에서 색 변화</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded border border-red-200 text-center">
                      <span className="text-red-600 font-bold">빨간색</span>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded border border-yellow-200 text-center">
                      <span className="text-yellow-600 font-bold">노란색</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 items-center">
                    <div className="p-3 bg-background rounded border">
                      <strong>BTB</strong>
                      <p className="text-sm text-muted-foreground">(브로모티몰블루)</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded border border-yellow-200 text-center">
                      <span className="text-yellow-600 font-bold">노란색</span>
                    </div>
                    <div className="p-3 bg-blue-50 rounded border border-blue-200 text-center">
                      <span className="text-blue-600 font-bold">파란색</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-bold mb-2">🧪 실험 시 주의사항</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>지시약은 소량만 사용 (2-3방울)</li>
                    <li>지시약을 너무 많이 넣으면 색 변화를 정확히 관찰하기 어려움</li>
                    <li>각 지시약마다 색 변화 pH 범위가 다름</li>
                    <li>실험 후에는 폐액을 따로 수거</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 중화반응 */}
          <TabsContent value="neutralization">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5" />
                  중화반응
                </CardTitle>
                <CardDescription>
                  산과 염기가 만나 물과 염을 생성하는 반응
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-gradient-to-r from-red-50 to-blue-50 rounded-lg border">
                  <h3 className="text-xl font-bold mb-4 text-center">중화반응 화학식</h3>
                  <div className="text-center text-lg font-mono">
                    <span className="text-red-600">H⁺</span> + 
                    <span className="text-blue-600 ml-2">OH⁻</span> → 
                    <span className="text-green-600 ml-2">H₂O</span>
                  </div>
                  <p className="text-center mt-2 text-muted-foreground">산 + 염기 → 물 + 염</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">온도 변화</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-red-500" />
                          <span>온도 상승 관찰</span>
                        </div>
                        <p className="text-sm">중화반응은 <strong>발열반응</strong>으로 열이 발생합니다.</p>
                        <div className="p-3 bg-orange-50 rounded border border-orange-200">
                          <p className="text-sm"><strong>이유:</strong> H⁺와 OH⁻가 결합하여 물을 만들 때 에너지가 방출됩니다.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">부피 변화</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <TestTube className="h-4 w-4 text-blue-500" />
                          <span>전체 부피 감소</span>
                        </div>
                        <p className="text-sm">이론적으로는 부피가 <strong>약간 감소</strong>합니다.</p>
                        <div className="p-3 bg-blue-50 rounded border border-blue-200">
                          <p className="text-sm"><strong>이유:</strong> 이온들이 물 분자를 형성하면서 부피가 줄어듭니다.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border border-red-200 rounded bg-red-50">
                    <h4 className="font-bold text-red-700">반응 전 (산성)</h4>
                    <div className="my-3">
                      <div className="w-full bg-red-200 rounded-full h-3">
                        <div className="bg-red-500 h-3 rounded-full" style={{width: "20%"}}></div>
                      </div>
                      <p className="text-sm mt-1">pH &lt; 7</p>
                    </div>
                    <Badge variant="destructive">산성</Badge>
                  </div>

                  <div className="text-center p-4 border border-green-200 rounded bg-green-50">
                    <h4 className="font-bold text-green-700">중화점</h4>
                    <div className="my-3">
                      <div className="w-full bg-green-200 rounded-full h-3">
                        <div className="bg-green-500 h-3 rounded-full" style={{width: "50%"}}></div>
                      </div>
                      <p className="text-sm mt-1">pH = 7</p>
                    </div>
                    <Badge className="bg-green-500">중성</Badge>
                  </div>

                  <div className="text-center p-4 border border-blue-200 rounded bg-blue-50">
                    <h4 className="font-bold text-blue-700">반응 후 (염기성)</h4>
                    <div className="my-3">
                      <div className="w-full bg-blue-200 rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full" style={{width: "80%"}}></div>
                      </div>
                      <p className="text-sm mt-1">pH &gt; 7</p>
                    </div>
                    <Badge variant="secondary">염기성</Badge>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-bold mb-3">📊 중화반응의 특징</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>• 전기전도도:</strong> 중화점에서 최소가 됩니다</p>
                      <p><strong>• pH 변화:</strong> 급격한 변화 구간이 있습니다</p>
                    </div>
                    <div>
                      <p><strong>• 열 발생:</strong> 발열반응으로 온도가 상승합니다</p>
                      <p><strong>• 지시약:</strong> 중화점에서 색이 변합니다</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 일상생활 */}
          <TabsContent value="daily-life">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>🏠 가정에서의 중화반응</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 border border-green-200 rounded bg-green-50">
                    <h4 className="font-bold text-green-700">제산제 복용</h4>
                    <p className="text-sm mt-1">위산(HCl) + 제산제(Mg(OH)₂) → 중화</p>
                    <p className="text-xs text-muted-foreground">위산과다로 인한 속쓰림 완화</p>
                  </div>
                  
                  <div className="p-3 border border-blue-200 rounded bg-blue-50">
                    <h4 className="font-bold text-blue-700">베이킹소다 사용</h4>
                    <p className="text-sm mt-1">산성 냄새 제거, 청소에 활용</p>
                    <p className="text-xs text-muted-foreground">NaHCO₃가 산을 중화</p>
                  </div>

                  <div className="p-3 border border-purple-200 rounded bg-purple-50">
                    <h4 className="font-bold text-purple-700">치약 사용</h4>
                    <p className="text-sm mt-1">구강 내 산성 환경 중화</p>
                    <p className="text-xs text-muted-foreground">충치 예방에 도움</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>🌍 환경에서의 중화반응</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 border border-orange-200 rounded bg-orange-50">
                    <h4 className="font-bold text-orange-700">산성비 중화</h4>
                    <p className="text-sm mt-1">석회석(CaCO₃)으로 토양 중화</p>
                    <p className="text-xs text-muted-foreground">농업에서 토양 pH 조절</p>
                  </div>
                  
                  <div className="p-3 border border-cyan-200 rounded bg-cyan-50">
                    <h4 className="font-bold text-cyan-700">폐수 처리</h4>
                    <p className="text-sm mt-1">산업폐수의 pH 조절</p>
                    <p className="text-xs text-muted-foreground">환경오염 방지</p>
                  </div>

                  <div className="p-3 border border-red-200 rounded bg-red-50">
                    <h4 className="font-bold text-red-700">화재 진압</h4>
                    <p className="text-sm mt-1">산 화재 시 염기성 물질 사용</p>
                    <p className="text-xs text-muted-foreground">화학적 중화로 진압</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>🍯 음식에서의 중화반응</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-3 border rounded">
                      <h4 className="font-bold">빵 만들기</h4>
                      <p className="text-sm mt-1">베이킹소다 + 산성 재료</p>
                      <p className="text-xs text-muted-foreground">CO₂ 발생으로 빵이 부풀어 오름</p>
                    </div>
                    
                    <div className="p-3 border rounded">
                      <h4 className="font-bold">김치 담그기</h4>
                      <p className="text-sm mt-1">소금으로 pH 조절</p>
                      <p className="text-xs text-muted-foreground">적절한 발효 환경 조성</p>
                    </div>

                    <div className="p-3 border rounded">
                      <h4 className="font-bold">과일 보관</h4>
                      <p className="text-sm mt-1">레몬즙으로 산화 방지</p>
                      <p className="text-xs text-muted-foreground">산성 환경에서 변색 방지</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 퀴즈 */}
          <TabsContent value="quiz">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  산과 염기 복습 퀴즈
                </CardTitle>
                <CardDescription>
                  학습한 내용을 확인해보세요 ({quizQuestions.length}문제)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!quizCompleted ? (
                  <div className="space-y-6">
                    <Progress value={(Object.keys(quizAnswers).length / quizQuestions.length) * 100} className="w-full" />
                    
                    {quizQuestions.map((question, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h3 className="font-bold mb-3">{index + 1}. {question.question}</h3>
                        <RadioGroup
                          value={quizAnswers[index] || ""}
                          onValueChange={(value) => setQuizAnswers(prev => ({...prev, [index]: value}))}
                        >
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-2">
                              <RadioGroupItem value={option} id={`q${index}o${optionIndex}`} />
                              <Label htmlFor={`q${index}o${optionIndex}`}>{option}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    ))}
                    
                    <Button 
                      onClick={submitQuiz} 
                      disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                      className="w-full"
                    >
                      퀴즈 제출하기
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-6">
                    <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">퀴즈 완료!</h3>
                      <p className="text-xl">
                        점수: <span className="font-bold text-primary">{quizScore}</span> / {quizQuestions.length}
                      </p>
                      <div className="mt-4">
                        <Progress value={(quizScore / quizQuestions.length) * 100} className="w-full" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold text-lg">정답 확인</h4>
                      {quizQuestions.map((question, index) => (
                        <div key={index} className="p-4 border rounded-lg text-left">
                          <p className="font-bold mb-2">{index + 1}. {question.question}</p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">내 답안: </span>
                            <span className={quizAnswers[index] === question.correct ? "text-green-600 font-bold" : "text-red-600"}>
                              {quizAnswers[index] || "미답"}
                            </span>
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">정답: </span>
                            <span className="text-green-600 font-bold">{question.correct}</span>
                          </p>
                        </div>
                      ))}
                    </div>

                    <Button onClick={resetQuiz} variant="outline" className="w-full">
                      다시 풀어보기
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
