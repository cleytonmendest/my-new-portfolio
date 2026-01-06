'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Copy, Check, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface PromptOptions {
  addRole: boolean;
  addContext: boolean;
  addFormat: boolean;
  addExamples: boolean;
  addConstraints: boolean;
  addStepByStep: boolean;
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

  const [options, setOptions] = useState<PromptOptions>({
    addRole: true,
    addContext: false,
    addFormat: false,
    addExamples: false,
    addConstraints: false,
    addStepByStep: false,
  });

  const generatePrompt = () => {
    if (!originalPrompt.trim()) {
      toast.error('Digite um prompt para melhorar');
      return;
    }

    let prompt = '';

    // Adicionar role/persona
    if (options.addRole && role.trim()) {
      prompt += `Você é um ${role}.\n\n`;
    }

    // Adicionar contexto
    if (options.addContext && context.trim()) {
      prompt += `Contexto: ${context}\n\n`;
    }

    // Prompt original
    prompt += `${originalPrompt}\n`;

    // Adicionar formato de saída
    if (options.addFormat && format.trim()) {
      prompt += `\nFormato de saída desejado:\n${format}\n`;
    }

    // Adicionar exemplos
    if (options.addExamples && examples.trim()) {
      prompt += `\nExemplos:\n${examples}\n`;
    }

    // Adicionar restrições
    if (options.addConstraints && constraints.trim()) {
      prompt += `\nRestrições:\n${constraints}\n`;
    }

    // Adicionar step-by-step
    if (options.addStepByStep) {
      prompt += `\nPor favor, pense passo a passo e explique seu raciocínio antes de dar a resposta final.`;
    }

    setEnhancedPrompt(prompt);
    toast.success('Prompt aprimorado gerado!');
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

  return (
    <div className="space-y-6">
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
              />
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
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="context"
                    checked={options.addContext}
                    onCheckedChange={() => toggleOption('addContext')}
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
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="format"
                    checked={options.addFormat}
                    onCheckedChange={() => toggleOption('addFormat')}
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
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="examples"
                    checked={options.addExamples}
                    onCheckedChange={() => toggleOption('addExamples')}
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
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="constraints"
                    checked={options.addConstraints}
                    onCheckedChange={() => toggleOption('addConstraints')}
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
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="stepByStep"
                    checked={options.addStepByStep}
                    onCheckedChange={() => toggleOption('addStepByStep')}
                  />
                  <Label htmlFor="stepByStep" className="cursor-pointer font-medium">
                    Pedir Raciocínio Passo a Passo
                  </Label>
                </div>
              </div>

              <Button onClick={generatePrompt} className="w-full" size="lg">
                <Sparkles className="mr-2 h-4 w-4" />
                Gerar Prompt Aprimorado
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="lg:sticky lg:top-4 h-fit">
          <CardHeader>
            <CardTitle>Prompt Aprimorado</CardTitle>
            <CardDescription>
              Seu prompt otimizado para melhores resultados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Textarea
                value={enhancedPrompt}
                readOnly
                placeholder="O prompt aprimorado aparecerá aqui..."
                rows={20}
                className="resize-none font-mono text-sm"
              />
            </div>

            {enhancedPrompt && (
              <div className="flex gap-2">
                <Button onClick={handleCopy} className="flex-1">
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
              </div>
            )}

            {enhancedPrompt && (
              <div className="rounded-lg bg-muted p-4 space-y-2">
                <p className="text-sm font-medium">Dicas:</p>
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
      </div>
    </div>
  );
}
