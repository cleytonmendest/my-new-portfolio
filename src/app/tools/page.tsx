import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { QrCode, Sparkles, Wrench } from 'lucide-react';

const tools = [
  {
    title: 'Gerador de QR Code',
    description: 'Gere QR codes personalizados para URLs, textos ou qualquer conteúdo',
    href: '/tools/qrcode',
    icon: QrCode,
  },
  {
    title: 'Gerador de Prompt IA',
    description: 'Aprimore seus prompts de IA com técnicas avançadas de engenharia de prompt',
    href: '/tools/prompt-generator',
    icon: Sparkles,
  },
];

export default function ToolsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Wrench className="h-8 w-8 text-[#E6972E]" />
          <h1 className="text-3xl font-bold">Ferramentas Pessoais</h1>
        </div>
        <p className="text-muted-foreground">
          Coleção de ferramentas úteis para facilitar o dia a dia
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link key={tool.href} href={tool.href}>
              <Card className="h-full transition-all hover:shadow-lg hover:border-[#E6972E]/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#E6972E]/10 p-2">
                      <Icon className="h-6 w-6 text-[#E6972E]" />
                    </div>
                    <CardTitle>{tool.title}</CardTitle>
                  </div>
                  <CardDescription className="pt-2">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
