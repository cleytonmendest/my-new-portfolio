'use client';

import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Copy, Check, Link, MessageSquare, User, Wallet, Eraser } from 'lucide-react';
import { toast } from 'sonner';

type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
type TabType = 'url' | 'text' | 'contact' | 'pix';

interface ContactInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  organization: string;
  url: string;
}

interface PixInfo {
  key: string;
  name: string;
  city: string;
  amount: string;
  description: string;
}

export default function QRCodeGeneratorPage() {
  const [activeTab, setActiveTab] = useState<TabType>('url');
  const [qrData, setQrData] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [copiedData, setCopiedData] = useState(false);
  const canvasPreviewRef = useRef<HTMLCanvasElement>(null);
  const canvasDownloadRef = useRef<HTMLCanvasElement>(null);

  // QR Code settings
  const [downloadSize, setDownloadSize] = useState(300);
  const [errorLevel, setErrorLevel] = useState<ErrorCorrectionLevel>('M');

  // Color settings - RGB only (HEX strings)
  const [foregroundColor, setForegroundColor] = useState<string>('#000000');
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');

  // Form states
  const [urlInput, setUrlInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    organization: '',
    url: ''
  });
  const [pixInfo, setPixInfo] = useState<PixInfo>({
    key: '',
    name: '',
    city: '',
    amount: '',
    description: ''
  });

  // Helper functions
  const formatUrl = (url: string): string => {
    if (!url.trim()) return '';
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return 'https://' + url;
    }
    return url;
  };

  const generateVCard = (contact: ContactInfo): string => {
    return `BEGIN:VCARD
VERSION:3.0
FN:${contact.firstName} ${contact.lastName}
N:${contact.lastName};${contact.firstName};;;
ORG:${contact.organization}
TEL:${contact.phone}
EMAIL:${contact.email}
URL:${contact.url}
END:VCARD`;
  };

  const generatePixPayload = (pix: PixInfo): string => {
    if (!pix.key || !pix.name || !pix.city) return '';

    const crc16 = (str: string): string => {
      let crc = 0xFFFF;
      for (let i = 0; i < str.length; i++) {
        crc ^= str.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
          if (crc & 0x8000) {
            crc = (crc << 1) ^ 0x1021;
          } else {
            crc = crc << 1;
          }
        }
      }
      return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
    };

    const buildEMV = (id: string, value: string): string => {
      const len = value.length.toString().padStart(2, '0');
      return `${id}${len}${value}`;
    };

    let payload = '';
    payload += buildEMV('00', '01');
    payload += buildEMV('26',
      buildEMV('00', 'BR.GOV.BCB.PIX') +
      buildEMV('01', pix.key) +
      (pix.description ? buildEMV('02', pix.description.substring(0, 72)) : '')
    );
    payload += buildEMV('52', '0000');
    payload += buildEMV('53', '986');

    if (pix.amount && parseFloat(pix.amount) > 0) {
      const amount = parseFloat(pix.amount).toFixed(2);
      payload += buildEMV('54', amount);
    }

    payload += buildEMV('58', 'BR');
    payload += buildEMV('59', pix.name.substring(0, 25));
    payload += buildEMV('60', pix.city.substring(0, 15));
    payload += buildEMV('62', buildEMV('05', '***'));
    payload += '6304';

    const crcValue = crc16(payload);
    payload += crcValue;

    return payload;
  };

  // Generate QR data based on active tab
  useEffect(() => {
    let data = '';

    switch (activeTab) {
      case 'url':
        data = formatUrl(urlInput);
        break;
      case 'text':
        data = textInput;
        break;
      case 'contact':
        if (contactInfo.firstName || contactInfo.lastName || contactInfo.phone || contactInfo.email) {
          data = generateVCard(contactInfo);
        }
        break;
      case 'pix':
        data = generatePixPayload(pixInfo);
        break;
    }

    setQrData(data);
  }, [activeTab, urlInput, textInput, contactInfo, pixInfo]);

  // Generate QR Code
  useEffect(() => {
    generateQRCode();
  }, [qrData, downloadSize, errorLevel, foregroundColor, backgroundColor]);

  const generateQRCode = async () => {
    if (!qrData.trim()) {
      if (canvasPreviewRef.current) {
        const ctx = canvasPreviewRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasPreviewRef.current.width, canvasPreviewRef.current.height);
        }
      }
      setQrCodeUrl('');
      return;
    }

    try {
      // Generate preview QR code (fixed 300px)
      const previewCanvas = canvasPreviewRef.current;
      if (previewCanvas) {
        await QRCode.toCanvas(previewCanvas, qrData, {
          width: 300,
          errorCorrectionLevel: errorLevel,
          color: {
            dark: foregroundColor,
            light: backgroundColor,
          },
        });
      }

      // Generate download QR code (user-selected size)
      const downloadCanvas = canvasDownloadRef.current;
      if (downloadCanvas) {
        await QRCode.toCanvas(downloadCanvas, qrData, {
          width: downloadSize,
          errorCorrectionLevel: errorLevel,
          color: {
            dark: foregroundColor,
            light: backgroundColor,
          },
        });

        const url = downloadCanvas.toDataURL('image/png');
        setQrCodeUrl(url);
      }
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
      toast.error('Erro ao gerar QR Code');
    }
  };

  const handleDownload = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.download = `qrcode-${downloadSize}x${downloadSize}.png`;
    link.href = qrCodeUrl;
    link.click();
    toast.success('QR Code baixado com sucesso!');
  };

  const handleCopyImage = async () => {
    try {
      const canvas = canvasDownloadRef.current;
      if (!canvas) return;

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);

        setCopied(true);
        toast.success('QR Code copiado!');
        setTimeout(() => setCopied(false), 2000);
      });
    } catch (error) {
      console.error('Erro ao copiar:', error);
      toast.error('Erro ao copiar QR Code');
    }
  };

  const handleCopyData = async () => {
    if (!qrData) return;

    try {
      await navigator.clipboard.writeText(qrData);
      setCopiedData(true);
      toast.success('Dados copiados!');
      setTimeout(() => setCopiedData(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
      toast.error('Erro ao copiar dados');
    }
  };

  const resetForm = () => {
    setUrlInput('');
    setTextInput('');
    setContactInfo({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      organization: '',
      url: ''
    });
    setPixInfo({
      key: '',
      name: '',
      city: '',
      amount: '',
      description: ''
    });
    toast.success('Campos limpos!');
  };

  return (
    <div className="space-y-6 mt-20">
      <div>
        <h1 className="text-3xl font-bold">Gerador de QR Code</h1>
        <p className="text-muted-foreground mt-2">
          Crie QR codes personalizados para URLs, textos, contatos e pagamentos PIX
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Input Section */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conteúdo do QR Code</CardTitle>
              <CardDescription>
                Escolha o tipo de conteúdo e preencha as informações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="url" className="flex items-center gap-2">
                    <Link className="h-4 w-4" />
                    <span className="hidden sm:inline">URL</span>
                  </TabsTrigger>
                  <TabsTrigger value="text" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span className="hidden sm:inline">Texto</span>
                  </TabsTrigger>
                  <TabsTrigger value="contact" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Contato</span>
                  </TabsTrigger>
                  <TabsTrigger value="pix" className="flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    <span className="hidden sm:inline">PIX</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="url" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="url">URL do Site</Label>
                    <Input
                      id="url"
                      type="url"
                      placeholder="exemplo.com ou https://exemplo.com"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Se não incluir http://, adicionaremos https:// automaticamente
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="text" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="text">Texto</Label>
                    <Textarea
                      id="text"
                      placeholder="Digite qualquer texto para gerar QR code..."
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      rows={6}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nome</Label>
                      <Input
                        id="firstName"
                        placeholder="João"
                        value={contactInfo.firstName}
                        onChange={(e) => setContactInfo({...contactInfo, firstName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Sobrenome</Label>
                      <Input
                        id="lastName"
                        placeholder="Silva"
                        value={contactInfo.lastName}
                        onChange={(e) => setContactInfo({...contactInfo, lastName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+55 (11) 98765-4321"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="joao.silva@exemplo.com"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organization">Organização</Label>
                    <Input
                      id="organization"
                      placeholder="Nome da Empresa"
                      value={contactInfo.organization}
                      onChange={(e) => setContactInfo({...contactInfo, organization: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactUrl">Site</Label>
                    <Input
                      id="contactUrl"
                      type="url"
                      placeholder="https://exemplo.com"
                      value={contactInfo.url}
                      onChange={(e) => setContactInfo({...contactInfo, url: e.target.value})}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="pix" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="pixKey">Chave PIX *</Label>
                    <Input
                      id="pixKey"
                      placeholder="CPF, CNPJ, email, telefone ou chave aleatória"
                      value={pixInfo.key}
                      onChange={(e) => setPixInfo({...pixInfo, key: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pixName">Nome do Recebedor *</Label>
                    <Input
                      id="pixName"
                      placeholder="Nome completo ou razão social"
                      value={pixInfo.name}
                      onChange={(e) => setPixInfo({...pixInfo, name: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pixCity">Cidade *</Label>
                    <Input
                      id="pixCity"
                      placeholder="Cidade do recebedor"
                      value={pixInfo.city}
                      onChange={(e) => setPixInfo({...pixInfo, city: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pixAmount">Valor (Opcional)</Label>
                    <Input
                      id="pixAmount"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={pixInfo.amount}
                      onChange={(e) => setPixInfo({...pixInfo, amount: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pixDescription">Descrição (Opcional)</Label>
                    <Input
                      id="pixDescription"
                      placeholder="Descrição do pagamento"
                      value={pixInfo.description}
                      onChange={(e) => setPixInfo({...pixInfo, description: e.target.value})}
                    />
                  </div>

                  <p className="text-xs text-muted-foreground">
                    * Campos obrigatórios para gerar o QR Code PIX
                  </p>
                </TabsContent>
              </Tabs>

              <div className="mt-4">
                <Button onClick={resetForm} variant="outline" className="w-full">
                  <Eraser className="mr-2 h-4 w-4" />
                  Limpar Campos
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personalização</CardTitle>
              <CardDescription>
                Customize as cores e configurações do QR code
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tamanho do Download (px)</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      min={100}
                      max={2000}
                      step={50}
                      value={downloadSize}
                      onChange={(e) => setDownloadSize(Number(e.target.value))}
                      className="w-24"
                    />
                    <span className="text-sm text-muted-foreground">
                      {downloadSize}x{downloadSize}px
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Tamanho da imagem para download (visualização é fixa)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="errorLevel">Correção de Erro</Label>
                  <Select value={errorLevel} onValueChange={(value) => setErrorLevel(value as ErrorCorrectionLevel)}>
                    <SelectTrigger id="errorLevel">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L">Baixa (7%)</SelectItem>
                      <SelectItem value="M">Média (15%)</SelectItem>
                      <SelectItem value="Q">Alta (25%)</SelectItem>
                      <SelectItem value="H">Muito Alta (30%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>Cor Principal</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="h-10 w-20 p-1 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={foregroundColor}
                      onChange={(e) => {
                        const hex = e.target.value;
                        if (/^#[0-9A-F]{6}$/i.test(hex)) {
                          setForegroundColor(hex);
                        }
                      }}
                      className="flex-1"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Cor de Fundo</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="h-10 w-20 p-1 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => {
                        const hex = e.target.value;
                        if (/^#[0-9A-F]{6}$/i.test(hex)) {
                          setBackgroundColor(hex);
                        }
                      }}
                      className="flex-1"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* QR Code Display Section */}
        <div className="lg:col-span-2">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>QR Code Gerado</CardTitle>
              <CardDescription>
                {qrData ? 'Visualização (tamanho fixo)' : 'Preencha os campos para gerar'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center items-center max-h-[300px] max-w-[300px] bg-muted/30 rounded-lg p-4">
                {qrData ? (
                  <>
                    <canvas
                      ref={canvasPreviewRef}
                      className="rounded-lg shadow-lg"
                      style={{ imageRendering: 'pixelated' }}
                    />
                    <canvas
                      ref={canvasDownloadRef}
                      className="hidden"
                    />
                  </>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-30" />
                    <p>Preencha os campos acima para gerar seu QR code</p>
                  </div>
                )}
              </div>

              {qrData && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={handleDownload} className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Baixar
                    </Button>
                    <Button onClick={handleCopyImage} variant="outline">
                      {copied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copiar
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm">Dados do QR Code:</Label>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCopyData}
                        className="h-7"
                      >
                        {copiedData ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <div className="bg-muted rounded-lg p-3 max-h-32 overflow-y-auto">
                      <pre className="text-xs whitespace-pre-wrap wrap-break-word">
                        {qrData}
                      </pre>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
