'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Copy, Check, Sparkles, Loader2, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface PromptOptions {
  addRole: boolean;
  addContext: boolean;
  addFormat: boolean;
  addExamples: boolean;
  addConstraints: boolean;
  addStepByStep: boolean;
}

interface QualityData {
  score: number;
  maxScore: number;
  rating: string;
  breakdown: {
    length: number;
    hasRole: number;
    hasStructure: number;
    hasExamples: number;
    hasConstraints: number;
    hasFormat: number;
  };
  suggestions: string[];
}

export default function PromptGeneratorPage() {
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [role, setRole] = useState('especialista');
  const [context, setContext] = useState('');
  const [format, setFormat] = useState('');
  const [examples, setExamples] = useState('');
  const [constraints, setConstraints] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [qualityData, setQualityData] = useState<QualityData | null>(null);
  const [targetModel, setTargetModel] = useState<'claude' | 'gpt' | 'gemini'>('claude');

  const [options, setOptions] = useState<PromptOptions>({
    addRole: true,
    addContext: false,
    addFormat: false,
    addExamples: false,
    addConstraints: false,
    addStepByStep: false,
  });

  const generatePrompt = async () => {
    if (!originalPrompt.trim()) {
      toast.error('Digite um prompt para melhorar');
      return;
    }

    setIsLoading(true);
    setEnhancedPrompt('');
    setQualityData(null);

    try {
      const response = await fetch('https://n8n.cleyton-mendes.com/webhook/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalPrompt,
          options,
          role,
          context,
          format,
          examples,
          constraints,
          model: targetModel
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar prompt');
      }

      const data = await response.json();

      if (data.success) {
        setEnhancedPrompt(data.optimized);
        setQualityData(data.quality);
        toast.success(`✨ Prompt aprimorado! Qualidade: ${data.quality.rating}`);
      } else {
        toast.error(data.error?.message || 'Erro ao gerar prompt');
      }
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Erro ao conectar com o servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!enhancedPrompt) return;

    try {
      await navigator.clipboard.writeText(enhancedPrompt);
      setCopied(true);
      toast.success('Prompt copiado para a área de transferência!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
      toast.error('Erro ao copiar prompt');
    }
  };

  const toggleOption = (key: keyof PromptOptions) => {
    setOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getQualityColor = (rating: string) => {
    switch (rating) {
      case 'Excelente':
        return 'bg-green-500 text-white';
      case 'Bom':
        return 'bg-blue-500 text-white';
      case 'Médio':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6 mt-20">
      <div>
        <h1 className="text-3xl font-bold">Gerador de Prompt IA</h1>
        <p className="text-muted-foreground mt-2">
          Aprimore seus prompts com técnicas avançadas de engenharia de prompt
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Prompt Original</CardTitle>
              <CardDescription>
                Digite o prompt que você quer melhorar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Ex: Explique como funcionam redes neurais"
                value={originalPrompt}
                onChange={(e) => setOriginalPrompt(e.target.value)}
                rows={6}
                className="resize-none"
                disabled={isLoading}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modelo de IA Alvo</CardTitle>
              <CardDescription>
                Escolha para qual modelo otimizar o prompt
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  variant={targetModel === 'claude' ? 'default' : 'outline'}
                  onClick={() => setTargetModel('claude')}
                  disabled={isLoading}
                  className="flex-1"
                >
                  Claude
                </Button>
                <Button
                  variant={targetModel === 'gpt' ? 'default' : 'outline'}
                  onClick={() => setTargetModel('gpt')}
                  disabled={isLoading}
                  className="flex-1"
                >
                  GPT-4
                </Button>
                <Button
                  variant={targetModel === 'gemini' ? 'default' : 'outline'}
                  onClick={() => setTargetModel('gemini')}
                  disabled={isLoading}
                  className="flex-1"
                >
                  Gemini
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Técnicas de Aprimoramento</CardTitle>
              <CardDescription>
                Selecione as técnicas que deseja aplicar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="role"
                    checked={options.addRole}
                    onCheckedChange={() => toggleOption('addRole')}
                    disabled={isLoading}
                  />
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="role" className="cursor-pointer font-medium">
                      Definir Role/Persona
                    </Label>
                    {options.addRole && (
                      <Input
                        placeholder="Ex: especialista em machine learning"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        disabled={isLoading}
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="context"
                    checked={options.addContext}
                    onCheckedChange={() => toggleOption('addContext')}
                    disabled={isLoading}
                  />
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="context" className="cursor-pointer font-medium">
                      Adicionar Contexto
                    </Label>
                    {options.addContext && (
                      <Textarea
                        placeholder="Ex: Preciso entender para uma apresentação sobre IA..."
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        rows={3}
                        disabled={isLoading}
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="format"
                    checked={options.addFormat}
                    onCheckedChange={() => toggleOption('addFormat')}
                    disabled={isLoading}
                  />
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="format" className="cursor-pointer font-medium">
                      Especificar Formato
                    </Label>
                    {options.addFormat && (
                      <Textarea
                        placeholder="Ex: Lista com bullets, máximo 5 pontos, linguagem simples"
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        rows={3}
                        disabled={isLoading}
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="examples"
                    checked={options.addExamples}
                    onCheckedChange={() => toggleOption('addExamples')}
                    disabled={isLoading}
                  />
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="examples" className="cursor-pointer font-medium">
                      Fornecer Exemplos
                    </Label>
                    {options.addExamples && (
                      <Textarea
                        placeholder="Ex: Como no exemplo do reconhecimento de imagens..."
                        value={examples}
                        onChange={(e) => setExamples(e.target.value)}
                        rows={3}
                        disabled={isLoading}
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="constraints"
                    checked={options.addConstraints}
                    onCheckedChange={() => toggleOption('addConstraints')}
                    disabled={isLoading}
                  />
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="constraints" className="cursor-pointer font-medium">
                      Definir Restrições
                    </Label>
                    {options.addConstraints && (
                      <Textarea
                        placeholder="Ex: Não usar termos técnicos, máximo 200 palavras"
                        value={constraints}
                        onChange={(e) => setConstraints(e.target.value)}
                        rows={3}
                        disabled={isLoading}
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="stepByStep"
                    checked={options.addStepByStep}
                    onCheckedChange={() => toggleOption('addStepByStep')}
                    disabled={isLoading}
                  />
                  <Label htmlFor="stepByStep" className="cursor-pointer font-medium">
                    Pedir Raciocínio Passo a Passo
                  </Label>
                </div>
              </div>

              <Button 
                onClick={generatePrompt} 
                className="w-full" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Gerar Prompt Aprimorado
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="lg:sticky lg:top-4">
            <CardHeader>
              <div className='flex'>
                <div className='flex-1'>
                <CardTitle>Prompt Aprimorado</CardTitle>
              <CardDescription>
                Seu prompt otimizado para {targetModel === 'claude' ? 'Claude' : targetModel === 'gpt' ? 'GPT-4' : 'Gemini'}
              </CardDescription>
              </div>
              <div className='flex-1'>
                {enhancedPrompt && (
                <Button onClick={handleCopy} className="w-full">
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar Prompt
                    </>
                  )}
                </Button>
              )}
              </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Textarea
                  value={enhancedPrompt}
                  readOnly
                  placeholder={isLoading ? "Gerando prompt otimizado..." : "O prompt aprimorado aparecerá aqui..."}
                  rows={20}
                  className="resize-none font-mono text-sm"
                />
              </div>

              {enhancedPrompt && (
                <Button onClick={handleCopy} className="w-full">
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar Prompt
                    </>
                  )}
                </Button>
              )}

              {enhancedPrompt && (
                <div className="rounded-lg bg-muted p-4 space-y-2">
                  <p className="text-sm font-medium">💡 Dicas:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Teste o prompt e ajuste conforme necessário</li>
                    <li>Seja específico sobre o que você quer</li>
                    <li>Forneça exemplos quando possível</li>
                    <li>Itere e refine baseado nos resultados</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {qualityData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Análise de Qualidade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Avaliação:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getQualityColor(qualityData.rating)}`}>
                      {qualityData.rating}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium">Score:</span>
                    <span className="text-2xl font-bold">
                      {qualityData.score}/{qualityData.maxScore}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Detalhamento:</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Tamanho adequado:</span>
                        <span className="font-mono">{qualityData.breakdown.length}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tem role/persona:</span>
                        <span className="font-mono">{qualityData.breakdown.hasRole}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bem estruturado:</span>
                        <span className="font-mono">{qualityData.breakdown.hasStructure}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tem exemplos:</span>
                        <span className="font-mono">{qualityData.breakdown.hasExamples}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tem restrições:</span>
                        <span className="font-mono">{qualityData.breakdown.hasConstraints}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Formato definido:</span>
                        <span className="font-mono">{qualityData.breakdown.hasFormat}/10</span>
                      </div>
                    </div>
                  </div>

                  {qualityData.suggestions.length > 0 && (
                    <div>
                      <p className="font-medium mb-2">📋 Sugestões:</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {qualityData.suggestions.map((s, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-muted-foreground">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}