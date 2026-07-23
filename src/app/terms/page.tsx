import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "用户协议 - 悠居",
  description: "悠居平台用户服务协议",
};

const SECTIONS = [
  {
    title: "一、协议的接受与修改",
    content:
      "欢迎使用悠居平台。您注册、登录或使用本平台服务,即表示您已阅读、理解并同意接受本协议的全部条款。我们可能根据业务发展需要适时修订本协议,修订后的协议将在平台公示,继续使用服务即视为接受修订内容。",
  },
  {
    title: "二、账号注册与使用",
    content:
      "您应提供真实、准确、完整的注册信息,并妥善保管账号和密码。因您自身原因导致的账号信息泄露及由此产生的损失,由您自行承担。您不得将账号转让、出借或出售给他人使用。",
  },
  {
    title: "三、平台服务",
    content:
      "悠居为旅居者与房东提供房源信息展示、预订撮合、社区交流等服务。平台展示的房源信息由房东提供,平台将尽合理努力进行审核,但请您在预订前自行核实相关信息。",
  },
  {
    title: "四、用户行为规范",
    content:
      "您在使用平台服务时应遵守法律法规,不得发布违法、虚假、侵权或不当内容,不得从事损害平台或其他用户合法权益的行为。违反规范的,平台有权删除相关内容、限制或终止您的账号使用。",
  },
  {
    title: "五、订单与退改",
    content:
      "预订订单的价格、入住时间、退改规则以下单页面展示为准。如遇纠纷,您可联系平台客服协助处理,平台将本着公平原则协调双方解决。",
  },
  {
    title: "六、免责声明",
    content:
      "因不可抗力、第三方原因或非平台过错导致的服务中断或损失,平台不承担责任,但将尽力协助您减少损失。平台对房东与旅居者之间的线下行为不承担连带责任。",
  },
  {
    title: "七、联系我们",
    content:
      "如您对本协议有任何疑问,或需要投诉与建议,请通过以下方式联系我们:mingxinai@agentmail.to 或 13426086861@139.com。",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <section className="bg-gradient-to-br from-brand-green to-brand-green-dark py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold">用户协议</h1>
          <p className="mt-3 text-white/80">
            {BRAND.name}平台用户服务协议 · 更新日期:2026年7月
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
