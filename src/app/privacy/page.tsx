import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "隐私政策 - 悠居",
  description: "悠居平台隐私政策",
};

const SECTIONS = [
  {
    title: "一、我们收集的信息",
    content:
      "为向您提供服务,我们可能收集您主动提供的信息(如注册时的昵称、邮箱、手机号)以及使用服务过程中产生的信息(如浏览记录、预订记录、设备信息)。我们遵循最小必要原则,不收集与服务无关的信息。",
  },
  {
    title: "二、信息的使用",
    content:
      "我们使用收集的信息用于:提供房源搜索与预订服务、账号安全保障、客户服务与纠纷处理、改进产品体验,以及在获得您同意的情况下向您推送可能感兴趣的内容。",
  },
  {
    title: "三、信息的共享与披露",
    content:
      "除以下情形外,我们不会向第三方共享您的个人信息:(1)完成预订所必需(如向房东提供入住人信息);(2)获得您的明确同意;(3)法律法规要求或司法机关依法调取。",
  },
  {
    title: "四、信息的存储与保护",
    content:
      "我们采取加密传输、访问控制等安全措施保护您的个人信息,防止未经授权的访问、披露或损毁。您的信息将存储于中华人民共和国境内的服务器。",
  },
  {
    title: "五、您的权利",
    content:
      "您有权查询、更正、删除您的个人信息,有权撤回授权同意或注销账号。您可以在个人中心自行操作,或联系我们协助处理。",
  },
  {
    title: "六、Cookie 的使用",
    content:
      "为提升您的使用体验,我们可能使用 Cookie 及类似技术记录您的偏好设置和登录状态。您可以通过浏览器设置管理或清除 Cookie,但这可能影响部分功能的正常使用。",
  },
  {
    title: "七、联系我们",
    content:
      "如您对本政策或个人信息保护有任何疑问、意见或建议,请通过以下方式联系我们:mingxinai@agentmail.to 或 13426086861@139.com,我们将在15个工作日内予以回复。",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <section className="bg-gradient-to-br from-brand-green to-brand-green-dark py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold">隐私政策</h1>
          <p className="mt-3 text-white/80">
            {BRAND.name}平台隐私政策 · 更新日期:2026年7月
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="space-y-6 rounded-2xl border border-border bg-white p-8 shadow-sm">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="mb-2 font-serif text-xl font-bold text-foreground">
                {s.title}
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                {s.content}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
