"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  Check,
  Image as ImageIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PROPERTY_TYPES, AMENITY_LABELS } from "@/lib/constants";

const TOTAL_STEPS = 4;

const stepLabels = ["基本信息", "房源详情", "定价设置", "上传照片"];

const destinationOptions = [
  "云南大理",
  "云南丽江",
  "云南西双版纳",
  "海南三亚",
  "海南海口",
  "广西桂林",
  "四川成都",
  "福建厦门",
  "浙江杭州",
  "贵州贵阳",
  "广东珠海",
  "山东青岛",
];

const amenityKeys = Object.keys(AMENITY_LABELS);

export default function NewPropertyPage() {
  const [step, setStep] = useState(1);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    "wifi",
    "kitchen",
    "ac",
    "washer",
  ]);

  const toggleAmenity = (key: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-brand-dark">发布新房源</h1>
      <p className="text-muted-foreground mt-1">
        填写房源信息，通过审核后即可上线
      </p>

      {/* Progress indicator */}
      <div className="mt-8 mb-8">
        <div className="flex items-center justify-between mb-3">
          {stepLabels.map((label, i) => {
            const stepNum = i + 1;
            const isActive = stepNum === step;
            const isDone = stepNum < step;
            return (
              <div
                key={label}
                className="flex flex-col items-center flex-1"
              >
                <div
                  className={`flex items-center justify-center size-9 rounded-full text-sm font-semibold transition-colors ${
                    isDone
                      ? "bg-brand-green text-white"
                      : isActive
                        ? "bg-brand-green text-white ring-4 ring-brand-green/20"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isDone ? <Check className="size-4" /> : stepNum}
                </div>
                <span
                  className={`text-xs mt-1.5 hidden sm:block ${
                    isActive || isDone
                      ? "text-brand-green font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
        {/* Progress bar */}
        <div className="relative h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-brand-green rounded-full transition-all duration-300"
            style={{ width: `${((step - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          {/* Step 1: Basic info */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-brand-dark">
                基本信息
              </h2>
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="text-sm font-medium text-foreground"
                >
                  房源标题
                </label>
                <Input
                  id="title"
                  placeholder="例如：大理古城·洱海畔悠然小院"
                />
                <p className="text-xs text-muted-foreground">
                  一个吸引人的标题能提升50%的点击率
                </p>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-foreground"
                >
                  房源描述
                </label>
                <textarea
                  id="description"
                  rows={5}
                  placeholder="描述你的房源特色、周边环境、适合人群等..."
                  className="flex w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 resize-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="property-type"
                    className="text-sm font-medium text-foreground"
                  >
                    房源类型
                  </label>
                  <select
                    id="property-type"
                    className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      请选择房源类型
                    </option>
                    {PROPERTY_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="destination"
                    className="text-sm font-medium text-foreground"
                  >
                    所在城市
                  </label>
                  <select
                    id="destination"
                    className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      请选择城市
                    </option>
                    {destinationOptions.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Property details */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-brand-dark">
                房源详情
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    卧室
                  </label>
                  <Input type="number" min={0} defaultValue={2} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    卫生间
                  </label>
                  <Input type="number" min={0} defaultValue={1} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    面积 (m²)
                  </label>
                  <Input type="number" min={0} defaultValue={85} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    最多入住
                  </label>
                  <Input type="number" min={1} defaultValue={4} />
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  配套设施
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {amenityKeys.map((key) => {
                    const selected = selectedAmenities.includes(key);
                    return (
                      <button
                        key={key}
                        onClick={() => toggleAmenity(key)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                          selected
                            ? "bg-brand-green/10 text-brand-green border border-brand-green/30"
                            : "bg-white border border-border text-muted-foreground hover:border-brand-green/30"
                        }`}
                      >
                        <div
                          className={`size-4 rounded border-2 flex items-center justify-center shrink-0 ${
                            selected
                              ? "bg-brand-green border-brand-green"
                              : "border-border"
                          }`}
                        >
                          {selected && (
                            <Check className="size-3 text-white" />
                          )}
                        </div>
                        {AMENITY_LABELS[key]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Pricing */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-brand-dark">
                定价设置
              </h2>
              <p className="text-sm text-muted-foreground">
                设置不同租期的价格，长租折扣能吸引更多旅居者
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-brand-cream/80">
                  <div className="flex-1">
                    <p className="font-medium text-brand-dark">周租价格</p>
                    <p className="text-xs text-muted-foreground">
                      7天起租 · 基准价
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">¥</span>
                    <Input
                      type="number"
                      className="w-28"
                      defaultValue={1200}
                    />
                    <span className="text-sm text-muted-foreground">/周</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-brand-cream/80">
                  <div className="flex-1">
                    <p className="font-medium text-brand-dark">月租价格</p>
                    <p className="text-xs text-muted-foreground">
                      30天起租 · 建议减20%
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">¥</span>
                    <Input
                      type="number"
                      className="w-28"
                      defaultValue={4200}
                    />
                    <span className="text-sm text-muted-foreground">/月</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-brand-cream/80">
                  <div className="flex-1">
                    <p className="font-medium text-brand-dark">季租价格</p>
                    <p className="text-xs text-muted-foreground">
                      90天起租 · 建议减35%
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">¥</span>
                    <Input
                      type="number"
                      className="w-28"
                      defaultValue={10500}
                    />
                    <span className="text-sm text-muted-foreground">/季</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  最短入住天数
                </label>
                <Input
                  type="number"
                  className="w-32"
                  min={7}
                  defaultValue={7}
                />
                <p className="text-xs text-muted-foreground">
                  悠居平台最低要求7天起租
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Photos */}
          {step === 4 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-brand-dark">
                上传照片
              </h2>
              <p className="text-sm text-muted-foreground">
                上传至少5张高质量照片，第一张将作为封面图
              </p>

              {/* Drag & drop zone */}
              <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-brand-green/40 transition-colors cursor-pointer">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center justify-center size-16 rounded-2xl bg-brand-green/10">
                    <Upload className="size-7 text-brand-green" />
                  </div>
                  <div>
                    <p className="font-medium text-brand-dark">
                      拖拽照片到这里，或点击上传
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      支持 JPG、PNG 格式，单张最大 10MB
                    </p>
                  </div>
                  <Button variant="outline" className="mt-2">
                    选择文件
                  </Button>
                </div>
              </div>

              {/* Preview thumbnails */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className="aspect-square rounded-xl bg-muted flex items-center justify-center border border-border"
                  >
                    <ImageIcon className="size-6 text-muted-foreground/40" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-6 pb-8">
        <Button
          variant="outline"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="gap-1"
        >
          <ChevronLeft className="size-4" />
          上一步
        </Button>

        {step < TOTAL_STEPS ? (
          <Button
            onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
            className="gap-1"
          >
            下一步
            <ChevronRight className="size-4" />
          </Button>
        ) : (
          <Button className="gap-2 px-6">
            <Check className="size-4" />
            发布房源
          </Button>
        )}
      </div>
    </div>
  );
}
