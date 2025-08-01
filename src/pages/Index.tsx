import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, Beaker, Thermometer, Zap, TestTube, BookOpen, Brain, Play, Pause, RotateCcw } from "lucide-react";

const Index = () => {
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedIndicator, setSelectedIndicator] = useState<string>("");
  const [neutralizationStep, setNeutralizationStep] = useState(0);
  const [temperatureValue, setTemperatureValue] = useState(25);
  const [showIons, setShowIons] = useState(false);

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

  const startAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 3000);
  };

  const simulateNeutralization = () => {
    setNeutralizationStep(0);
    setTemperatureValue(25);
    
    const steps = [0, 1, 2, 3];
    steps.forEach((step, index) => {
      setTimeout(() => {
        setNeutralizationStep(step);
        setTemperatureValue(25 + (step * 8));
      }, index * 1000);
    });
  };

  const toggleIonAnimation = () => {
    setShowIons(!showIons);
  };

  const getIndicatorColor = (indicator: string, solution: string) => {
    const colors = {
      litmus: {
        acid: 'bg-red-500',
        base: 'bg-blue-500',
        neutral: 'bg-purple-300'
      },
      phenolphthalein: {
        acid: 'bg-gray-100',
        base: 'bg-pink-500',
        neutral: 'bg-gray-100'
      },
      methyl: {
        acid: 'bg-red-500',
        base: 'bg-yellow-400',
        neutral: 'bg-orange-300'
      }
    };
    return colors[indicator as keyof typeof colors]?.[solution as keyof typeof colors.litmus] || 'bg-gray-300';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (showIons) {
        // 이온 애니메이션 트리거
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [showIons]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 relative overflow-hidden">
        {/* 배경 애니메이션 요소들 */}
        <div className="absolute inset-0">
          <div className="absolute top-4 left-1/4 w-3 h-3 bg-white/20 rounded-full animate-float"></div>
          <div className="absolute top-12 right-1/3 w-2 h-2 bg-white/30 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-8 left-1/2 w-4 h-4 bg-white/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4 animate-fade-in">
            <Beaker className="h-8 w-8 animate-bounce-gentle" />
            <h1 className="text-4xl font-bold">산과 염기</h1>
          </div>
          <p className="text-xl opacity-90 animate-fade-in" style={{animationDelay: '0.2s'}}>고등학교 1학년 화학 학습</p>
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
              <Card className="interactive-card animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="h-5 w-5 text-red-500 animate-bounce-gentle" />
                    산(Acid)의 성질
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 hover-scale p-2 rounded">
                    <Badge variant="destructive" className="animate-glow">신맛</Badge>
                    <p>레몬, 식초와 같은 신맛을 가집니다.</p>
                  </div>
                  <div className="space-y-2 hover-scale p-2 rounded">
                    <Badge variant="destructive">리트머스 시험지</Badge>
                    <p>파란색 리트머스 시험지를 빨간색으로 변화시킵니다.</p>
                  </div>
                  <div className="space-y-2 hover-scale p-2 rounded">
                    <Badge variant="destructive">금속과 반응</Badge>
                    <p>아연, 철 등과 반응하여 수소 기체를 발생시킵니다.</p>
                  </div>
                  <div className="space-y-2 hover-scale p-2 rounded">
                    <Badge variant="destructive">부식성</Badge>
                    <p>농도가 진할 때 금속이나 피부를 부식시킵니다.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="interactive-card animate-fade-in" style={{animationDelay: '0.2s'}}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="h-5 w-5 text-blue-500 animate-bounce-gentle" style={{animationDelay: '0.5s'}} />
                    염기(Base)의 성질
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 hover-scale p-2 rounded">
                    <Badge variant="secondary">쓴맛</Badge>
                    <p>쓴맛을 가지며, 미끄러운 느낌이 납니다.</p>
                  </div>
                  <div className="space-y-2 hover-scale p-2 rounded">
                    <Badge variant="secondary">리트머스 시험지</Badge>
                    <p>빨간색 리트머스 시험지를 파란색으로 변화시킵니다.</p>
                  </div>
                  <div className="space-y-2 hover-scale p-2 rounded">
                    <Badge variant="secondary">단백질 분해</Badge>
                    <p>단백질을 분해하는 성질이 있습니다.</p>
                  </div>
                  <div className="space-y-2 hover-scale p-2 rounded">
                    <Badge variant="secondary">부식성</Badge>
                    <p>강염기는 피부나 옷을 손상시킬 수 있습니다.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 아레니우스 정의 */}
          <TabsContent value="definition">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 animate-bounce-gentle" />
                  아레니우스의 산-염기 정의
                </CardTitle>
                <CardDescription>
                  스웨덴의 화학자 아레니우스(Arrhenius)가 제시한 정의
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 border-2 border-red-200 rounded-lg bg-red-50 interactive-card animate-fade-in">
                    <h3 className="text-xl font-bold mb-3 text-red-700">산 (Acid)</h3>
                    <p className="text-lg mb-4">수용액에서 <strong className="animate-pulse">수소 이온(H⁺)</strong>을 내놓는 물질</p>
                    <div className="space-y-2">
                      <p className="font-mono text-sm bg-white p-2 rounded">HCl → H⁺ + Cl⁻</p>
                      <p className="font-mono text-sm bg-white p-2 rounded">HNO₃ → H⁺ + NO₃⁻</p>
                      <p className="font-mono text-sm bg-white p-2 rounded">H₂SO₄ → 2H⁺ + SO₄²⁻</p>
                    </div>
                  </div>
                  
                  <div className="p-6 border-2 border-blue-200 rounded-lg bg-blue-50 interactive-card animate-fade-in" style={{animationDelay: '0.2s'}}>
                    <h3 className="text-xl font-bold mb-3 text-blue-700">염기 (Base)</h3>
                    <p className="text-lg mb-4">수용액에서 <strong className="animate-pulse">수산화 이온(OH⁻)</strong>을 내놓는 물질</p>
                    <div className="space-y-2">
                      <p className="font-mono text-sm bg-white p-2 rounded">NaOH → Na⁺ + OH⁻</p>
                      <p className="font-mono text-sm bg-white p-2 rounded">KOH → K⁺ + OH⁻</p>
                      <p className="font-mono text-sm bg-white p-2 rounded">Ca(OH)₂ → Ca²⁺ + 2OH⁻</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg animate-fade-in" style={{animationDelay: '0.4s'}}>
                  <h4 className="font-bold mb-2">💡 핵심 포인트</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li className="hover-scale">산: H⁺ 이온을 내놓음 (수소 공여체)</li>
                    <li className="hover-scale">염기: OH⁻ 이온을 내놓음 (수소 받개체)</li>
                    <li className="hover-scale">물의 존재가 필수적 (수용액에서만 정의)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 전기 전도성 */}
          <TabsContent value="conductivity">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 animate-glow" />
                  산과 염기의 전기 전도성
                </CardTitle>
                <div className="flex gap-2 mt-4">
                  <Button onClick={toggleIonAnimation} variant="outline" size="sm">
                    {showIons ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                    이온 움직임 {showIons ? '정지' : '시작'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="border-gray-300 interactive-card">
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg">순수한 물</CardTitle>
                      {showIons && (
                        <div className="relative h-12 beaker-animation">
                          <div className="absolute inset-0 bg-blue-100 rounded opacity-50"></div>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                        <div className="bg-gray-400 h-4 rounded-full" style={{width: "5%"}}></div>
                      </div>
                      <p className="text-sm text-muted-foreground">전기전도도: 매우 낮음</p>
                      <p className="text-xs mt-2">이온이 거의 없음</p>
                    </CardContent>
                  </Card>

                  <Card className="border-red-300 interactive-card">
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg text-red-600">산 용액</CardTitle>
                      {showIons && (
                        <div className="relative h-12 beaker-animation">
                          <div className="absolute inset-0 bg-red-100 rounded opacity-50"></div>
                          <div className={`ion-particle bg-red-500 top-2 left-2 ${isAnimating ? 'animate-bounce-gentle' : ''}`}></div>
                          <div className={`ion-particle bg-blue-500 top-6 right-3 ${isAnimating ? 'animate-bounce-gentle' : ''}`} style={{animationDelay: '0.2s'}}></div>
                          <div className={`ion-particle bg-red-500 bottom-2 left-1/2 ${isAnimating ? 'animate-bounce-gentle' : ''}`} style={{animationDelay: '0.4s'}}></div>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                        <div className="bg-red-500 h-4 rounded-full" style={{width: "80%"}}></div>
                      </div>
                      <p className="text-sm text-muted-foreground">전기전도도: 높음</p>
                      <p className="text-xs mt-2">H⁺와 음이온 존재</p>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-300 interactive-card">
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg text-blue-600">염기 용액</CardTitle>
                      {showIons && (
                        <div className="relative h-12 beaker-animation">
                          <div className="absolute inset-0 bg-blue-100 rounded opacity-50"></div>
                          <div className={`ion-particle bg-blue-500 top-1 right-2 ${isAnimating ? 'animate-bounce-gentle' : ''}`}></div>
                          <div className={`ion-particle bg-yellow-500 top-4 left-4 ${isAnimating ? 'animate-bounce-gentle' : ''}`} style={{animationDelay: '0.3s'}}></div>
                          <div className={`ion-particle bg-blue-500 bottom-3 right-1/2 ${isAnimating ? 'animate-bounce-gentle' : ''}`} style={{animationDelay: '0.1s'}}></div>
                        </div>
                      )}
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
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TestTube className="h-5 w-5 animate-color-change" />
                  지시약의 색 변화
                </CardTitle>
                <CardDescription>
                  산성과 염기성을 구별하는 지시약들의 색 변화
                </CardDescription>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button 
                    onClick={() => setSelectedIndicator(selectedIndicator === 'litmus' ? '' : 'litmus')} 
                    variant={selectedIndicator === 'litmus' ? 'default' : 'outline'} 
                    size="sm"
                  >
                    리트머스 실험
                  </Button>
                  <Button 
                    onClick={() => setSelectedIndicator(selectedIndicator === 'phenol' ? '' : 'phenol')} 
                    variant={selectedIndicator === 'phenol' ? 'default' : 'outline'} 
                    size="sm"
                  >
                    페놀프탈레인 실험
                  </Button>
                  <Button 
                    onClick={() => setSelectedIndicator(selectedIndicator === 'methyl' ? '' : 'methyl')} 
                    variant={selectedIndicator === 'methyl' ? 'default' : 'outline'} 
                    size="sm"
                  >
                    메틸오렌지 실험
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedIndicator && (
                  <div className="p-4 bg-gradient-to-r from-red-50 via-purple-50 to-blue-50 rounded-lg border animate-scale-in">
                    <h4 className="font-bold mb-4 text-center">🧪 {selectedIndicator === 'litmus' ? '리트머스' : selectedIndicator === 'phenol' ? '페놀프탈레인' : '메틸오렌지'} 색 변화 실험</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="space-y-2">
                        <p className="font-bold">산성 용액</p>
                        <div className={`color-indicator mx-auto ${getIndicatorColor(selectedIndicator, 'acid')} animate-scale-in`}></div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-bold">중성 용액</p>
                        <div className={`color-indicator mx-auto ${getIndicatorColor(selectedIndicator, 'neutral')} animate-scale-in`} style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-bold">염기성 용액</p>
                        <div className={`color-indicator mx-auto ${getIndicatorColor(selectedIndicator, 'base')} animate-scale-in`} style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="grid gap-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center font-bold p-2 bg-muted rounded">지시약</div>
                    <div className="text-center font-bold p-2 bg-red-100 rounded text-red-700">산성 용액</div>
                    <div className="text-center font-bold p-2 bg-blue-100 rounded text-blue-700">염기성 용액</div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 items-center">
                    <div className="p-3 bg-background rounded border hover-scale">
                      <strong>리트머스 시험지</strong>
                      <p className="text-sm text-muted-foreground">가장 기본적인 지시약</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded border border-red-200 text-center hover-scale">
                      <span className="text-red-600 font-bold animate-pulse">빨간색</span>
                    </div>
                    <div className="p-3 bg-blue-50 rounded border border-blue-200 text-center hover-scale">
                      <span className="text-blue-600 font-bold animate-pulse">파란색</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 items-center">
                    <div className="p-3 bg-background rounded border hover-scale">
                      <strong>페놀프탈레인</strong>
                      <p className="text-sm text-muted-foreground">염기성에서만 색 변화</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded border border-gray-200 text-center hover-scale">
                      <span className="text-gray-600 font-bold">무색</span>
                    </div>
                    <div className="p-3 bg-pink-50 rounded border border-pink-200 text-center hover-scale">
                      <span className="text-pink-600 font-bold animate-pulse">붉은색</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 items-center">
                    <div className="p-3 bg-background rounded border hover-scale">
                      <strong>메틸오렌지</strong>
                      <p className="text-sm text-muted-foreground">산성에서 색 변화</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded border border-red-200 text-center hover-scale">
                      <span className="text-red-600 font-bold animate-pulse">빨간색</span>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded border border-yellow-200 text-center hover-scale">
                      <span className="text-yellow-600 font-bold animate-pulse">노란색</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 items-center">
                    <div className="p-3 bg-background rounded border hover-scale">
                      <strong>BTB</strong>
                      <p className="text-sm text-muted-foreground">(브로모티몰블루)</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded border border-yellow-200 text-center hover-scale">
                      <span className="text-yellow-600 font-bold animate-pulse">노란색</span>
                    </div>
                    <div className="p-3 bg-blue-50 rounded border border-blue-200 text-center hover-scale">
                      <span className="text-blue-600 font-bold animate-pulse">파란색</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg animate-fade-in">
                  <h4 className="font-bold mb-2">🧪 실험 시 주의사항</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li className="hover-scale">지시약은 소량만 사용 (2-3방울)</li>
                    <li className="hover-scale">지시약을 너무 많이 넣으면 색 변화를 정확히 관찰하기 어려움</li>
                    <li className="hover-scale">각 지시약마다 색 변화 pH 범위가 다름</li>
                    <li className="hover-scale">실험 후에는 폐액을 따로 수거</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 중화반응 */}
          <TabsContent value="neutralization">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 animate-bounce-gentle" />
                  중화반응
                </CardTitle>
                <CardDescription>
                  산과 염기가 만나 물과 염을 생성하는 반응
                </CardDescription>
                <div className="flex gap-2 mt-4">
                  <Button onClick={simulateNeutralization} variant="outline" size="sm">
                    <Play className="h-4 w-4 mr-1" />
                    중화반응 시뮬레이션
                  </Button>
                  <Button onClick={() => {setNeutralizationStep(0); setTemperatureValue(25);}} variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-1" />
                    초기화
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {neutralizationStep > 0 && (
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border animate-scale-in">
                    <h4 className="font-bold mb-3 text-center">🌡️ 실시간 중화반응 관찰</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="font-bold mb-2">온도 변화</p>
                        <div className="relative w-20 h-40 mx-auto bg-white rounded-full border-2 border-gray-300">
                          <div 
                            className={`absolute bottom-0 left-0 right-0 bg-red-500 rounded-full temperature-bar`}
                            style={{height: `${(temperatureValue - 20) * 2}%`}}
                          ></div>
                          <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-sm font-bold">
                            {temperatureValue}°C
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="font-bold mb-2">반응 단계</p>
                        <div className="space-y-2">
                          <div className={`p-2 rounded ${neutralizationStep >= 1 ? 'bg-green-100 text-green-700' : 'bg-gray-100'} transition-all duration-500`}>
                            1단계: 산 투입
                          </div>
                          <div className={`p-2 rounded ${neutralizationStep >= 2 ? 'bg-green-100 text-green-700' : 'bg-gray-100'} transition-all duration-500`}>
                            2단계: 염기 투입
                          </div>
                          <div className={`p-2 rounded ${neutralizationStep >= 3 ? 'bg-green-100 text-green-700' : 'bg-gray-100'} transition-all duration-500`}>
                            3단계: 중화 완료
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="p-6 bg-gradient-to-r from-red-50 to-blue-50 rounded-lg border animate-fade-in">
                  <h3 className="text-xl font-bold mb-4 text-center">중화반응 화학식</h3>
                  <div className="text-center text-lg font-mono">
                    <span className="text-red-600 animate-pulse">H⁺</span> + 
                    <span className="text-blue-600 ml-2 animate-pulse">OH⁻</span> → 
                    <span className="text-green-600 ml-2 animate-bounce-gentle">H₂O</span>
                  </div>
                  <p className="text-center mt-2 text-muted-foreground">산 + 염기 → 물 + 염</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="interactive-card">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-red-500 animate-bounce-gentle" />
                        온도 변화
                      </CardTitle>
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

                  <Card className="interactive-card">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TestTube className="h-4 w-4 text-blue-500 animate-float" />
                        부피 변화
                      </CardTitle>
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
                  <div className="text-center p-4 border border-red-200 rounded bg-red-50 interactive-card animate-fade-in">
                    <h4 className="font-bold text-red-700">반응 전 (산성)</h4>
                    <div className="my-3">
                      <div className="w-full bg-red-200 rounded-full h-3">
                        <div className="bg-red-500 h-3 rounded-full animate-pulse" style={{width: "20%"}}></div>
                      </div>
                      <p className="text-sm mt-1">pH &lt; 7</p>
                    </div>
                    <Badge variant="destructive">산성</Badge>
                  </div>

                  <div className="text-center p-4 border border-green-200 rounded bg-green-50 interactive-card animate-fade-in" style={{animationDelay: '0.2s'}}>
                    <h4 className="font-bold text-green-700">중화점</h4>
                    <div className="my-3">
                      <div className="w-full bg-green-200 rounded-full h-3">
                        <div className="bg-green-500 h-3 rounded-full animate-glow" style={{width: "50%"}}></div>
                      </div>
                      <p className="text-sm mt-1">pH = 7</p>
                    </div>
                    <Badge className="bg-green-500">중성</Badge>
                  </div>

                  <div className="text-center p-4 border border-blue-200 rounded bg-blue-50 interactive-card animate-fade-in" style={{animationDelay: '0.4s'}}>
                    <h4 className="font-bold text-blue-700">반응 후 (염기성)</h4>
                    <div className="my-3">
                      <div className="w-full bg-blue-200 rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full animate-pulse" style={{width: "80%"}}></div>
                      </div>
                      <p className="text-sm mt-1">pH &gt; 7</p>
                    </div>
                    <Badge variant="secondary">염기성</Badge>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg animate-fade-in">
                  <h4 className="font-bold mb-3">📊 중화반응의 특징</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="hover-scale"><strong>• 전기전도도:</strong> 중화점에서 최소가 됩니다</p>
                      <p className="hover-scale"><strong>• pH 변화:</strong> 급격한 변화 구간이 있습니다</p>
                    </div>
                    <div>
                      <p className="hover-scale"><strong>• 열 발생:</strong> 발열반응으로 온도가 상승합니다</p>
                      <p className="hover-scale"><strong>• 지시약:</strong> 중화점에서 색이 변합니다</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 일상생활 */}
          <TabsContent value="daily-life">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="interactive-card animate-fade-in">
                <CardHeader>
                  <CardTitle>🏠 가정에서의 중화반응</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 border border-green-200 rounded bg-green-50 hover-scale">
                    <h4 className="font-bold text-green-700 animate-pulse">제산제 복용</h4>
                    <p className="text-sm mt-1">위산(HCl) + 제산제(Mg(OH)₂) → 중화</p>
                    <p className="text-xs text-muted-foreground">위산과다로 인한 속쓰림 완화</p>
                  </div>
                  
                  <div className="p-3 border border-blue-200 rounded bg-blue-50 hover-scale">
                    <h4 className="font-bold text-blue-700">베이킹소다 사용</h4>
                    <p className="text-sm mt-1">산성 냄새 제거, 청소에 활용</p>
                    <p className="text-xs text-muted-foreground">NaHCO₃가 산을 중화</p>
                  </div>

                  <div className="p-3 border border-purple-200 rounded bg-purple-50 hover-scale">
                    <h4 className="font-bold text-purple-700">치약 사용</h4>
                    <p className="text-sm mt-1">구강 내 산성 환경 중화</p>
                    <p className="text-xs text-muted-foreground">충치 예방에 도움</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="interactive-card animate-fade-in" style={{animationDelay: '0.2s'}}>
                <CardHeader>
                  <CardTitle>🌍 환경에서의 중화반응</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 border border-orange-200 rounded bg-orange-50 hover-scale">
                    <h4 className="font-bold text-orange-700 animate-pulse">산성비 중화</h4>
                    <p className="text-sm mt-1">석회석(CaCO₃)으로 토양 중화</p>
                    <p className="text-xs text-muted-foreground">농업에서 토양 pH 조절</p>
                  </div>
                  
                  <div className="p-3 border border-cyan-200 rounded bg-cyan-50 hover-scale">
                    <h4 className="font-bold text-cyan-700">폐수 처리</h4>
                    <p className="text-sm mt-1">산업폐수의 pH 조절</p>
                    <p className="text-xs text-muted-foreground">환경오염 방지</p>
                  </div>

                  <div className="p-3 border border-red-200 rounded bg-red-50 hover-scale">
                    <h4 className="font-bold text-red-700">화재 진압</h4>
                    <p className="text-sm mt-1">산 화재 시 염기성 물질 사용</p>
                    <p className="text-xs text-muted-foreground">화학적 중화로 진압</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 interactive-card animate-fade-in" style={{animationDelay: '0.4s'}}>
                <CardHeader>
                  <CardTitle>🍯 음식에서의 중화반응</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-3 border rounded hover-scale">
                      <h4 className="font-bold animate-bounce-gentle">빵 만들기</h4>
                      <p className="text-sm mt-1">베이킹소다 + 산성 재료</p>
                      <p className="text-xs text-muted-foreground">CO₂ 발생으로 빵이 부풀어 오름</p>
                    </div>
                    
                    <div className="p-3 border rounded hover-scale">
                      <h4 className="font-bold">김치 담그기</h4>
                      <p className="text-sm mt-1">소금으로 pH 조절</p>
                      <p className="text-xs text-muted-foreground">적절한 발효 환경 조성</p>
                    </div>

                    <div className="p-3 border rounded hover-scale">
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
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 animate-glow" />
                  산과 염기 복습 퀴즈
                </CardTitle>
                <CardDescription>
                  학습한 내용을 확인해보세요 ({quizQuestions.length}문제)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!quizCompleted ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Progress value={(Object.keys(quizAnswers).length / quizQuestions.length) * 100} className="flex-1" />
                      <span className="text-sm font-bold">{Object.keys(quizAnswers).length}/{quizQuestions.length}</span>
                    </div>
                    
                    {quizQuestions.map((question, index) => (
                      <div key={index} className="p-4 border rounded-lg interactive-card animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                        <h3 className="font-bold mb-3 hover-scale">{index + 1}. {question.question}</h3>
                        <RadioGroup
                          value={quizAnswers[index] || ""}
                          onValueChange={(value) => setQuizAnswers(prev => ({...prev, [index]: value}))}
                        >
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-2 hover-scale p-2 rounded">
                              <RadioGroupItem value={option} id={`q${index}o${optionIndex}`} />
                              <Label htmlFor={`q${index}o${optionIndex}`} className="cursor-pointer">{option}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    ))}
                    
                    <Button 
                      onClick={submitQuiz} 
                      disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                      className="w-full hover-scale"
                    >
                      {Object.keys(quizAnswers).length < quizQuestions.length ? 
                        `${quizQuestions.length - Object.keys(quizAnswers).length}문제 더 답해주세요` : 
                        '퀴즈 제출하기 🚀'}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-6">
                    <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg animate-scale-in">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4 animate-bounce-gentle" />
                      <h3 className="text-2xl font-bold mb-2 animate-fade-in">퀴즈 완료!</h3>
                      <p className="text-xl animate-fade-in" style={{animationDelay: '0.2s'}}>
                        점수: <span className="font-bold text-primary animate-pulse">{quizScore}</span> / {quizQuestions.length}
                      </p>
                      <div className="mt-4">
                        <Progress value={(quizScore / quizQuestions.length) * 100} className="w-full" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold text-lg animate-fade-in">정답 확인</h4>
                      {quizQuestions.map((question, index) => (
                        <div key={index} className="p-4 border rounded-lg text-left hover-scale animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
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

                    <Button onClick={resetQuiz} variant="outline" className="w-full hover-scale animate-fade-in">
                      <RotateCcw className="h-4 w-4 mr-2" />
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
