# Ferramentas Pessoais

Rotas "escondidas" de ferramentas pessoais para facilitar o dia a dia.

## Como Acessar

Acesse diretamente pela URL: `https://seu-dominio.com/tools`

## Ferramentas Disponíveis

### 1. Gerador de QR Code (`/tools/qrcode`)
- Gera QR codes personalizados para URLs, textos ou qualquer conteúdo
- Personalização de tamanho, cores e nível de correção de erro
- Download em PNG
- Copiar para área de transferência

### 2. Gerador de Prompt IA (`/tools/prompt-generator`)
- Aprimore prompts de IA com técnicas avançadas
- Técnicas disponíveis:
  - Definir Role/Persona
  - Adicionar Contexto
  - Especificar Formato de Saída
  - Fornecer Exemplos
  - Definir Restrições
  - Pedir Raciocínio Passo a Passo
- Copiar prompt aprimorado

## Como Adicionar Nova Ferramenta

### 1. Criar a Página da Ferramenta

Crie um novo arquivo em `src/app/tools/[nome-da-ferramenta]/page.tsx`:

```tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MinhaFerramentaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Minha Ferramenta</h1>
        <p className="text-muted-foreground mt-2">
          Descrição da ferramenta
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conteúdo</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Seu conteúdo aqui */}
        </CardContent>
      </Card>
    </div>
  );
}
```

### 2. Adicionar à Lista de Ferramentas

Edite `src/app/tools/page.tsx` e adicione a nova ferramenta ao array `tools`:

```tsx
{
  title: 'Minha Ferramenta',
  description: 'Descrição curta da ferramenta',
  href: '/tools/minha-ferramenta',
  icon: IconName, // Importe de 'lucide-react'
},
```

### 3. Componentes Disponíveis

Você tem acesso a todos os componentes shadcn/ui:
- Button
- Card
- Input
- Textarea
- Label
- Select
- Checkbox
- E outros...

## Estrutura de Arquivos

```
src/app/tools/
├── layout.tsx              # Layout compartilhado
├── page.tsx                # Página index com lista
├── qrcode/
│   └── page.tsx           # Gerador de QR Code
├── prompt-generator/
│   └── page.tsx           # Gerador de Prompt IA
└── [sua-ferramenta]/
    └── page.tsx           # Sua nova ferramenta
```

## Bibliotecas Úteis

Algumas bibliotecas que podem ser úteis para novas ferramentas:

- **qrcode**: Gerar QR codes (já instalada)
- **react-hook-form**: Formulários complexos
- **zod**: Validação de dados
- **date-fns**: Manipulação de datas
- **chart.js / recharts**: Gráficos
- **pdf-lib**: Manipulação de PDFs
- **jszip**: Manipulação de arquivos ZIP

## Observações

- Todas as ferramentas são apenas em português (sem i18n)
- Use `'use client'` no topo dos arquivos que usam hooks ou interatividade
- O layout já inclui Navigation e Footer
- As rotas não aparecem no sitemap (robots: false no metadata)
- Não há autenticação, apenas URLs não divulgadas

## Exemplos de Ferramentas Futuras

Ideias para novas ferramentas:
- Conversor de unidades
- Gerador de senhas
- Calculadora de tempo entre datas
- Editor de JSON
- Gerador de Lorem Ipsum
- Compressor de imagens
- Conversor de cores (HEX, RGB, HSL)
- Calculadora de IMC
- Timer/Pomodoro
- Encurtador de URLs
